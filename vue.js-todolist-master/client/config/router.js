/**
 *  * Created by dxz on 2020/8/14-9:58.
 * explain：
 */
import Router from 'vue-router'

import routes from './routes'

// const router = new Router({
//   routes
// })

// export default router // 不推荐使用否则全局就是同一个router

export default () => {
  return new Router({
    routes
  })
}
