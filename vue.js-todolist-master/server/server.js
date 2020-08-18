/**
 *  * Created by dxz on 2020/8/17-15:51.
 * explain：
 */
const Koa = require('koa')
const send = require('koa-send')
const path = require('path')

const pageRouter = require('./routers/dev-ssr')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

/**
 * 中间件
 */
// 错误处理
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log('err: ', err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
