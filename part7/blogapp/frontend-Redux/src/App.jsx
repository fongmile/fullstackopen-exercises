import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import storageService from './services/storage'

import BlogList from './components/Blog'
import Users from './components/User'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import Menu from './components/Menu'

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
			<Router>
				<Menu />
				
				<h1>blog app</h1>
				<Notification />				

				<Routes>
					<Route path="/" element={<BlogList />} />
					<Route path="/blogs/:id" element={<BlogList />} />
					<Route path="/users/" element={<Users />} />
					<Route path="/users/:id" element={<Users />} />
				</Routes>
				
			</Router>
		</div>
	)
}

export default App
