import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes';

/*
const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

const initialState = anecdotesAtStart.map(asObject)
*/

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState:[],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload);
		},
		voteAnecdote(state, action) {
			const voted = action.payload
			let returnState = state.map((x) => (x.id !== voted.id ? x : voted))
			return returnState.sort((a,b) => b.votes - a.votes)
		},
		appendAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			let returnState = [...action.payload]
			return returnState.sort((a,b) => b.votes - a.votes)
		}
	}
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const response = await anecdoteService.getAll();
		dispatch(setAnecdotes(response));
	};
};

export const createnew = (content) => {
	return async (dispatch) => {
		const response = await anecdoteService.create(content);
		dispatch(appendAnecdote(response));
	};
};

export const voteit = (id) => {
	return async (dispatch, getState) => {
		const thisObj = getState().anecdotes.find((n) => n.id === id);
		const votedObj = {...thisObj, votes: thisObj.votes+1}
		const response = await anecdoteService.update(id, votedObj)
		dispatch(voteAnecdote(response));
	}
};

export default anecdoteSlice.reducer;