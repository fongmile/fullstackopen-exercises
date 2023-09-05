import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState:[],
	reducers: {
		createBlog(state, action) {
			state.push(action.payload)
		},
		appendBlog(state, action) {
			state.push(action.payload)
		},
		sortBlogs(state, action) {
			let returnState = [...action.payload]
			return returnState.sort((a,b) => b.likes - a.likes)
		},
		likeBlog(state, action) {
			const toLike = action.payload
			let returnState = state.map((x) => (x.id !== toLike.id ? x : toLike))
			return returnState.sort((a,b) => b.likes - a.likes)
		},
		removeBlog(state, action) {
			const toRemove = action.payload
			let returnState = state.filter((x) => (x.id !== toRemove.id))
			return returnState.sort((a,b) => b.likes - a.likes)
		}
	}
})
export const { createBlog, appendBlog, sortBlogs, likeBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const response = await blogService.getAll()
		dispatch(sortBlogs(response))
	}
}

export const likeit = (blog) => {
	return async (dispatch,) => {
		const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
		const response = await blogService.update(blogToUpdate)
		dispatch(likeBlog(response))
	}
}

export const removeit = (blog) => {
	return async (dispatch) => {
		await blogService.remove(blog.id)
		dispatch(removeBlog(blog))
	}
}

export const createnew = (blog) => {
	return async (dispatch) => {
		const response = await blogService.create(blog);
		dispatch(appendBlog(response))
	}
}

export default blogSlice.reducer