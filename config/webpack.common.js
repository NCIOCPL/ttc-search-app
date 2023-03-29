const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');

const config = {
	entry: [paths.src + '/index.js'],
	output: {
		path: paths.build,
		filename: '[name].bundle.js',
		publicPath: '/',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: paths.public,
					to: 'assets',
					globOptions: {
						ignore: ['*.DS_Store'],
					},
					noErrorOnMissing: true,
				},
			],
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.src + '/index.html',
			filename: 'index.html',
			minify: false,
			meta: {
				charset: { charset: 'UTF-8' },
			},
		}),
		new MiniCssExtractPlugin(),
	],
};

module.exports = config;
