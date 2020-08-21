/**
 *  * Created by dxz on 2020/8/21-14:40.
 * explain：
 */
const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'username' && user.password === '123') {
    ctx.session.user = {
      username: 'username'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'username'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
