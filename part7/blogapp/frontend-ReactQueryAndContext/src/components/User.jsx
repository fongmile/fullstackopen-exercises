
import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import userService from '../services/user'

const UserBloglist = ({list}) => {
	return (
		<div>
			<h3>added blogs</h3>
			<ul>
				{list.map(x => 
					<li key={x.id}>
						<Link to={`/blogs/${x.id}`}>{x.title}</Link>
					</li>
				)}
			</ul>
		</div>
	)
}

const User = ({users,id}) => {
	const thisUser = users.find((x) => x.id===id)
	if(!thisUser)	{
		return <div>No user found</div>
	}
	return (
		<div>
			<h2>{thisUser.name}</h2>			
			{thisUser.blogs.length>0 ? <UserBloglist list={thisUser.blogs} /> : <div>No blog added yet</div>}
		</div>
	)
}

const Users = () => {
	const [userlist, setUserlist] = useState(null)
	const id = useParams().id

	useEffect(() => {
		userService
			.getAll()
			.then((data) => setUserlist(data))
	}, [])

	if(!userlist)	{
		return <div>loading...</div>
	}

	if(id)	{
		return (
			<User users={userlist} id={id} />
		)
	}	
	
	return (
		<div>
			<h2>Users</h2>
			<table cellPadding='0' cellSpacing='0' className='user-table'>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{userlist.map(x => 
						<tr key={x.id}>
							<td><Link to={`/users/${x.id}`}>{x.name}</Link></td>
							<td>{x.blogs.length}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Users
