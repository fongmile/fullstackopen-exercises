import { useDispatch, useSelector } from 'react-redux'

import storageService from '../services/storage'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const UserLoggedIn = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	const logout = async () => {
		dispatch(setUser(null))
		storageService.removeUser()
		dispatch(setNotification({message: 'logged out'}))
	}

	return (
		<div>
			{user.name} logged in
			<button onClick={logout}>logout</button>
		</div>
	)
}

export default UserLoggedIn