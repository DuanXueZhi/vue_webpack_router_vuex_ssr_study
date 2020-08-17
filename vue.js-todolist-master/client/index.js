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
  store,
  render: (h) => h(App)
}).$mount('#root')
