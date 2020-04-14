import { SAMPLE_DATA } from '../actions/type'
export default (state = [], action) => {
	switch (action.type) {
		case SAMPLE_DATA:
			return [...action.payload]
		default:
			return state
	}
}
