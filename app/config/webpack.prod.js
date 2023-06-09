const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
		path: paths.build,
		// NOTE: The env var will be using by the github workflow. IDK why you would do
		// anything else with the production build outside of that, so we will leave the
		// default path /.
		publicPath: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/',
		filename: 'js/[name].[contenthash].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {},
					},
					{
						loader: 'sass-loader',
						options: {},
					},
				],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					},
					{
						loader: 'string-replace-loader',
						options: {
							search: '__PUBLIC_URL__',
							replace: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/',
						},
					},
				],
			},
		],
	},
	plugins: [
		// Extracts CSS into separate files
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css',
			chunkFilename: '[id].css',
			// This little fella is required unless you want to spend hours figuring out
			// why css-loader/webpack does not generate correct paths for sprites.
			experimentalUseImportModule: false,
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), '...'],
		/*runtimeChunk: {
			name: 'runtime',
		},*/
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
