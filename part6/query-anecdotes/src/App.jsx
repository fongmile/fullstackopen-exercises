import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
	const queryClient = useQueryClient()

	const updateAnecdoteMutation = useMutation(updateAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		},
	})

	const handleVote = (anecdote) => {
		updateAnecdoteMutation.mutate({...anecdote, votes:anecdote.votes+1})
	}	
	
	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		retry: 1,
		refetchOnWindowFocus: false
	})

	console.log(JSON.parse(JSON.stringify(result)));

	if (result.isLoading) {
		return <div>loading data...</div>
	}
	if (result.isError) {
		return <div>anecdote service not availiable due to problem in server</div>
	}

	const onCreated = () => {
		result.refetch()
	}

	const anecdotes = result.data
	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm onCreatedHandler={onCreated} />

			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default App