const Notifiation = ({ message, type }) => {
	if(message===null || message==='')	{
		return null
	}
	return (
		<div className={type + ' notification'}>{message}</div>
	)
}

export default Notifiation