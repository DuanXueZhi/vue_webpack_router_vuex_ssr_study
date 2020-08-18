/**
 *  * Created by dxz on 2020/8/10-14:58.
 *  explain：所有webpack（环境）依赖的配置
 */
const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production', // development || production || none
  target: 'web', // String | function(compiler编译者) // 为目标（target）指定环境【默认为web】
  // 入口， __dirname 是当前文件所在目录
  entry: path.join(__dirname, '../client/client-entry.js'),
  // 输出
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8080/public/'
  },
  // webpack原生只支持js文件类型，只支持ES5语法，我们使用以.vue文件名结尾的文件时，需要为其指定loader
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: path.join(__dirname, 'node_modules'),
        enforce: 'pre' // 预处理（在使用响应loader之前处理）
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules'), // 排除node_modules内容 __dirname写法防止'bindings' of null报错
        include: path.join(__dirname, 'client'),
        options: {
          presets: ['env']
        }
      },
      // 将小于1024d的图片转为base64，减少http请求
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-[hash:8].[ext]',
              outputPath: 'assets/img/'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
