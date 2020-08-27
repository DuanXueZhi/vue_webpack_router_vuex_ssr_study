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
const serverRenderer = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.config.server')

const NativeModule = require('module')
const vm = require('vm')

// 编译webpack
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs // 指定serverCompiler输出目录

let bundle
// 启动serverCompiler编译bundle
serverCompiler.watch({}, (err, stats) => { // 监听文件变化
  if (err) throw err
  // 文件写入MemoryFS，没有写入硬盘
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    // 'vue-ssr-server-bundle.json'
    'server-entry.js' // 读取文件在硬盘上
  )
  // delete require.cache[bundlePath] // 删除缓存
  // bundle = require('../../server-build/server-entry.js').default // 打包后读取的文件
  try {
    const m = { exports: {} }
    const bundleStr = mfs.readFileSync(bundlePath, 'utf-8') // 读取文件
    // 类似require
    const wrapper = NativeModule.wrap(bundleStr) // 执行文件的module，增加一个函数function(module, exports, require)
    const script = new vm.Script(wrapper, { // new一段script可执行的内容【'开发环境'不支持路由异步加载，只能修改路由文件路由为同步加载，】
      filename: 'server-entry.js', // 内容名称
      displayErrors: true // 是否展示执行错误配置
    })
    const result = script.runInThisContext() // script执行的上下文
    result.call(m.exports, m.exports, require, m) // 执行server-entry中导出的内容并将结果放入m.exports中
    bundle = m.exports.default
  } catch (err) {
    console.log('compile js error', err)
  }

  console.log('new bundle generated')
})

// 处理返回内容
const handleSSR = async(ctx) => {
  if (!bundle) {
    ctx.body = '等一会，别着急。。。'
    return
  }

  // 跨服务获取文件
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8080/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data // 静态资源路径地址

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createRenderer({
      inject: false, // 是否需要注入其他内容，仅渲染
      clientManifest // 处理资源依赖关系
    })

  await serverRenderer(ctx, renderer, template, bundle) // ./server-render.js
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
