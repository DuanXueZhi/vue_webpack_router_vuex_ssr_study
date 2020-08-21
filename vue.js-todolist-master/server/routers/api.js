/**
 *  * Created by dxz on 2020/8/20-16:31.
 * explain：
 */
const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' }) // 定制前缀

// 设置返回固定格式
const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

// router对象可链式调用
apiRouter
  .get('/todos', async(ctx) => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  .post('/todo', async(ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
