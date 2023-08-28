import { useDispatch } from 'react-redux';
import { createnew } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const create = (e) => {
		e.preventDefault()
		dispatch(createnew(e.target.content.value))
		e.target.content.value = ''
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={create}>
				<div><input name="content" /></div>
				<button>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm