const BlogForm = ({ formHandler }) => (
	<div>
		<h2>create new</h2>
		<form onSubmit={formHandler}>
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

export default BlogForm