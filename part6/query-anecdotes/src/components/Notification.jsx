import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		marginBottom: 5
	}

	const notice = useNotificationValue()

	if (!notice) return null

	return (
		<div style={style}>
			{notice}
		</div>
	)
}

export default Notification