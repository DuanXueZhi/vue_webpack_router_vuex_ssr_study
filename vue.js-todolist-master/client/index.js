import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

// import './assets/styles/test.css';
import './assets/styles/style.styl'
import './assets/styles/global.styl'

import createRouter from './config/router'
import createStore from './store/store'
import Vuex from 'vuex'

// const root = document.createElement('div')
// document.body.appendChild(root)

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

store.registerModule('c', { // 动态注册模块
  state: {
    text: 3
  }
})

// store.unregisterModule('c') // 解绑c模块

store.watch((state) => state.count, (newCount) => { // 参数1中依赖的值变化则调用2中的函数【参数一不能是定义好的getters】
  console.log('newCount watched', newCount)
})

store.subscribe((mutations, state) => { // 订阅【监控mutations的变化】
  console.log(mutations.type, state, mutations.payload, mutations)
})

store.subscribeAction((action, state) => {
  console.log('subscribe actions', action.type, action.payload)
})

/**
 * 全局路由守卫
 */
router.beforeEach((to, from, next) => {
  console.log('beforeEach invoked')
  // if (to.fullPath === '/app') {
  //   next({ name: '/login', replace: true }) // replace是否推送到路由栈中储存
  // } else {
  next()
  // }
})

// 全局 beforeEach -> 路由 beforeEnter -> 组件 beforeEnter -> beforeResolve
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach invoked')
})

new Vue({
  router, // 注入
  store, // 注入
  render: (h) => h(App)
}).$mount('#root')
