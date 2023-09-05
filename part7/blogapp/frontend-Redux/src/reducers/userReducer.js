import { createSlice } from '@reduxjs/toolkit'

import { setNotification } from '../reducers/notificationReducer'
import storageService from '../services/storage'
import loginService from '../services/login'

const userSlice = createSlice({
	name: 'user',
	initialState:'',
	reducers: {
		setUser(state, action) {
			return action.payload
		},
	}
})
export const { setUser } = userSlice.actions

export const login = ( username, password ) => {

	return (dispatch) => {
		loginService
			.login({ username, password })
			.then((user) => {
				dispatch(setUser(user))
				storageService.saveUser(user)
				dispatch(setNotification({message: 'welcome!'}))
			})
			.catch((e) => {
				dispatch(setNotification({message: 'wrong username or password', type:'error'}))
			})
	}

}


export default userSlice.reducer