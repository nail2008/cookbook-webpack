'use strict';
/*
 涉及代码: ./app2 ./build2 ./static 下的代码
 命令行:
   build: npm run build2
   dev: npm run dev2
 --------------------------------------------------       
 与react结合后的基础配置:
 1. babel-loader的配置: @see babel-loader的README.md
 安装命令如下:
 ```bash
 npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev
 ```
 webpack.config.js配置见注释#babel-loader
 2. 使用resolve.alias属性设置别名
 设置别名的目的一是简化项目中的引用路径,二是重定向
 下面是个通过别名引用node_modules的min资源的例子
 相关配置见注释#alias
 运行build和dev脚本,后台报出黄色的警告信息:
 ```
 WARNING in ./~/react/dist/react.min.js
 Critical dependencies:
 12:407-414 This seems to be a pre-built javascript file. Though this is possible, it's not recommended. Try to require the original source to get better results.
 @ ./~/react/dist/react.min.js 12:407-414
 ```
 这并不影响使用,只是警告:依赖不是package.json定义的那个源而已.
 另:别名设置的地址也可以是工程里的其他地址,注释#alias-static也是可以使用的
 3. 使用module.noParse属性, 阻止loader解析
 使用min包的时候,这些包已经是最小的了,并不需要loader解析处理(只需要加入,并不需要编译).
 我们可以使用module.noParse来阻止,见注释#noParse.
 下面加上配置前后build的对比:
 ```
 //之前
 [76] ./~/react/dist/react.min.js 136 kB {0} [built]
 [0] 1ms -> [75] 527ms -> factory:28ms building:263ms = 819ms
 [77] ./~/react-dom/dist/react-dom.min.js 706 bytes {0} [built]
 [0] 1ms -> [75] 527ms -> factory:97ms building:36ms dependencies:1ms = 662ms

 //之后
 [76] ./~/react/dist/react.min.js 136 kB {0} [built]
 [0] 0ms -> [75] 409ms -> factory:14ms building:104ms = 527ms
 [77] ./~/react-dom/dist/react-dom.min.js 706 bytes {0} [built]
 [0] 0ms -> [75] 409ms -> factory:14ms building:104ms = 527ms
 ```
 一个问题:
 启用noParse以后,别名使用node_modules的,不会出现依赖源的黄色报警(不用noParse之前是会的),但是访问应用时,console会抛require问题的异常;
 换成static的别名,会出黄色警告,但应用可以正常使用.
 总之,建议暂时不要使用noParse设置(这个问题在新环境上就会有,老环境上可能正常).
 */
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
//#alias
// var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
// var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
//#alias-static
// var pathToReact = path.resolve(__dirname, 'static/react.min.js');
// var pathToReactDom = path.resolve(__dirname, 'static/react-dom.min.js');


module.exports = {

	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://127.0.0.1:8080',
		path.resolve(__dirname, 'app2/index.jsx')
	],
	resolve: {
		alias: {//#alias
			'react': pathToReact,
			'react-dom': pathToReactDom
		}
	},
	output: {
		path: path.join(__dirname, 'build2'),
		filename: 'bundle.js'
	},
	module: {
		//#noParse
		noParse: [pathToReact,pathToReactDom],
		loaders: [
			{//#babel-loader
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}

};


