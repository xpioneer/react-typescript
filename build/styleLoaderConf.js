const path = require('path'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin")

const _DEV_ = process.env.NODE_ENV === 'development'

console.log('当前路径：', process.cwd())

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: _DEV_ ? true : false,
    postcssOptions: {
      plugins: [
        ['postcss-preset-env', {
          browsers: '> 0.5%, not dead, iOS >= 7, Android >= 4.3'
        }]
      ]
    },
    // plugins: [
    //   require('autoprefixer'),
    //   // require('postcss-pxtorem')({
    //   //   rootValue: 40,
    //   //   propList: ['*'],
    //   //   selectorBlackList: [/^\.(vux|weui)-[\w]*/]
    //   // })
    // ]
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
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      postcssLoader,
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    ],
    // include: [path.join(process.cwd(), 'src')]
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

if(!_DEV_) {
  styleRules.forEach(rule => {
    rule.use.splice(0, 1, MiniCssExtractPlugin.loader)
  })
}

module.exports = styleRules
