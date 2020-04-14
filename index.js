import express from 'express'
import Renderer from './app/helpers/renderer'
const app = express()
import { matchRoutes } from 'react-router-config'
import Routes from './app/routes/routes'
import createStore from './app/helpers/serverStore'
import env from 'dotenv'
import proxy from 'express-http-proxy'
env.config()
app.use(express.static('public'))

app.use('/api', proxy(process.env.API_SERVER))
app.get('*', (req, res) => {
	const store = createStore(req)
	//------------------------>  Load all the data Here  <------------------------//
	const promises = matchRoutes(Routes, req.path).map(({ route }) => {
		return route.loadData ? route.loadData(store) : null
	})
	Promise.all(promises)
		.then(data => {
			res.send(Renderer(req, store))
		})
		.catch(e => {
			console.log(e)
		})
})
app.listen(4000, () => {
	console.log('Listening at port 4000')
})
