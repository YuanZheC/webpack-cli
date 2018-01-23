const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base.js');
var config = merge(baseWebpackConfig, {
	devtool: 'eval',
	entry: {
		index: ['babel-polyfill', './src/js/index.js'],
	},
	output: {
		filename: '[name].bundle.js', //输出路径
		path: path.join(__dirname, '../dist'), //文件名[entryName] [hash:len] [chunkhash:len]
		publicPath: '/' //资源访问路径，CDN
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif)$/i,
				include: path.join(__dirname, '../src'),
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1000
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
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
	devServer: {
		contentBase: './dist',
		hot: true,
		noInfo: false,
		stats: {
			colors: true
		},
		historyApiFallback: true
	},
	plugins: [
		// new webpack.DefinePlugin({
		//   'process.env': JSON.stringify('development')
		// }),
		new HtmlWebpackPlugin({
			isDev: 'true',
			favicon: './src/imgs/favi.ico', //favicon路径
			alwaysWriteToDisk: true,
			filename: './index.html',
			vendor: './vendor.dll.js',
			template: './static/index.html',
			chunks: ['manifest', 'vendor','index']
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DllReferencePlugin({
			context: __dirname,
			/**
       * 在这里引入 manifest 文件
       */
			//此处路径对应于webpack.config.dll.js中生成的静态包生成的json路径,在webpack打包时,就先直接去这个json文件把预编译的资源弄进来
			manifest: require('../dist/vendor-manifest.json')
		})
	]
});

module.exports = config;