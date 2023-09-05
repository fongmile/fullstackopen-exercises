import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector((state) => state.notification)

	if(notification!==null && notification.message!=='')	{
		return (
			<div className={notification.type === 'error'? 'notification error':'notification'}>
				{notification.message}
			</div>
		)
	}	else {
		return null
	}	
}

export default Notification
