const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		// 配置项用到的依赖
		vendor: ['babel-polyfill','react', 'react-dom']
	},
	output: {
		// 生成的*dll.js文件名
		filename: "[name].dll.js", // best use [hash] here too
		path: path.join(__dirname, '..', "dist"),
		// 生成文件的一些映射关系,与下面DLLPlugin中配置对应
		library: "vendor_lib_[hash]",
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: path.join(__dirname, '../')
		}),
		new CopyWebpackPlugin([
			{ from: './static/**/*', to: './' , flatten: true},
		]),
		// new webpack.DefinePlugin({
		//   'process.env': {
		//     NODE_ENV: JSON.stringify('development'),
		//   }
		// }),
		// 用DLLPlugin插件编译上面配置的NPM包
		new webpack.DllPlugin({
			context: __dirname,
			/**
             * path
             * 定义 manifest 文件生成的位置
             * [name]的部分由entry的名字替换
             */
			// 生成json文件,关于dll.js的配置信息
			path: path.join(__dirname, '..', "dist", 'vendor-manifest.json'),
			/**
             * name
             * dll bundle 输出到那个全局变量上
             * 和 output.library 一样即可。
             */
			name: "vendor_lib_[hash]",//和output对应即可
		})
	],
};

// module.exports = config;
// 用完 dllPlugin后,我们在 webpack.config.dev.js中还要用 new webpack.DllReferencePlugin 这个插件,现在转到 webpack.config.dev.js

