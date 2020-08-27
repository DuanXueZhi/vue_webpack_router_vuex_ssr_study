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
module.exports = async(ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path, user: ctx.session.user } // 【传入vue-server-render】客户端路径、js路径、css路径\style标签直接插入html

  try {
    const appString = await renderer.renderToString(context) // 渲染的结果

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath) // 重定向
    }

    const {
      title
    } = context.meta.inject() // 获取自定义meta

    const html = ejs.render(template, { // 通过ejs渲染
      appString,
      style: context.renderStyles(), // 带有style标签的整个字符串【插入html】
      scripts: context.renderScripts(), // script标签
      title: title.text(), // 使用自定义meta中的自定义title
      initalState: context.renderState() // 将store/state中的数据拿出来，放入renderState中
    })

    ctx.body = html // 返回html内容
  } catch (err) {
    console.log('render error', err)
    throw err // 抛出错误
  }
}
