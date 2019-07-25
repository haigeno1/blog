var path = require('path');
var rootPath = path.resolve(__dirname)
module.exports = {
	entry: {
		index: './index.js'
	},
	output: {
		path: rootPath,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	}
};
