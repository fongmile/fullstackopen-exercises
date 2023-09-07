import storageService from '../services/storage'
import { useNotify } from '../contexts/NotificationContext'
import { useUserValue, useUserDispatch } from '../contexts/UserContext'

const UserLoggedIn = () => {
	const notifyWith = useNotify()
	const user = useUserValue()
	const userDispatch = useUserDispatch()

	const logout = async () => {
		userDispatch({ type: 'LOGOUT'})
		storageService.removeUser()
		notifyWith({message:'logged out'})
	}

	return (
		<span className='userinfo'>
			<span>{user.name} logged in</span>
			<button onClick={logout}>logout</button>
		</span>
	)
}

export default UserLoggedIn
