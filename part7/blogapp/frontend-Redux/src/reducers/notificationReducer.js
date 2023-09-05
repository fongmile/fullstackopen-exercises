import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		showNotification(state, action) {
			return action.payload
		},
		hideNotification() {
			return null
		},
	}
})

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = ({message, type}) => {
	return (dispatch) => {
		dispatch(showNotification({message, type}))
		setTimeout(() => dispatch(hideNotification()), 3000)
	}
}

export default notificationSlice.reducer
