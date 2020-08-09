import express from 'express'
import Renderer from './app/helpers/renderer'
const app = express()
import { matchRoutes } from 'react-router-config'
import Routes from './app/routes/routes'
import createStore from './app/helpers/serverStore'
import env from 'dotenv'
import proxy from 'express-http-proxy'
require('marko/browser-refresh').enable()
require('lasso/browser-refresh').enable(
	'*.marko *.css *.less *.styl *.scss *.sass *.png *.jpeg *.jpg *.gif *.webp *.svg',
)
env.config()

//////////////////
// var patterns = '*.css *.less *.styl *.scss *.sass *.png *.jpeg *.jpg *.gif *.webp *.svg'

// require('browser-refresh-client')
// 	.enableSpecialReload(patterns, { autoRefresh: false })
// 	.onFileModified(function (path) {
// 		// Code to handle the file modification goes here.

// 		// Now trigger a refresh when we are ready:
// 		if (isImage(path)) {
// 			browserRefreshClient.refreshImages()
// 		} else if (isStyle(path)) {
// 			browserRefreshClient.refreshStyles()
// 		} else {
// 			browserRefreshClient.refreshPage()
// 		}
// 	})

//////////////////
app.use(express.static('public'))
app.use('/api', proxy(process.env.API_SERVER))
app.get('*', (req, res) => {
	const store = createStore(req)
	//------------------------>  Load all the data Here  <------------------------//
	const promises = matchRoutes(Routes, req.path)
		.map(({ route }) => {
			return route.loadData ? route.loadData(store) : null
		})
		.map(promise => {
			if (promise) {
				return new Promise((resolve, reject) => {
					promise.then(resolve).catch(resolve)
				})
			}
		})
	Promise.all(promises).then(_ => {
		const context = {}
		const content = Renderer(req, store, context)
		//if we tend to redirect to some other place //
		//usually from <Redirect> Tag from react-router-dom
		if (context.url) {
			return res.redirect(301, context.url)
		}
		if (context.notFound) {
			res.status(404)
		}
		res.send(content)
	})
})
app.listen(4000, () => {
	console.log('Listening at port 4000')
	if (process.send) {
		process.send({ event: 'online' })
	}
})
