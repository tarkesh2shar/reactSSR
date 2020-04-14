import Home from '../client/pages/Home'
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
]
