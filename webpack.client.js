const miniCssExtract = require('mini-css-extract-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')
module.exports = {
	entry: ['babel-polyfill', './app/client/index.js'],
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].bundle.js',
		publicPath: './',
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
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
					'image-webpack-loader',
				],
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
						options: {
							url: true,
						},
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
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					name: 'vendor',
				},
			},
		},
	},
}
