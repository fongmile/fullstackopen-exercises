import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState(null)
	const [notificationType, setNotificationType] = useState('')

	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const showNotification = (message,type) => {
		setNotification(message)
		setNotificationType(type)
		console.log(`Notification [${type}]: `, message)
		setTimeout(() => {
			setNotification(null)
			setNotificationType('')
		}, 5000)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedBlogUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (error) {
			showNotification('Wrong username or password', 'error')
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogUser')
		blogService.setToken(null)
		setUser(null)
	}

	const createNewBlog = async (newblog) => {
		try {
			const retuenedBlog = await blogService.create(newblog)

			retuenedBlog.bloguser = {
												username: user.username,
												name: user.name
											}
			setBlogs(blogs.concat(retuenedBlog))

			showNotification(`a new blog "${newblog.title}" added`, 'success')
			blogFormRef.current.toggleVisibility()

			return true

		} catch (error) {
			if(!error.response || !error.response.data || !error.response.data.error)	{
				showNotification(error.message, 'error')
			}	else {
				showNotification(error.response.data.error, 'error')
			}
			return false
		}
	}

	const likeBlog = async (blog) => {
		const blogToUpdate = {
			likes: blog.likes+1,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			bloguser: blog.bloguser.id,
		}

		try {
			const retuenedBlog = await blogService.update(blog.id, blogToUpdate)

			retuenedBlog.bloguser = {
												username: blog.username,
												name: blog.name
											}
			const newBlogs = blogs.map(x => x.id===retuenedBlog.id?retuenedBlog:x)
			setBlogs(newBlogs)

			showNotification(`liked "${blogToUpdate.title}"`, 'success')
			return true

		} catch (error) {
			if(!error.response || !error.response.data || !error.response.data.error)	{
				showNotification(error.message, 'error')
			}	else {
				showNotification(error.response.data.error, 'error')
			}
			return false
		}
	}

	const removeBlog = async (blog) => {
		
		if(window.confirm(`Remove blog '${blog.title}' by ${blog.author}`))	{
			try {
				const res = await blogService.deleteBlog(blog.id)

				if(res.status===204)	{
					const newBlogs = blogs.filter((x) => x.id!==blog.id)
					setBlogs(newBlogs)
					showNotification(`blog '${blog.title}' by ${blog.author} removed`, 'success')
				}
			} catch (error) {
				if(!error.response || !error.response.data || !error.response.data.error)	{
					showNotification(error.message, 'error')
				}	else {
					showNotification(error.response.data.error, 'error')
				}
			}
		}	
		
	}

	const blogToDisplay = blogs.sort((a,b) => a.likes > b.likes ? -1:1)

	return (
		<div>
			{!user && 
				<div>
					<h2>log in to application</h2>
					<Notification message={notification} type={notificationType}  />
					<LoginForm 
					username={username} 
					usernameChangeHandler={({ target }) => setUsername(target.value)}
					password={password} 
					passwordChangeHandler={({ target }) => setPassword(target.value)}
					formHandler={handleLogin}
					/>
				</div>
			} 

			{user && <div>
							<h2>blogs </h2>
							<Notification message={notification} type={notificationType}  />
							<p>
								<b>{user.name}</b> logged in 
								<button onClick={() => handleLogout()}>logout</button>
							</p>

							<Togglable buttonLabel="new blog" ref={blogFormRef} >
								<BlogForm formHandler={createNewBlog}  />
							</Togglable>


							<br/>
							{
								blogToDisplay.map(blog =>
									<Blog key={blog.id} blog={blog} thisUser={user} likeHandler={() => {likeBlog(blog)}} removeHandler={() => {removeBlog(blog)}} />
								)
							}
						</div>
			}
				
		</div>
	)
}

export default App