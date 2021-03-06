/**
 *  * Created by dxz on 2020/8/17-14:26.
 * explain：bundle生成根据文件
 */
import createApp from './create-app'

export default context => { // context server-render.js toString(context)
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    if (context.user) {
      store.state.user = context.user
    }

    router.push(context.url) // 区分路由

    router.onReady(() => { // 完成所有异步操作后
      const matchedComponents = router.getMatchedComponents() // 根据url匹配到响应的组件
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) { // 匹配组件中asyncData（option）
          return Component.asyncData({
            route: router.currentRoute,
            router,
            store
          })
        }
      })).then(data => {
        console.log(store.state)
        context.meta = app.$meta() // 使用自定义meta
        context.state = store.state
        context.router = router
        resolve(app)
      })
    })
  })
}
