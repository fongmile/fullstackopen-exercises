import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { createnew } from '../reducers/blogReducer'

import Togglable from '../components/Togglable'

const BlogForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const dispatch = useDispatch()
	const blogFormRef = useRef()

	const handleSubmit = async (event) => {
		event.preventDefault()
		const newblog = { title, author, url }
		dispatch(createnew(newblog))
		dispatch(setNotification({message: `A new blog '${newblog.title}' by '${newblog.author}' added`}))
		blogFormRef.current.toggleVisibility()
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<Togglable buttonLabel='new note' ref={blogFormRef}>
			<h4>Create a new blog</h4>

			<form onSubmit={handleSubmit}>
				<div>
					title
					<input
						id='title'
						placeholder='title'
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						id='author'
						placeholder='author'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						id='url'
						placeholder='url'
						value={url}
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</Togglable>
	)
}

export default BlogForm