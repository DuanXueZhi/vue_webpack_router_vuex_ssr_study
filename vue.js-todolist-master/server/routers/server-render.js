/**
 *  * Created by dxz on 2020/8/17-17:17.
 * explain：服务端渲染文件
 */
const ejs = require('ejs')
/**
 * @param ctx
 * @param renderer：开发与生产render不同
 * @param template：模板
 * @returns {Promise<void>}
 */
module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path } // 【传入vue-server-render】客户端路径、js路径、css路径\style标签直接插入html

  try {
    const appString = await renderer.renderToString(context) // 渲染的结果

    const html = ejs.render(template, { // 通过ejs渲染
      appString,
      style: context.renderStyles(), // 带有style标签的整个字符串【插入html】
      scripts: context.renderScripts() // script标签
    })

    ctx.body = html // 返回html内容
  } catch (err) {
    console.log('render error', err)
    throw err // 抛出错误
  }
}