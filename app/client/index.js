import React from 'react'
import ReactDOM from 'react-dom'
import Routes from '../routes/routes'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Reducers from '../reducers'
import thunk from 'redux-thunk'
import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: '/api',
})
const store = createStore(
	Reducers,
	window.INITIAL_STATE,
	applyMiddleware(thunk.withExtraArgument(axiosInstance)),
)
ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>{renderRoutes(Routes)}</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root'),
)
