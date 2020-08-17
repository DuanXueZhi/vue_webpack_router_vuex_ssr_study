/**
 *  * Created by dxz on 2020/8/17-15:51.
 * explain：
 */
const Koa = require('koa')

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
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})


