'use strict';
/*
 本例只是些配置,不涉及代码及命令行,如果需要可以用step3的
 --------------------------------------------------
 Less相关配置:
 1. 安装loader:
		 ```bash
	    npm install less less-loader --save-dev
		 ```
		webpack.config.js配置见注释#less
 2. 从less文件中导入另一个less文件:
    @import "./core/index.less";
 3. 导入node_modules中的文件:
    $import "~bootstrap/less/bootstrap";

 内联images,font的配置:
 1. 安装:
		```bash
		  npm install url-loader file-loader --save-dev
		```
    webpack.config.js配置见注释#url
 2. url-loader 传入的 limit 参数是告诉它图片如果不大于 25KB 的话要自动在它从属的 css 文件中转成 BASE64 字符串。

 */
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

module.exports = {

	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://127.0.0.1:8080',
		path.resolve(__dirname, 'app3/index.jsx')
	],
	resolve: {
		alias: {
			'react': pathToReact,
			'react-dom': pathToReactDom
		}
	},
	output: {
		path: path.join(__dirname, 'build3'),
		filename: 'bundle.js'
	},
	module: {
		//noParse: [pathToReact,pathToReactDom],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{//#less
				test: /\.less?$/,
				loader: 'style!css!less'
			},
			{//#url images
				test: /\.(png|jpg)$/,
				loader: 'url?limit=25000'
			},
			{//#url font 字体除了woff,还有svg的解决方案.
				test: /\.woff$/,
				loader: 'url?limit=100000'
			}
		]
	}

};


