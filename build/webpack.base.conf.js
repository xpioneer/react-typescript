const path = require('path'),
  webpack = require('webpack');

const _PROD_ = process.env.NODE_ENV === 'production';

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    plugins: () => [
      require("autoprefixer")({
          browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 11"]
      })
    ],
    sourceMap: true
  }
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../src/index.tsx"),
  },

  output: {
    path: path.resolve(__dirname, "../dist"), // string
    // 所有输出文件的目标路径
    // publicPath: "/assets/", // string
    // // 输出解析文件的目录，url 相对于 HTML 页面
    // library: "MyLibrary", // string,
    // // 导出库(exported library)的名称
    // libraryTarget: "umd", // 通用模块定义
    // 导出库(exported library)的类型

    publicPath: '/',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.[hash].js',
    filename: './[name].bundle.[hash:8].js'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(process.cwd(), "src")
        ],
        loader: "awesome-typescript-loader",
        options: {
          // useBabel: true,
        }
      },
      {
        test: /\.css?$/,
        include: [
          path.resolve(process.cwd(), "src")
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          name: "assets/[name]-[hash:8].[ext]",
          limit: 2048
        }
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          name: "assets/[name]-[hash:8].[ext]",
          limit: 2048
        }
      }
    ]
  },

  resolve: {
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
    modules: [
      "node_modules",
      path.resolve(__dirname, "../src")
    ],
    // 用于查找模块的目录

    extensions: [".js", ".ts", ".tsx"],

    alias: {
      '@src': path.resolve(process.cwd(), 'src'),
      '@assets': path.resolve(process.cwd(), 'src/assets'),
      '@components': path.resolve(process.cwd(), 'src/components'),
      '@pages': path.resolve(process.cwd(), 'src/pages'),
      '@pages': path.resolve(process.cwd(), 'src/pages')
    }
  },

  // performance: {
  //   hints: "warning", // 枚举
  //   maxAssetSize: 200000, // 整数类型（以字节为单位）
  //   maxEntrypointSize: 400000, // 整数类型（以字节为单位）
  //   assetFilter: function(assetFilename) {
  //       // 提供资源文件名的断言函数
  //       return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
  //   }
  // },

  context: __dirname, // string（绝对路径！）
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录解析

  target: "web", // default

  // externals: ["react", /^@angular\//],
  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

  stats: "errors-only",
  // 精确控制要显示的 bundle 信息

  optimization: {
    minimize: !_PROD_ ? false : true,
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial"
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify(_PROD_ ? "development" : "production")
    //   },
    //   _DEV_: JSON.stringify(_DEV_),
    // }),
    new webpack.ProvidePlugin({
      $http: [path.resolve(process.cwd(), 'src/utils/http.ts'), 'default']
  }),
  ]
}