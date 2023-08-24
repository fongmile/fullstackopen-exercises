import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState(null);
	const [notificationType, setNotificationType] = useState('');

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
		console.log(type, message);
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
			showNotification(`Wrong username or password`, 'error')
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogUser')
		blogService.setToken(null)
		setUser(null)
	}

	const createNewBlog = async (event) => {
		event.preventDefault()

		const title = event.target.title.value
		const author = event.target.author.value
		const url = event.target.url.value

		try {
			const newblog = {
				"title": title, 
				"author": author,
				"url":url
			}

			const retuenedBlog = await blogService.create(newblog)
			setBlogs(blogs.concat(retuenedBlog))
			showNotification(`a new blog "${title}" added`, 'success')

			event.target.title.value = ''
			event.target.author.value = ''
			event.target.url.value = ''

		} catch (error) {
			if(!error.response.data.error)	{
				showNotification(error.message, 'error')
			}	else {
				showNotification(error.response.data.error, 'error')
			}
			
		}
	}

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
								<button onClick={()=>handleLogout()}>logout</button>
							</p>

							<BlogForm formHandler={createNewBlog} />

							<br/>
							{
								blogs.map(blog =>
									<Blog key={blog.id} blog={blog} />
								)
							}
						</div>
			}
				
		</div>
	)
}

export default App