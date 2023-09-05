import { useState } from 'react'

import { useLogin } from '../contexts/UserContext'

const LoginForm = () => {	
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const login = useLogin()

	const handleSubmit = (event) => {
		event.preventDefault()
		login({username, password})
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