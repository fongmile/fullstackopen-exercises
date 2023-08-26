import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, thisUser, likeHandler, removeHandler }) => {
	const [showDetail, setShowDetail] = useState(false)
	let detailStyle = { display: showDetail ? '' : 'none' }

	const showRemoveButton = () => {
		if(blog.bloguser.username===thisUser.username)	{
			return (
				<div><button onClick={removeHandler}>remove</button></div>
			)
		}
		return null
	}

	return (
		<div className='blog'>

			<div className='titleline'>
				{blog.title} -{blog.author}<button onClick={() => {setShowDetail(!showDetail)}}>{showDetail?'hide':'show'}</button>
			</div>
			<div className='blog-detail' style={detailStyle}>
				<div><a href={blog.url}>{blog.url}</a></div>
				<div>likes: {blog.likes} <button onClick={likeHandler}>like</button></div>
				<div>{blog.bloguser.name}</div>
				{showRemoveButton()}
			</div>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	thisUser: PropTypes.object.isRequired,
	likeHandler: PropTypes.func.isRequired,
	removeHandler: PropTypes.func.isRequired,
}

export default Blog