/**
 *  * Created by dxz on 2020/8/20-16:31.
 * explain：
 */
const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' }) // 定制前缀

// 判断登录状态
const validateUser = async(ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'need login'
  } else {
    await next()
  }
}

// 设置返回固定格式
const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

// router对象可链式调用
apiRouter
  .get('/todos', validateUser, async(ctx) => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  .post('/todo', async(ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  .put('/todo/:id', async(ctx) => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  .delete('/todo/:id', async(ctx) => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  .post('/delete/completed', async(ctx) => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
