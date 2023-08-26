import PropTypes from 'prop-types'

const BlogForm = ({ formHandler }) => {
	
	const addBlog = async (event) => {
		event.preventDefault()

		const response = await formHandler({
			'title': event.target.title.value,
			'author': event.target.author.value,
			'url':event.target.url.value
		})

		if(response)	{
			event.target.title.value = ''
			event.target.author.value = ''
			event.target.url.value = ''
		}
	}
	
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				<div>
					title:
					<input type='text' name='title' />
				</div>
				<div>
					author:
					<input type='text' name='author' />
				</div>
				<div>
					url:
					<input type='text' name='url' />
				</div>
				<div><button >create</button></div>
			</form>
		</div>
	)
}

BlogForm.propTypes = {
	formHandler: PropTypes.func.isRequired,
}

export default BlogForm