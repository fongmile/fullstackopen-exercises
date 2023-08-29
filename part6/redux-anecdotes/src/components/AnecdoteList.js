import { useDispatch, useSelector } from 'react-redux';
import { voteit } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({anecdote, voteHandler}) => {
	return (
		<div>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={voteHandler}>vote</button>
			</div>
		</div>
	)
}

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const listToShow = useSelector(({ filter, anecdotes }) => {
		return filter===''?
					anecdotes : 
					anecdotes.filter(x=>x.content.toLowerCase().includes(filter.toLowerCase()))
	})

	const handleVote = ({id, content, votes}) => {
		console.log('vote', id)
		dispatch(voteit(id))
		dispatch(setNotification(`you voted '${content}'`, 5))
	}

	return (
		<div>
			{listToShow.map(anecdote =>
				<Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={() => handleVote(anecdote)} />
			)}
		</div>
	);
};

export default AnecdoteList

