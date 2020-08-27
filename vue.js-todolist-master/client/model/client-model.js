/**
 *  * Created by dxz on 2020/8/26-11:06.
 * explain：
 */
import axios from 'axios'
import { createError } from './utils'

const request = axios.create({
  baseURL: '/'
  // baseURL: process.env.VUE_ENV === 'server' ? 'http://127.0.0.1:3333/' : '/' // 服务端发送请求无法携带cookie且不是默认增加域名
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data) // axios请求默认包一层data
    }).catch(err => {
      const resp = err.response
      if (resp.status === 401) {
        reject(createError(401, err.message))
      }
    })
  })
}

export default {
  getAllTodos() {
    return handleRequest(request.get('/api/todos'))
  },
  login(username, password) {
    return handleRequest(request.post('/user/login', { username, password }))
  },
  updateTodo(id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  createTodo(todo) {
    return handleRequest(request.post('/api/todo', todo))
  },
  deleteTodo(id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },
  deleteAllCompleted(ids) {
    return handleRequest(request.post('/api/delete/completed', { ids }))
  }
}
