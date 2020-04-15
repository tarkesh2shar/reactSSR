import Home from '../client/pages/Home'
import NotFound from '../client/pages/notFoundPage'
export default [
	{
		path: '/',
		...Home,
		exact: true,
	},
	{
		path: '/home',
		component: () => 'This is a home from react-router-config',
	},
	{
		...NotFound,
	},
]
