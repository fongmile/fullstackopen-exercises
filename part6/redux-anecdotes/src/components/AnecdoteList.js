import { useDispatch, useSelector } from 'react-redux';
import { voteit } from '../reducers/anecdoteReducer';
import { showNotification,hideNotification } from '../reducers/notificationReducer';

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

	const vote = (id, content) => {
		console.log('vote', id)
		dispatch(voteit(id))
		dispatch(showNotification(`you voted '${content}'`))
		setTimeout(() => dispatch(hideNotification()), 5000)
	}

	return (
		<div>
			{listToShow.map(anecdote =>
				<Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={() => vote(anecdote.id, anecdote.content)} />
			)}
		</div>
	);
};

export default AnecdoteList

