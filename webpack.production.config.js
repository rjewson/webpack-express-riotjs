var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');

var config = {
  devtool: 'source-map',
  entry: {
    app : path.resolve(__dirname, 'app', 'main.js'),
    vendor : path.resolve(__dirname, 'app', 'vendor.js')
  },
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,   loader: 'babel', exclude: [nodeModulesPath] }, 
      { test: /\.css$/,  loader: 'style!css' },
      { test: /\.html$/, loader: 'riotjs' }
    ]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.ProvidePlugin({
      riot: 'riot'
    }),
    new Webpack.DefinePlugin({
      __DEV__: false
    }),
    new Webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js")
  ],
  resolve: {
    root:appPath
  }

};

module.exports = config;