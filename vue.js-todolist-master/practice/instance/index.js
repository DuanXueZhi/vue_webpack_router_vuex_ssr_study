/**
 *  * Created by dxz on 2020/8/12-10:25.
 * explain：
 */
import Vue from 'vue' // 二级目录不能使用查看webpack配置中'vue'路径
const app = new Vue({
  data: {
    text: 'text',
    num: 0,
    obj: {} // 没有声明a则a为非响应式变量
  },
  template: '<div>{{text}}+{{num}}-{{obj.a}}</div>'
})
app.$mount('#root')
// app.text = 'text1'

let i = 0
setInterval(() => {
  // app.num++
  i++
  // app.obj.a = i
  // app.$forceUpdate() // 强制渲染
  app.$set(app.obj, 'a', i) // vue将a属性设置为响应式变量
  // app.$delete(app.obj, 'a') // 删除变量及其响应式，否则响应式存在造成内存溢出
  // app.$options.data.num += 1 // 不能修改【options传入后vue做了修改】
  // app.$data.num++ // 可以修改【$data.num === (vue)data.num】
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el) // html节点
// console.log(app.$options) // new Vue(options) 【$options = 原options + options】
// app.$options.render = (h) => { // 页面值有变化则渲染该内容
//   return h('div', {}, 'new render function')
// }
// console.log(app.$root, app.$root === app) // Vue对象，根节点（app），其下每个节点都可以调用且相等
// console.log(app.$children) // 组件<item><div></div></item> $children === <div></div>
// console.log(app.$slots) // 插槽
// console.log(app.scopedSlots) // 插槽
// console.log(app.$refs) // 获取节点<div ref='xxx'></div>
// console.log(app.$isServer) // 判断是否是服务器

// const unwatch = app.$watch('num', function (next, old) { // === watch:
//   console.log(next, old)
// })
//
// setTimeout(() => {
//   unwatch() // 注销watch
// }, 2000)

app.$on('event', function (a, b) {
  console.log('event', a, b)
})

app.$once('eventOnce', function (a, b) {
  console.log('eventOnce', a, b)
})

setInterval(() => {
  app.$emit('eventOnce', 1, 2) // 同一vue对象，不会冒泡
}, 1000)

// app.$nextTick(() => {})
