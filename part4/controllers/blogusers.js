const bcrypt = require('bcrypt')
const blogusersRouter = require('express').Router()
const Bloguser = require('../models/bloguser')

blogusersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if(!password || password.length<3)	{
		return response.status(400).json({ 
			error: 'password must be at least 3 characters'
		})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const bloguser = new Bloguser({
		username,
		name,
		passwordHash,
	})

	const savedUser = await bloguser.save()

	response.status(201).json(savedUser)
})

blogusersRouter.get('/', async (request, response) => {
	const users = await Bloguser
								.find({})
								.populate('blogs', { title: 1, author: 1, url:1, likes:1 })
	response.json(users)
})

module.exports = blogusersRouter