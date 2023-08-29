import { useDispatch } from 'react-redux';
import { createnew } from '../reducers/anecdoteReducer';
import { showNotification,hideNotification } from '../reducers/notificationReducer';

import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const create = async (e) => {
		e.preventDefault()
		const newObj = await anecdoteService.createNew(e.target.content.value);
		dispatch(createnew(newObj));
		//dispatch(createnew(e.target.content.value))
		dispatch(showNotification(`you created '${newObj.content}'`))
		setTimeout(() => dispatch(hideNotification()), 5000)
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