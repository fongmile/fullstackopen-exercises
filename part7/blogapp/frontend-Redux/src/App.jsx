import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import storageService from './services/storage'

import BlogList from './components/Blog'
import LoginForm from './components/Login'
import UserLoggedIn from './components/UserLoggedIn'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'

const App = () => {

	const dispatch = useDispatch()
	
	const user = useSelector((state) => state.user)

	useEffect(() => {
		const user = storageService.loadUser()
		dispatch(setUser(user))
		dispatch(initializeBlogs())
	}, [dispatch])


	if (!user) {
		return (
			<div>
				<h2>log in to application</h2>
				<Notification />
				<LoginForm  />
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification  />
			<UserLoggedIn />
			<NewBlog />
			<BlogList />
		</div>
	)
}

export default App
