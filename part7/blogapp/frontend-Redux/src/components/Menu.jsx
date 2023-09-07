import {Link} from 'react-router-dom'

import UserLoggedIn from '../components/UserLoggedIn'

const Menu = () => {

	return (
		<div className='menu'>
			<Link to="/">blogs</Link>
			<Link to="/users">users</Link>

			<UserLoggedIn />
		</div>
	)
}

export default Menu