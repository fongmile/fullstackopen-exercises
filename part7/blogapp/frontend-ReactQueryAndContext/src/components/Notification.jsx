import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
	const notification = useNotificationValue()

	if(notification!==null && notification.message!=='')	{
		return (
			<div className={notification.isError === true? 'notification error':'notification'}>
				{notification.message}
			</div>
		)
	}	else {
		return null
	}	
}

export default Notification