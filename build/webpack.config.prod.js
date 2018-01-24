const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
	// devtool: 'source-map',
	entry: {
		index: ['babel-polyfill', './src/js/index.js'],
		vendor: [
			'react',
			'react-dom'
		]
		/*vendor: [
			'antd',
			'react-router',
			'react',
			'react-dom',
			'react-redux',
			'moment'
		],*/
	},
	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: './' //资源访问路径，CDN
	},
	module: {
		rules: [
			// {
			//   enforce: "pre",
			//   test: /\.js$/,
			//   exclude: '/node_modules/',
			//   use: [
			//     {
			//       loader: 'eslint-loader',
			//       options: {
			//         emitError: true,
			//         fix: true
			//       },
			//     }
			//   ]
			// },
			{
				test: /\.(jpg|png|gif)$/i,
				include: path.join(__dirname, '../src'),
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1000,
							name: 'imgs/[name].[hash:8].[ext]'
						}
					}, {
						loader: 'image-webpack-loader',
						options: {
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 7,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							mozjpeg: {
								progressive: true,
								quality: 65
							}
						}
					}
				]
			},
			{
				test: /\.(css)$/,
				exclude: '/node_modules/',
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				}),
			},
			{
				test: /\.js$/,
				include: path.join(__dirname, '../src'),
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: ["react","es2015"]
							//plugins: [['import', { 'libraryName': 'antd', "libraryDirectory": "lib", 'style': 'css' }], 'transform-proto-to-assign']
						},
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: path.join(__dirname, '../')
		}),
		new CopyWebpackPlugin([
			{ from: './static/**/*', to: './' , flatten: true},
			// { from: './src/flexpaper', to: './js/flexpaper' },
		]),
		new webpack.optimize.UglifyJsPlugin({
			cache: true
		}),
		new HtmlWebpackPlugin({
			isDev: false,
			favicon: './src/imgs/favi.ico', //favicon路径
			alwaysWriteToDisk: true,
			filename: './index.html',
			template: './static/index.html',
			chunks: ['manifest', 'vendor', 'index'],
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
		}),
		new ExtractTextPlugin("styles.css"),
		new webpack.DefinePlugin({ // 去掉生产中为 wranings
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
});
