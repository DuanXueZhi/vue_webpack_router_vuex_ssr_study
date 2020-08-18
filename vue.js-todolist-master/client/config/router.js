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
    routes,
    mode: 'history',
    // base: '/base/', // 所有path前端增加，router-link等跳转自动添加
    linkActiveClass: 'active-link', // class模糊匹配路由
    linkExactActiveClass: 'exact-active-link', // class精确匹配路由
    scrollBehavior: (to, from, savePosition) => {
      if (savePosition) { // 有保存的位置
        return savePosition
      } else { // 没有保存的位置
        return { x: 0, y: 0 }
      }
    }
    // parseQuery (query) {}, // parse【自定义】
    // stringifyQuery (obj) {} // stringify【自定义】
    // fallback: true // 不支持不跳转刷新的浏览器vue自动改为hash模式
  })
}
