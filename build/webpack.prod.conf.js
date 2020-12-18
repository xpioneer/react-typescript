'use strict'
const path = require('path'),
webpack = require('webpack'),
TerserPlugin = require("terser-webpack-plugin"),
{merge} = require('webpack-merge'),
baseWebpackConfig = require('./webpack.base.conf'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
// UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const _PROD_ = process.env.NODE_ENV === 'production'

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    // new OptimizeCSSAssetsPlugin({
    //   // cssProcessor: require('cssnano')({ autoprefixer: false })
    // }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false,
    //       drop_console: _PROD_ ? true : false,
    //     },
    //     output: {
    //       comments: false
    //     }
    //   },
    //   parallel: true
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'CMS-React',
    //   filename: 'index.html',
    //   template: path.resolve(__dirname, '../src/index.html'),
    //   inject: true,
    //   minify: {
    //     minifyJS: true,
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    // }),
    // keep modules.id stable when vendor modules does not change
    // new webpack.HashedModuleIdsPlugin(),
  ]
})
