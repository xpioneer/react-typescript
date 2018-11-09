const path = require('path'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  webpackConfig = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackConfig, {
  devtool: 'cheap-modules-eval-source-map',
  mode: 'development',
  devServer: {
    port: '8022',
    host: 'localhost',
    proxy: {
      '/api': 'http://127.0.0.1:8020',
      '/graphql': 'http://127.0.0.1:8020'
    },
    contentBase: path.join(__dirname, '../dist'), // boolean | string | array, static file location
    // publicPath: '/',
    stats: {
      color: true
    },
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    // hotOnly: true,
    // inline: true,
    https: false, // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'CMS DEV',
      filename: 'index.html',
      template: '../src/index.html',
    })
  ]
});

  