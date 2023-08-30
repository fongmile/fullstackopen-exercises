import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'VOTED':
			return `anecdote '${action.payload}' voted`;
		case 'CREATED':
			return `anecdote '${action.payload}' created`;
		case 'CONTENT_TOO_SHORT':
			return 'too short anecdote, must have length 5 or more';
		case 'RESET':
		default:
			return null;
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, null)

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[1]
}


export default NotificationContext