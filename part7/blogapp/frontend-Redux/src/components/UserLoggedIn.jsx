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
		<span className='userinfo'>
			<span>{user.name} logged in</span>
			<button onClick={logout}>logout</button>
		</span>
	)
}

export default UserLoggedIn