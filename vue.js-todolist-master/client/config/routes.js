/**
 *  * Created by dxz on 2020/8/14-9:57.
 * explain：
 */
import Test from '../views/test/test.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app', // 非嵌套路由必须包含一个前导斜线字符
    components: {
      default: () => import('../views/todo/todo.vue'),
      a: Test
    },
    name: 'app',
    meta: { title: 'this app' }, // 通过.meta获取
    beforeEnter(to, from, next) {
      console.log('app route beforeEnter')
      next()
    },
    children: [
      {
        path: 'test',
        component: () => import('../views/login/login.vue') // 异步加载写入运存
      }
    ]
  },
  {
    path: '/login/:id',
    // props: true, // 组件可以使用类似props方式使用id【与组件合并（不需要使用this.$route.id）】
    // props: {
    //   id: 123
    // },
    // 根据url路径传参
    // props: (route) => ({ id: route.query.id }), // component仅一个
    props: { // components多个内容key值一一对应
      default: (route) => ({ id: route.query.b }) // 访问方式http://localhost:8080/base/login/abc?b=123
    },
    components: {
      default: () => import('../views/login/login.vue'), // 【default：默认router-view】
      a: () => import('../views/todo/todo.vue') // 【a：router-view name="a"】
    }
  },
  {
    path: '/login/exact',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/test',
    component: Test
  }
]
