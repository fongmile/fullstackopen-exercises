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
