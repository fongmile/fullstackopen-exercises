import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const notifyWith = useNotify()

	const newblogMutation = useMutation(blogService.create, {
		onSettled: (data) => {
			if(data.error)	{
				notifyWith({message:data.error, isError: true})
			}	else {
				notifyWith({message: `A new blog '${data.title}' by '${data.author}' added`})
				createBlog()
			}
		}
	})

	const handleSubmit = async (event) => {
		event.preventDefault()
		const newBlog = { title, author, url }
		newblogMutation.mutate(newBlog)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
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
		</div>
	)
}

export default BlogForm