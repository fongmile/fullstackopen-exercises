import { useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = ({onCreatedHandler}) => {
	const dispatch = useNotificationDispatch()
	
	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSettled: (data) => {
			if(data.error && data.error==='CONTENT_TOO_SHORT')	{
				dispatch({ type:'CONTENT_TOO_SHORT' })
				setTimeout(() => dispatch({type:'RESET'}), 5000)
			}	else {
				dispatch({ type:'CREATED', payload: data.content })
				setTimeout(() => dispatch({type:'RESET'}), 5000)
				onCreatedHandler()
			}
		}
	})

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		newAnecdoteMutation.mutate({ content, votes: 0 })
		event.target.anecdote.value = ''
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