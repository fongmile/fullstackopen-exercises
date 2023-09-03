import  { useField } from '../hooks'
import {useNavigate} from 'react-router-dom'

const CreateNew = ({handleCreate}) => {
	const {reset: resetContent, content} = useField('text');
	const {reset: resetAuthor, author} = useField('text');
	const {reset: resetInfo, info} = useField('text');

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		handleCreate({
			content:content.value,
			author:author.value,
			info:info.value,
			votes: 0
		})
		navigate('/')
	}

	const handleReset = (e) => {
		resetContent()
		resetAuthor()
		resetInfo()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit} onReset={handleReset}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info}  />
				</div>
				<button type='submit'>create</button>
				<button type='reset'>reset</button>
			</form>
		</div>
	)

}

export default CreateNew