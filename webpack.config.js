var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');

var config = {
  context: __dirname,
  devtool: 'eval-source-map',
  entry: {
    app : [
    'webpack-dev-server/client?http://localhost:3000', 
    'webpack/hot/dev-server', 
    path.resolve(appPath, 'main.js')
  ],
  vendor : path.resolve(appPath, 'vendor.js')
  },
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
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
      __DEV__: true
    }),
    new Webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js")
  ],
  resolve: {
    root:appPath
  }
};

module.exports = config;