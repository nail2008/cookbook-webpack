'use strict';
/*
 

 */
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

module.exports = {

	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://127.0.0.1:8080',
		path.resolve(__dirname, 'app/index.jsx')
	],
	resolve: {
		alias: {
			'react': pathToReact,
			'react-dom': pathToReactDom
		}
	},
	output: {
		path: path.join(__dirname, 'build'),
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
			{
				test: /\.less?$/,
				loader: 'style!css!less'
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=25000'
			},
			{
				test: /\.woff$/,
				loader: 'url?limit=100000'
			}
		]
	}

};


