/**
 *  * Created by dxz on 2020/8/12-9:49.
 * explain：
 */
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const definePlugins = [
  // 该插件帮助我们安心地使用环境变量
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html') // 配置模板
  })
]

const devServer = { // 端口ip：默认port: 8080，host: localhost
  port: 9000,
  overlay: {
    errors: true
  },
  hot: true
}

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        //css预处理器，使用模块化的方式写css代码
        //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
        test: /\.styl/,
        use: [
          'vue-style-loader',
          { // 全局设置
            loader: 'css-loader',
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
  // import Vue from 'vue' // 指定vue导入文件
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: definePlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(), // 与vue-loader有关，不引入则报错：vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config. 提示引入
    // new webpack.NoEmitOnErrorsPlugin() // webpack4 内置
  ])
})

module.exports = config
