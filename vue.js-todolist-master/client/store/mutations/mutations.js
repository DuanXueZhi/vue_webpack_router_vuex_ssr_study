/**
 *  * Created by dxz on 2020/8/17-9:19.
 * explain：
 */
export default {
  updateCount(state, num) { // 只可接收'两个参数'其他参数放在num对象中
    state.count = num
  },
  fillTodos(state, todos) {
    state.todos = todos
  },
  doLogin(state, userInfo) {
    state.user = userInfo
  }
}
