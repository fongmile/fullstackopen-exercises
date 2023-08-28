import { useDispatch, useSelector } from 'react-redux';
import { voteit } from '../reducers/anecdoteReducer';

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
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		return filter===''?
					anecdotes : 
					anecdotes.filter(x=>x.content.toLowerCase().includes(filter.toLowerCase()))
	})

	const vote = (id) => {
		console.log('vote', id)
		dispatch(voteit(id))
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
				<Anecdote key={anecdote.id} anecdote={anecdote} voteHandler={() => vote(anecdote.id)} />
			)}
		</div>
	);
};

export default AnecdoteList

