const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const Bloguser = require('../models/bloguser')

testingRouter.post('/reset', async (request, response) => {
	await Blog.deleteMany({})
	await Bloguser.deleteMany({})

	response.status(204).end()
})

module.exports = testingRouter