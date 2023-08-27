import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, thisUser, likeHandler, removeHandler }) => {
	const [showDetail, setShowDetail] = useState(false)
	let detailStyle = { display: showDetail ? '' : 'none' }

	const showRemoveButton = () => {
		if(!thisUser || blog.bloguser.username!==thisUser.username)	{
			return null
		}
		return (
			<div><button className='removeBtn' onClick={removeHandler}>remove</button></div>
		)
	}

	return (
		<div className='blog'>

			<div className='titleline'>
				<span className='title'>{blog.title}</span> -<span className='author'>{blog.author}</span>
				<button className='toggleBlogDetail' onClick={() => {setShowDetail(!showDetail)}}>{showDetail?'hide':'show'}</button>
			</div>
			<div className='blog-detail' style={detailStyle}>
				<div><a href={blog.url}>{blog.url}</a></div>
				<div>likes: <span className='likesNumber'>{blog.likes}</span> <button className='toggleLike' onClick={likeHandler}>like</button></div>
				<div className='creator'>{blog.bloguser.name}</div>
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