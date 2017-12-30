const path = require('path');

const pkg = require('./package');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'index'),
    [pkg.name]: path.resolve(__dirname, pkg.name)
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      }
    ]
  }
};
