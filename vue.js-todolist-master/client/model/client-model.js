/**
 *  * Created by dxz on 2020/8/26-11:06.
 * explain：
 */
import axios from 'axios'
import { createError } from './utils'

const request = axios.create({
  baseURL: '/'
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
  }
}
