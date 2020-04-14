import { SAMPLE_DATA } from '../type'
export const getSampleData = () => async (dispatch, state, ax) => {
	let res = await ax.get('/posts')
	dispatch({ type: SAMPLE_DATA, payload: res.data })
}
