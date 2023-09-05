import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { setNotification } from '../reducers/notificationReducer'
import { likeit, removeit } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false)
	const user = useSelector((state) => state.user)

	const dispatch = useDispatch()

	const handleLike = (blog) => {
		dispatch(likeit(blog))
		dispatch(setNotification({message: `A like for the blog '${blog.title}' by '${blog.author}'`}))
	}
	const handleRemove = (blog) => {
		const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
		if (ok) {
			dispatch(removeit(blog))
			dispatch(setNotification({message: `The blog' ${blog.title}' by '${blog.author} removed`}))
		} 

	}

	return (
		<div className='blog'>
			{blog.title} {blog.author}
			<button onClick={() => setVisible(!visible)}>
				{visible ? 'hide' : 'show'}
			</button>
			{visible &&
				<div>
					<div> <a href={blog.url}> {blog.url}</a> </div>
					<div>likes {blog.likes} <button onClick={() => {handleLike(blog)}}>like</button></div>
					<div>{blog.user && blog.user.name}</div>
					{(user && blog.user.username === user.username) && <button onClick={() => {handleRemove(blog)}}>delete</button>}
				</div>
			}
		</div>
	)
}

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs)

	if(blogs && blogs.length>0)	{
		return (
			<div>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		)
	}	else {
		return (
			<div>loading blogs...</div>
		)
	}
	
}

Blog.propTypes = {
	blog: PropTypes.shape({
		title: PropTypes.string,
		author: PropTypes.string,
		url: PropTypes.string,
		likes: PropTypes.number
	})
}

export default BlogList