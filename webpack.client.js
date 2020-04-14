const miniCssExtract = require('mini-css-extract-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')

const ASSET_PATH = process.env.ASSET_PATH || '/'

module.exports = {
	entry: ['babel-polyfill', './app/client/index.js'],
	mode: 'production',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
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
						loader: 'url-loader',
						options: { limit: 40000 },
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
		new webpack.HotModuleReplacementPlugin(),
		new miniCssExtract({
			filename: '[name].css',
		}),
		new webpack.DefinePlugin({
			'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
		}),
		new webpack.SourceMapDevToolPlugin({}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer()],
			},
		}),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},

				// vendor: {
				// 	test: /[\\/]node_modules[\\/]/,
				// 	name(module) {
				// 		const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
				// 		// npm package names are URL-safe, but some servers don't like @ symbols
				// 		return `npm.${packageName.replace('@', '')}`
				// 	},
				// 	chunks: 'all',
				// 	maxInitialRequests: 1,
				// 	minSize: 1,
				// },
			},
		},
	},
}
