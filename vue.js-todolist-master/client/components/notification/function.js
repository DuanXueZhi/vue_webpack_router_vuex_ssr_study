/**
 *  * Created by dxz on 2020/8/19-9:29.
 * explain：
 */
import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component) // 创建组件

const instances = []
let seed = 1 // 生成组件id

const notify = (options) => {
  if (Vue.prototype.$isServer) return // 判断服务端

  const {
    autoClose,
    ...rest // 剩余参数
  } = options

  const instance = new NotificationConstructor({
    propsData: { ...rest }, // 传入调用时的参数【content, btn】
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount() // 不传节点，仅生成el对象，并没有插入dom中，节点div已生成
  document.body.appendChild(instance.vm.$el)

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance) // 推入新生成的instance
  return instance.vm
}

export default notify
