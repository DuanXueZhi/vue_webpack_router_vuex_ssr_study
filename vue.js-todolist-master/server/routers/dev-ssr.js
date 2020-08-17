/**
 *  * Created by dxz on 2020/8/17-15:59.
 * explain：处理开发环境服务端渲染
 */
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs') // 文件写入内存
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

// 获取配置
const serverConfig = require('../../build/webpack.config.server')

// 编译webpack
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs // 指定serverCompiler输出目录

let bundle
serverCompiler.watch({}, (err, stats) => { // 监听文件变化
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.hasWarnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

// 处理返回内容
const handleSS = async (ctx) => {
  if (bundle) {
    ctx.body = '等一会，别着急。。。'
    return
  }

  // 跨服务获取文件
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8080/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs')
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false // 不需要注入其他内容，仅渲染
    })
}
