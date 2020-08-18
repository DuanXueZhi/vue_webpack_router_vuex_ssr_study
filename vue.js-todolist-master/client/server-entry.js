/**
 *  * Created by dxz on 2020/8/17-14:26.
 * explain：
 */
import { createApp } from './create-app'

export default context => { // context server-render.js toString(context)
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    router.onReady(() => { // 完成所有异步操作后
      const matchedComponents = router.getMatchedComponents() // 根据url匹配到响应的组件
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      resolve(app)
    })
  })
}
