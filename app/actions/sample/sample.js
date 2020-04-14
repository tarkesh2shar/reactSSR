import { SAMPLE_DATA } from '../type'
import axios from 'axios'

export const getSampleData = () => async dispatch => {
	let res = await axios.get('https://jsonplaceholder.typicode.com/posts')
	dispatch({ type: SAMPLE_DATA, payload: res.data })
}
