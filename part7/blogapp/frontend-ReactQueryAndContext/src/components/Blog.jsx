import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {Link, useParams, useNavigate} from 'react-router-dom'

import blogService from '../services/blogs'

import { useNotify } from '../contexts/NotificationContext'
import { useUserValue } from '../contexts/UserContext'

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

const Blog = ({ id, blogs, handleLike, handleRemove, handleComment }) => {
	const user = useUserValue()
	const blog = blogs.find((x) => x.id===id)

	const notifyWith = useNotify()

	const commentHandler = (e) => {
		e.preventDefault()
		if(e.target.comment.value.length>0)	{
			handleComment(blog.id, blog.comments.concat(e.target.comment.value))
			e.target.comment.value = ''
		}	else{
			notifyWith({message: 'empty content', isError:true})
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
				<form onSubmit={commentHandler}>
					<input type='text' name='comment' /> <button>add comment</button>
				</form>
				{blog.comments.length>0 && <CommentList comments={blog.comments} />}
			</div>
		</div>
	)
}


const BlogList = (props) => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const notifyWith = useNotify()
	const id = useParams().id
	
	const result = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll,
		retry: 1,
		refetchOnWindowFocus: false
	})

	const commentBlogMutation = useMutation(blogService.comment, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['blogs'] })
			notifyWith({message: 'comment posted'})
		},
	})
	const comment = async (id, comments) => {
		commentBlogMutation.mutate({id, comments})
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
			navigate('/')
		}
	}

	const createBlog = async () => {
		queryClient.invalidateQueries({ queryKey: ['blogs'] })
	}

	if (result.isLoading) {
		return <div>loading data...</div>
	}
	if (result.isError) {
		return <div>anecdote service not availiable due to problem in server</div>
	}

	const byLikes = (b1, b2) => b2.likes - b1.likes
	let blogs = [...result.data].sort(byLikes)

	if(blogs.length===0)	{
		return (
			<div>no blog record</div>
		)
	}
	if(id)	{
		return (
			<Blog id={id} blogs={blogs} handleLike={like} handleRemove={remove} handleComment={comment}  />
		)
	}	

	return (
		<div>
			<NewBlog createBlog={createBlog} />

			{blogs.map(blog =>
				<div key={blog.id} className='bloglist-line'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
			)}
		</div>
	)
}

export default BlogList