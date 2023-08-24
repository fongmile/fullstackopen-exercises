const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const Bloguser = require('../models/bloguser')
const jwt = require('jsonwebtoken')

let token = null

beforeEach(async () => {	// initial setting the DB before each test
	await Blog.deleteMany({})
	//await Blog.insertMany(helper.initialBlogs)

	const initUsers = await Promise.all(helper.dummyUsers.map(async (x) => {
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(x.password, saltRounds)

		const thisUser = {
			_id: new mongoose.mongo.ObjectId(x.id),
			username: x.username,
			name: x.name,
			passwordHash: passwordHash,
			blogs: [],
			__v: 0
		}

		return thisUser;
	}))

	await Bloguser.deleteMany({})
	await Bloguser.insertMany(initUsers)

	const userForToken = {
		username: initUsers[0].username,
		id: initUsers[0]._id,
	}

	token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 })
})

const api = supertest(app)

test('4.23 fix blog creation', async () => {
	const newBlog = {
		title: 'test for 4.23a',
		author: 'bee',
		url: 'https://msn.com',
		likes: 15
	}

	await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(1)
	const titles = blogsAtEnd.map(n => n.title)
	expect(titles).toContain(
		'test for 4.23a'
	)
})

test('4.23 Unauthorized if a token is not provided', async () => {
	const newBlog = {
		title: 'test for 4.23b',
		author: 'unauthorized',
		url: 'https://msn.com',
		likes: 0
	}

	const result = await api
						.post('/api/blogs')
						.send(newBlog)
						.expect(401)
						.expect('Content-Type', /application\/json/)
	
	expect(result.body.error).toContain('invalid token')

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(0)
})


afterAll(async () => {
	await mongoose.connection.close()
})