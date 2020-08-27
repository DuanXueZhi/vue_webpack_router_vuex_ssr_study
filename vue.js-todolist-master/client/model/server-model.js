/**
 *  * Created by dxz on 2020/8/27-9:59.
 * explain：服务端渲染使用
 */
const config = require('../../app.config')
const createDb = require('../../server/db/db')

const db = createDb(config.db.appId, config.db.appKey)

export default {
  getAllTodos() {
    return db.getAllTodos()
  }
}
