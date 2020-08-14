/**
 *  * Created by dxz on 2020/8/14-9:57.
 * explain：
 */
import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
import Test from '../views/test/test.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    components: {
      default: Todo,
      a: Test
    },
    name: 'app',
    meta: { title: 'this app' }, // 通过.meta获取
    beforeEnter (to, from, next) {
      console.log('app route beforeEnter')
      next()
    },
    children: [
      {
        path: 'test',
        component: Login
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
      default: Login, // 【default：默认router-view】
      a: Todo // 【a：router-view name="a"】
    }
  },
  {
    path: '/login/exact',
    component: Login
  },
  {
    path: 'test',
    component: Test
  }
]
