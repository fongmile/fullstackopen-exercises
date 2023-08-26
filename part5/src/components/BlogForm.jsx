import PropTypes from 'prop-types'
import {useRef} from 'react'

const BlogForm = ({ formHandler }) => {
	const titleRef = useRef(null)
	const authorRef = useRef(null)
	const urlRef = useRef(null)
	
	const addBlog = async (event) => {
		event.preventDefault()

		const response = await formHandler({
			'title': titleRef.current.value,
			'author': authorRef.current.value,
			'url':urlRef.current.value
		})

		if(response)	{
			titleRef.current.value = ''
			authorRef.current.value = ''
			urlRef.current.value = ''
		}
	}
	
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				<div>
					title:
					<input type='text' name='title' placeholder='title' ref={titleRef} />
				</div>
				<div>
					author:
					<input type='text' name='author' placeholder='author' ref={authorRef} />
				</div>
				<div>
					url:
					<input type='text' name='url' placeholder='url' ref={urlRef} />
				</div>
				<div><button className='createBtn'>create</button></div>
			</form>
		</div>
	)
}

BlogForm.propTypes = {
	formHandler: PropTypes.func.isRequired,
}

export default BlogForm