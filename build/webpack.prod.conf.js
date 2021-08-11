'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const _PROD_ = process.env.NODE_ENV === 'production'

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '../')}),
    new OptimizeCSSAssetsPlugin({
      // cssProcessor: require('cssnano')({ autoprefixer: false })
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          // warnings: false,
          drop_console: _PROD_ ? true : false,
        },
        output: {
          comments: false
        }
      },
      parallel: true
    }),
    new HtmlWebpackPlugin({
      title: 'CMS-React',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true,
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    // keep modules.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
  ]
})

module.exports = webpackConfig
