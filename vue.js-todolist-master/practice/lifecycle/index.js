/**
 *  * Created by dxz on 2020/8/13-10:11.
 * explain：
 */
import Vue from 'vue'

const app = new Vue({
  // el: '#root', // 不指定el不会执行mount()
  data: {
    text: 0
  },
  beforeCreate () { // 【不要修改数据，因为变量没有reactivity】
    console.log('beforeCreate', this.$el) // undefined
  },
  created () {
    console.log('created', this.$el) // undefined
  },
  beforeMount () { // 服务端渲染不会调用，因为不存在对dom操作
    console.log('beforeMount', this.$el) // <div>root</div>
  },
  mounted () { // 挂载方法 // 服务端渲染不会调用，因为不存在对dom操作
    console.log('mounted', this.$el) // <div>0</div>
  },
  beforeUpdate () {
    console.log('beforeUpdate', this)
  },
  updated () {
    console.log('updated', this)
  },
  activated () { // keepalive
    console.log('activated', this)
  },
  deactivated () { // keepalive
    console.log('deactivated', this)
  },
  beforeDestroy () {
    console.log('beforeDestroy', this)
  },
  destroyed () {
    console.log('destroyed', this)
  },
  // template: '<div>{{ text }}</div>',
  render (h) { // vue项目通过vue-loader处理为render function【解析template为render function比较耗时】
    // throw new TypeError('render error')
    // console.log('render function')
    return h('div', {}, this.text) // params：节点，事件，内容
  },
  renderError (h, err) { // 【仅开发环境有效】本组件渲染报错调用，子组件不关心
    return h('div', {}, err.stack)
  },
  errorCaptured () { // 捕获本组件及子组件报错
    // 会向上冒泡，可在正式环境使用
  }
})

app.$mount('#root')
// setInterval(() => {
//   app.text += 1
// }, 1000)

setTimeout(() => {
  app.$destroy()
}, 1000)
