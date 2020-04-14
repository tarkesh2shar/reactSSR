import { createStore, applyMiddleware } from 'redux'
import Reducers from '../reducers'
import thunk from 'redux-thunk'
import axios from 'axios'
import env from 'dotenv'
env.config()
export default req => {
	const axiosInstance = axios.create({
		baseURL: process.env.API_SERVER,
		headers: {
			cookie: req.get('cookie') || '',
		},
	})
	const store = createStore(Reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)))
	return store
}
