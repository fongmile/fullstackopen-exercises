import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { login } from '../reducers/userReducer'

const LoginForm = () => {
	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		dispatch(login(username, password))
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				username
				<input
					id='username'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id='password'
					type="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id='login-button' type="submit">
				login
			</button>
		</form>
	)
}

export default LoginForm