const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
								.find({})
								.populate('bloguser', { username: 1, name: 1 })
	response.json(blogs)
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const blog = new Blog(request.body)
	const user = request.user

	blog.bloguser = user.id

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
}) 

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
	const blog = await Blog.findById(request.params.id)
	const user = request.user
	let okToDelete = true

	if(!blog)	{
		response.status(401).json({ error: 'blog already deleted from server' })
		okToDelete = false
	}
	
	if(blog.bloguser.toString() !== user.id.toString())	{
		response.status(401).json({ error: 'invalid user' })
		okToDelete = false
	}	
	if(okToDelete)	{
		console.log('01', blog);
		console.log('02', user);
		const newBlogs = user.blogs.filter((x) => x.toString()!==blog.id);
		user.blogs = newBlogs;
		
		await Blog.findByIdAndRemove(request.params.id)
		await user.save()
		response.status(204).end()
	}

})

blogsRouter.put('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)

	if(!blog)	{
		response.status(401).json({ error: 'blog already deleted from server' })
	}
	
	const body = request.body

	const blogToUpdate = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		bloguser: body.bloguser,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true })
	response.json(updatedBlog)
})

module.exports = blogsRouter