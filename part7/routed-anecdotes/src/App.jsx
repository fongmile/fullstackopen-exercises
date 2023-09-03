import { useState } from 'react'
import {
	BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './components/Menu'
import Notification from './components/Notification'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'

const initList = [
	{
		content: 'If it hurts, do it more often',
		author: 'Jez Humble',
		info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
		votes: 0,
		id: 1
	},
	{
		content: 'Premature optimization is the root of all evil',
		author: 'Donald Knuth',
		info: 'http://wiki.c2.com/?PrematureOptimization',
		votes: 0,
		id: 2
	}
]

const App = () => {
	const [anecdotes, setAnecdotes] = useState(initList)
	const [notification, setNotification] = useState(null)

	const displayNotification = (message) => {
		setNotification(message)
		setTimeout(() => {setNotification(null)}, 5000)
	}

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
		displayNotification(`a new anecdote '${anecdote.content}' created!`)
	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id)

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Router>
				<Menu />
				<Notification message={notification} />

				<Routes>
					<Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
					<Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
					<Route path="/create/" element={<CreateNew handleCreate={addNew} />} />
					<Route path="/about/" element={<About />} />
				</Routes>
				
			</Router>
			<Footer />
		</div>
	)
}

export default App