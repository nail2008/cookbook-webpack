'use strict';
/*
 使用externals属性, 引用外部静态CDN资源
 1: 静态资源依赖使用cdn, 使用webpack的externals设置相关资源为外部资源.
 好处: 外部资源不参与编译, 速度快, 本项目代码编译出来的文件小
 缺点: 需要在index.html里配,无法自动化设置(其实也可以);cdn上可能没有最新版的资源

 在index.html里配置如下:

 <!--<script src="//cdn.bootcss.com/react/0.14.7/react.min.js"></script>-->
 <!--<script src="//cdn.bootcss.com/react/0.14.7/react-dom.min.js"></script>-->

 <!--使用cdn没问题,使用静态地址无法加载?-->
 <!--<script src="../static/react.min.js"></script>-->
 <!--<script src="../static/react-dom.min.js"></script>-->

 */
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {

	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://127.0.0.1:8080',
		path.resolve(__dirname, 'app/index.jsx')
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		libraryTarget: "umd" //#externals
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	},
	externals: {//#externals
		'react': {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		}
	}

};


