import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import Routes from '../routes/routes'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'

export default (req, store, context) => {
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter context={context} location={req.path}>
				<div>{renderRoutes(Routes)}</div>
			</StaticRouter>
		</Provider>,
	)
	return `
			<div id="root">${content}</div>
			<script>
			window.INITIAL_STATE= ${serialize(store.getState())}
			</script>
      <script src="bundle.js"></script>
  `
}
