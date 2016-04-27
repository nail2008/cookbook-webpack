'use strict';

var path = require('path');

/*
  涉及代码: 本示例较简单,没有示例代码
	基本配置:
	entry,output,webpack-dev-server

	package.json里的相应配置:
	"scripts": {
		"build": "webpack --colors --profile --display-modules",
		"dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
	},

	其中build脚本的参数说明如下:
	1.webpack 默认使用webpack.config.js配置进行打包
	2.--colors 输出结果带彩色，比如：会用红色显示耗时较长的步骤
	3.--profile 输出性能数据，可以看到每一步的耗时
	4.--display-modules 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块

  dev脚本的参数说明如下:
  1.webpack-dev-server: 默认在localhost:8080建立一个web服务器
  2.--devtool eval: 为代码创建源地址,当有报错时可以让我们定位到文件和行号
  3.--progress: 显示合并代码进度
  4.--colors: 命令行中显示颜色
  5.--content-base build: 指向设置的输出目录
  6.--hot: 热部署??
 */

module.exports = {
  /*当entry是一个数组时,导出的文件只有最后一个
   @see http://webpack.github.io/docs/configuration.html#multiple-configurations
   If you pass an array: All modules are loaded upon startup. The last one is exported.
	*/
	//启动应用后,打开 http://localhost:8080/webpack-dev-server/index.html 试试
	entry:[
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://127.0.0.1:8080',
		path.resolve(__dirname,'app/index.js')
	],

	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	}
};


