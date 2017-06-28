const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 单独打包css
const autoprefixer = require('autoprefixer'); // css样式前缀

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'public/dist'), // string 所有输出文件的目标路径 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: 'app.js',
  },
  module: {
    // 关于模块配置
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        emitWarning: true,
      },
    }, {
      test: /\.(jsx|js)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'stage-0', 'react'],
      },
    }, {
      test: /\.(css|scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
        ],
      }),
    }],
  },
  // 文件路径的指向
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.json', '.jsx'], // 使用的扩展名
  },
  // devtool: 'source-map', // enum
  context: __dirname, // string（绝对路径！） webpack 的主目录
  target: 'web', // 编译为类浏览器环境里可用
  // externals: ['react'], // 不要遵循/打包这些模块，而是在运行时从环境中请求他们
  stats: 'errors-only', // 精确控制要显示的 bundle 信息
  devServer: {
    port: 3005,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    contentBase: path.join(__dirname, 'src'), // boolean | string | array, static file location
    compress: true, // 启用gzip压缩
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    disableHostCheck: true,
    // watchContentBase: true, // 告诉服务器监视那些通过 devServer.contentBase 选项提供的文件。文件改动将触发整个页面重新加载,每次ctrl+s保存都会重刷页面（即使没有文件改动）。
    hot: true,
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    overlay: { // 错误显示在页面上
      errors: true,
      // warnings: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //HMR --hot
    new ExtractTextPlugin({
      filename: '[name].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      title: 'react-start',
      template: 'src/index.html',
    }),
  ],
};