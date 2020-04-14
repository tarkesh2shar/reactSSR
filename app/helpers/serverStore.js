import { createStore, applyMiddleware } from 'redux'
import Reducers from '../reducers'
import thunk from 'redux-thunk'
export default () => {
	const store = createStore(Reducers, {}, applyMiddleware(thunk))
	return store
}
