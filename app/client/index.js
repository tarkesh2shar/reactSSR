import React from 'react'
import ReactDOM from 'react-dom'
import Routes from '../routes/routes'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Reducers from '../reducers'
import thunk from 'redux-thunk'

const store = createStore(Reducers, window.INITIAL_STATE, applyMiddleware(thunk))
ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>{renderRoutes(Routes)}</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root'),
)
