var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'src/js'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
      loaders: [
          { test: path.join(__dirname, 'src/js'),
            loader: 'babel-loader' }
      ]
  },
  debug: true
};
