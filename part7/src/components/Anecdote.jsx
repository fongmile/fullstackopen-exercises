import {useParams} from 'react-router-dom'

const Menu = ({anecdotes}) => {
	const id = useParams().id;
	const anecdote = anecdotes.find((x) => x.id === Number(id));

	return (
		<div>
			<h2>{anecdote.content}</h2>
			<p>has {anecdote.votes} votes</p>
		</div>
	)
}

export default Menu