/**
 *  * Created by dxz on 2020/8/18-17:15.
 * explain：
 */
import Notification from './notification.vue'
import notify from './function'

export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
