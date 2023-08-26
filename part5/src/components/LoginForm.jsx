import PropTypes from 'prop-types'

const LoginForm = ({ username, password, formHandler, usernameChangeHandler, passwordChangeHandler }) => (

	<form onSubmit={formHandler}>
		<div>
			username
			<input type="text" value={username} name="Username"
						onChange={usernameChangeHandler} />
		</div>
		<div>
			password
			<input type="password" value={password} name="Password"
						onChange={passwordChangeHandler} />
		</div>
		<button type="submit">login</button>
	</form>
)

LoginForm.propTypes = {
	formHandler: PropTypes.func.isRequired,
	usernameChangeHandler: PropTypes.func.isRequired,
	passwordChangeHandler: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm