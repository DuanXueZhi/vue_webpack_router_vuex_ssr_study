/**
 *  * Created by dxz on 2020/8/14-9:57.
 * explain：
 */
import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
    name: 'app',
    meta: { // 通过.meta获取
      title: 'this app'
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
    props: (route) => ({ id: route.query.b }), // 根据url路径传参
    component: Login
  },
  {
    path: '/login/exact',
    component: Login
  }
]
