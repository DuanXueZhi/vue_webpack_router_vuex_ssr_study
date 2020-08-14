/**
 *  * Created by dxz on 2020/8/10-15:00.
 *  explain：扩展webpack配置
 */
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // webpack4相关 == webpack3 extract-text-webpack-plugin
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const definePlugins = [
  // 该插件帮助我们安心地使用环境变量
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

const devServer = { // 端口ip：默认8080，localhost
  // port: 9000,
  // host: '127.0.0.1',
  overlay: {
    errors: true
  },
  historyApiFallback: {
    index: '/public/index.html' // 指向生成的index.html，与base中publicPath拼接
  },
  hot: true
}

let config

if (isDev) { // 开发环境 // 合理合并base中的配置
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          // css预处理器，使用模块化的方式写css代码
          // stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
          test: /\.styl/,
          use: [
            'vue-style-loader',
            { // 全局设置
              loader: 'css-loader'
              // options: {
              //   modules: {
              //     localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]' // 设置类名
              //   }
              // }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: definePlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new VueLoaderPlugin() // 与vue-loader有关，不引入则报错：vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config. 提示引入
      // new webpack.NoEmitOnErrorsPlugin() // webpack4 内置
    ])
  })
} else { // 正式环境
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        // css预处理器，使用模块化的方式写css代码
        // stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
        {
          test: /\.styl/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                publicPath: './',
                hmr: process.env.NODE_ENV === 'development'
              }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all' // 默认打包到vendorChunk
      },
      runtimeChunk: true
    },
    plugins: definePlugins.concat([
      new VueLoaderPlugin(), // 与vue-loader有关，不引入则报错：vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config. 提示引入
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: 'styles.[chunkhash].[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false // Enable to remove warnings about conflicting order
      })
    ])
  })
}

module.exports = config
