import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newObj) =>
	axios.post(baseUrl, newObj).then((res) => res.data);

export const updateAnecdote = (updatedObj) =>
	axios
		.put(`${baseUrl}/${updatedObj.id}`, updatedObj)
		.then((res) => res.data);
