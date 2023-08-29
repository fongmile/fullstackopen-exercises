import { useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'

const AnecdoteForm = ({onCreatedHandler}) => {

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: () => {
			onCreatedHandler()
		},
	})

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		if(content.length>=5)	{
			newAnecdoteMutation.mutate({ content, votes: 0 })
			event.target.anecdote.value = ''
		}	else {
			console.log('content of the anecdote must be at least 5 characters long');
		}
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm