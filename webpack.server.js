const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
module.exports = {
	entry: ['babel-polyfill', './index.js'],
	target: 'node',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		// publicPath: ""
	},
	externals: [webpackNodeExternals()],
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
			},
		],
	},
}
