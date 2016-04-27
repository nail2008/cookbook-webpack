'use strict';
/*
 涉及代码: ./app3 ./build3 下的代码
 命令行:
	 build: npm run build3
	 dev: npm run dev3
 --------------------------------------------------
 CSS相关配置:
 1. 安装loader:
		 ```bash
	    npm install css-loader style-loader --save-dev
		 ```
		webpack.config.js配置见注释#css
 2. 每个组件自己的css在各自的组件中import,而不需要全局声明.
 3. 内联样式,见Component.jsx
 4. 如果引入了一个新的css文件,或者改了名字.需要重启服务后,webpack-dev-server才能监听这个文件的变化,自动刷新.
      

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
			{//#css
				test: /\.css?$/,
				loader: 'style!css'
				// loaders: ['style', 'css'] 注意是loaders 不是loader
			}
		]
	}

};


