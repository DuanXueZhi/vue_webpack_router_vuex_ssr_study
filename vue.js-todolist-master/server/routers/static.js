/**
 *  * Created by dxz on 2020/8/18-16:39.
 * explain：处理静态路径
 */
const Router = require('koa-router')
const send = require('koa-send')

const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
