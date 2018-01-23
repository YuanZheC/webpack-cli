const path = require('path');
const webpack = require('webpack');
const baseConfig = {
	// context: path.resolve(__dirname, "../"),

	// 用来配置依赖文件的匹配，如依赖文件的别名配置、模块的查找目录、默认查找的
	// 文件后缀名
	// resolve.root 该选型用来制定模块查找的根路径，必须为**绝对路径**，值可以
	// 是路径字符串或者路径数组若是数组，则会依次查找
	resolve: {
		//绝对路径
		// root:
		//自动扩展 不需要写后缀
		extensions: ['.js','.json', '.css'],
		modules: [
			path.resolve(__dirname, '../node_modules'),
			path.join(__dirname, '../src')
		],
		//模块别名定义，方便后续直接引用别名，无须多写长长的地址
		alias: {
			utils: path.join(__dirname, '../src/utils'),
		}
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['manifest', 'vendor'].reverse(),
			minChunks: 2
		}),
		new webpack.ProvidePlugin({
			Promise: 'es6-promise' // works as expected
		}),
		//此功能:这种连结行为被称为“作用域提升(scope hoisting)”。
		//https://doc.webpack-china.org/plugins/module-concatenation-plugin可以查看
		new webpack.optimize.ModuleConcatenationPlugin(),
		//当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
		new webpack.NamedModulesPlugin(),
	],
};

module.exports = baseConfig;