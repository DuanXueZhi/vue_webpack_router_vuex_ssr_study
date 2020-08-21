/**
 *  * Created by dxz on 2020/8/20-16:37.
 * explain：
 */
const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo' // 在线上数据库存在todo命名空间下

const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

// 处理返回值
const handleRequest = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => { // 需要调用初始化
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos() {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },
    async addTodo(todo) {
      return handleRequest(await request.post(`/${className}`, todo, { headers: getHeaders() }))
    }
  }
}
