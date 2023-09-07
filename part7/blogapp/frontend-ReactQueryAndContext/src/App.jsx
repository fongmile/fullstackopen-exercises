import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useUserValue, useUserDispatch } from './contexts/UserContext'

import storageService from './services/storage'

import Notification from './components/Notification'
import LoginForm from './components/Login'
import Menu from './components/Menu'
import Users from './components/User'
import BlogList from './components/Blog'


const App = () => {
	const user = useUserValue()
	const userDispatch = useUserDispatch()
	
	useEffect(() => {
		const user = storageService.loadUser()
		userDispatch({ type: 'SET', user })
	}, [])	
	
	if (!user) {
		return (
			<div>
				<h2>log in to application</h2>
				<Notification />
				<LoginForm />
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

/*


			*/