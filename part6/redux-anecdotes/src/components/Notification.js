import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector((state) => state.notification)//'12345' //useSelector(/* something here */)
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		marginBottom: 15
	}

	if(notification!==null && notification!=='')	{
		return (
			<div style={style}>
				{notification}
			</div>
		)
	}	else {
		return null
	}
	
}

export default Notification