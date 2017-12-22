const fs = require('fs');
const path = require('path');

class WebpackAfterAllPlugin {
  apply (compiler) {
    compiler.plugin('done', (compilation) => {
      setTimeout(() => {
        fs.writeFileSync(path.join(__dirname, '.ready'), '');
      }, 1000);
    });
  }
}

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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true,
          coverageVariable: '__macaca_coverage__'
        }
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new WebpackAfterAllPlugin()
  ]
};
