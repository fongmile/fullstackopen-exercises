import { createContext, useReducer, useContext } from 'react'

import { useNotify } from '../contexts/NotificationContext'

import storageService from '../services/storage'
import loginService from '../services/login'

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			return action.user
		case 'LOGOUT':
			return null
		case 'ERROR':
			return false
		default:
			return state
	}
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
	const [user, dispatch] = useReducer(reducer, null)

	return (
		<UserContext.Provider value={[user, dispatch]}>
			{props.children}
		</UserContext.Provider>
	)
}

export const useUserValue = () => {
	const [user] = useContext(UserContext)
	return user
} 

export const useUserDispatch = () => {
	const valueAndDispatch = useContext(UserContext)
	return valueAndDispatch[1]
}

export const useLogin = () => {
	const valueAndDispatch = useContext(UserContext)
	const dispatch = valueAndDispatch[1]

	const notifyWith = useNotify()
	
	return (payload) => {
		
		loginService
			.login({ username: payload.username, password: payload.password })
			.then((user) => {
				dispatch({ type: 'SET', user })
				storageService.saveUser(user)
				notifyWith({message:'welcome!'})
			})
			.catch((e) => {
				dispatch({ type: 'ERROR' })
				notifyWith({message:'wrong username or password', isError: true})
			})
	}
} 


export default UserContext