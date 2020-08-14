import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

// import './assets/styles/test.css';
import './assets/styles/style.styl'
import './assets/styles/global.styl'

import createRouter from './config/router'

// const root = document.createElement('div')
// document.body.appendChild(root)

Vue.use(VueRouter)

const router = createRouter()

new Vue({
  router, // 注入
  render: (h) => h(App)
}).$mount('#root')
