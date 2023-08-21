const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

beforeEach(async () => {	// initial setting the DB before each test
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
   	.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

const api = supertest(app)

test('4.8 blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})
test('4.8 all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('4.9 unique identifier is named id', async () => {
	const response = await api.get('/api/blogs')
	response.body.forEach(b => {
		expect(b.id).toBeDefined()
	});
})

test('4.10 valid blog can be added', async () => {
	const newBlog = {
		title: 'test for 4.10',
		author: 'bee',
		url: 'https://msn.com',
		likes: 15
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	const titles = blogsAtEnd.map(n => n.title)
	expect(titles).toContain(
		'test for 4.10'
	)
})

test('4.11 default 0 if like property is missing', async () => {
	const newBlog = {
		title: 'test for 4.11',
		author: 'ace',
		url: 'https://yahoo.com'
	}
	const response = await api.post('/api/blogs').send(newBlog)

	expect(response.body.likes).toEqual(0);
})

test('4.12 400 Bad Request if title or url properties are missing', async () => {
	const newBlog = {
		author: 'ada wong',
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

 
afterAll(async () => {
	await mongoose.connection.close()
})