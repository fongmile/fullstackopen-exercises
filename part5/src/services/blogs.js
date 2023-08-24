import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async (newblog) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newblog, config)
	console.log(response.data);
	return response.data
}

export default { setToken,getAll,create }