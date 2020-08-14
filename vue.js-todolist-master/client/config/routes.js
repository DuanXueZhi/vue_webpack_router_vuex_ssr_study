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
    component: Login
  },
  {
    path: '/login/exact',
    component: Login
  }
]
