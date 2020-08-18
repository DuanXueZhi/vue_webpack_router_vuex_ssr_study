/**
 *  * Created by dxz on 2020/8/18-15:55.
 * explain：
 */
import createApp from './create-app'

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#root')
})
