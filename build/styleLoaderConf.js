const path = require('path')

const _DEV_ = process.env.NODE_ENV === 'development'

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: _DEV_ ? true : false,
    plugins: [
      require('autoprefixer')({
        browsers: ["iOS>7", "Android>4", "Chrome > 31", "ff > 31", "ie >= 11"]
      }),
      // require('postcss-pxtorem')({
      //   rootValue: 40,
      //   propList: ['*'],
      //   selectorBlackList: [/^\.(vux|weui)-[\w]*/]
      // })
    ]
  }
}

const styleRules = [
	{
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      postcssLoader,
      'sass-loader'
    ],
    include: [path.join(__dirname, '../src')]
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      postcssLoader
    ]
  },
]

// if(!_DEV_) {
//   styleRules.forEach(rule => {
//     rule.use.splice(0, 1, MiniCssExtractPlugin.loader)
//   })
// }

module.exports = styleRules
