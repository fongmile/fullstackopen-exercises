import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filter',
	initialState:'',
	reducers: {
		filterChange(state, action) {
			return action.payload;
		},
	}
})

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
/* 
const filterReducer = (state = '', action) => {
	switch (action.type) {
		case 'UPDATE_FILTER':
			return action.payload;
		default:
			return state;
	}
};

export const filterChange = (keyword) => {
	return {
		type: 'UPDATE_FILTER',
		payload: keyword,
	};
};

export default filterReducer;
 */