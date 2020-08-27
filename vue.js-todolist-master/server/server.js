/**
 *  * Created by dxz on 2020/8/17-15:51.
 * explain：
 */
const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const koaBody = require('koa-body')
const koaSession = require('koa-session')

const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const createDb = require('./db/db') // 全局引用db文件
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

// const pageRouter = require('./routers/dev-ssr')

const app = new Koa()

app.keys = ['vue ssr tech'] // 加密key
app.use(koaSession({
  key: 'v-ssr-id', // 【在set-cookie中】
  maxAge: 2 * 60 * 1000 // 2小时过期时间，服务端无法主动过期json-web-token
}, app))

const isDev = process.env.NODE_ENV === 'development'

/**
 * 中间件
 */
// 错误处理
app.use(async(ctx, next) => {
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

app.use(async(ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async(ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods()) // 使/api开头的请求都进如apiRouter中处理

let pageRouter
if (isDev) {
  // pageRouter = require('./routers/dev-ssr')
  pageRouter = require('./routers/dev-ssr-no-bundle')
} else {
  pageRouter = require('./routers/ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
