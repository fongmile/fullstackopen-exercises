import { useDispatch } from 'react-redux';
import { createnew } from '../reducers/anecdoteReducer';
import { showNotification,hideNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const create = (e) => {
		e.preventDefault()
		dispatch(createnew(e.target.content.value))
		dispatch(showNotification(`you created '${e.target.content.value}'`))
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