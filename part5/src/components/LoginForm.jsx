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

export default LoginForm