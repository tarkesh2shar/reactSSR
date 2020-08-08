const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
module.exports = {
	entry: ['babel-polyfill', './index.js'],
	target: 'node',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	externals: [webpackNodeExternals()],
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: 'ignore-loader',
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
						},
					},
					//minify image//
					'image-webpack-loader',
				],
			},

			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: 'ignore-loader',
			},
		],
	},
}
