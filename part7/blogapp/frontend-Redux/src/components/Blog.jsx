import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'

import { setNotification } from '../reducers/notificationReducer'
import { likeit, commentit, removeit } from '../reducers/blogReducer'

import NewBlog from '../components/NewBlog'

const CommentList = ({comments}) => {
	return (
		<ul>
			{comments.map((x, index) => 
					<li key={index}>{x}</li>
				)
			}
		</ul>
	)
}

const Blog = ({ id }) => {
	const navigate = useNavigate()
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)

	const blog = blogs.find((x) => x.id===id)

	const dispatch = useDispatch()

	const handleLike = (blog) => {
		dispatch(likeit(blog))
		dispatch(setNotification({message: `A like for the blog '${blog.title}' by '${blog.author}'`}))
	}
	const handleComment = (e) => {
		e.preventDefault()
		const newcomments = blog.comments.concat(e.target.comment.value)
		dispatch(commentit(blog.id, {comments:newcomments}))
		dispatch(setNotification({message: 'comment posted'}))
		e.target.comment.value = ''
	}
	const handleRemove = (blog) => {
		const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
		if (ok) {
			dispatch(removeit(blog))
			dispatch(setNotification({message: `The blog' ${blog.title}' by '${blog.author} removed`}))
			navigate('/')
		} 
	}

	if(!blog)	{
		return <div>Blog not found</div>
	}

	return (
		<div className='blog'>
			<h2>{blog.title} - {blog.author}</h2>
			<div className='blogInfo'>
				<div><a href={blog.url}> {blog.url}</a></div>
				<div>likes {blog.likes} <button onClick={() => {handleLike(blog)}}>like</button></div>
				<div>{blog.user && `added by ${blog.user.name}`}</div>
				{(user && blog.user.username === user.username) && <button onClick={() => {handleRemove(blog)}}>delete</button>}
			</div>

			<div className='comments'>
				<h3>comments</h3>
				<form onSubmit={handleComment}>
					<input type='text' name='comment' /> <button>add comment</button>
				</form>
				{blog.comments.length>0 && <CommentList comments={blog.comments} />}
			</div>
		</div>
	)
}

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs)
	const id = useParams().id

	if(!blogs)	{
		return (
			<div>loading blogs...</div>
		)
	}

	if(blogs.length===0)	{
		return (
			<div>no blog record</div>
		)
	}

	if(id)	{
		return (
			<Blog id={id} />
		)
	}	

	return (
		<div>
			<NewBlog />
			{blogs.map(blog =>
				<div key={blog.id} className='bloglist-line'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
			)}
		</div>
	)
}
//<Blog key={blog.id} blog={blog} />
Blog.propTypes = {
	blog: PropTypes.shape({
		title: PropTypes.string,
		author: PropTypes.string,
		url: PropTypes.string,
		likes: PropTypes.number
	})
}

export default BlogList