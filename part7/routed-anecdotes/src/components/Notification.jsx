const Notification = ({message}) => {
	
	const style = {
		marginTop:10,
		marginBottom:10
	}

	if(message!==null && message!=='')	{
		return (
			<div style={style}>
				{message}
			</div>
		)
	}	else {
		return null
	}
	
}

export default Notification