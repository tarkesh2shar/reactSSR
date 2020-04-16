const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const miniCssExtract = require('mini-css-extract-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
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
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'css-hot-loader',
					},
					{
						loader: miniCssExtract.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 40000 },
					},
					'image-webpack-loader',
				],
			},

			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: 'css-hot-loader',
					},
					{
						loader: miniCssExtract.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
	plugins: [
		new miniCssExtract({
			filename: '[name].css',
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer()],
			},
		}),
	],
}
