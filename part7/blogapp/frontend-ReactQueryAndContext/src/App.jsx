import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { useNotify } from './contexts/NotificationContext'
import { useUserValue, useUserDispatch } from './contexts/UserContext'

import blogService from './services/blogs'
import storageService from './services/storage'

import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	//const [blogs, setBlogs] = useState([])

	const notifyWith = useNotify()
	const user = useUserValue()
	const userDispatch = useUserDispatch()
	
	const blogFormRef = useRef()
	
	const queryClient = useQueryClient()

	useEffect(() => {
		const user = storageService.loadUser()
		userDispatch({ type: 'SET', user })
	}, [])

	const result = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll,
		retry: 1,
		refetchOnWindowFocus: false
	})

	const logout = async () => {
		userDispatch({ type: 'LOGOUT'})
		storageService.removeUser()
		notifyWith({message:'logged out'})
	}

	const createBlog = async () => {
		queryClient.invalidateQueries({ queryKey: ['blogs'] })
		blogFormRef.current.toggleVisibility()
	}

	const updateBlogMutation = useMutation(blogService.update, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
			notifyWith({message: `A like for the blog '${data.title}' by '${data.author}'`})
		},
	})

	const like = async (blog) => {
		const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
		updateBlogMutation.mutate(blogToUpdate)
	}

	const removeBlogMutation = useMutation(blogService.remove, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
			notifyWith({message: 'Blog removed'})
		},
	})

	const remove = async (blog) => {
		const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
		if (ok) {
			removeBlogMutation.mutate(blog.id)
		}
	}

	if (!user) {
		return (
			<div>
				<h2>log in to application</h2>
				<Notification />
				<LoginForm />
			</div>
		)
	}

	if (result.isLoading) {
		return <div>loading data...</div>
	}
	if (result.isError) {
		return <div>anecdote service not availiable due to problem in server</div>
	}

	const byLikes = (b1, b2) => b2.likes - b1.likes
	let blogs = [...result.data].sort(byLikes)

	return (
		<div>
			<h2>blogs</h2>
			<Notification  />
			<div>
				{user.name} logged in
				<button onClick={logout}>logout</button>
			</div>
			<Togglable buttonLabel='new note' ref={blogFormRef}>
				<NewBlog createBlog={createBlog} />
			</Togglable>
			<div>
				{blogs.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
						like={() => like(blog)}
						canRemove={user && blog.user.username === user.username}
						remove={() => remove(blog)}
					/>
				)}
			</div>
		</div>
	)
}

export default App