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
  addTodo(state, todo) {
    state.todos.unshift(todo)
  },
  updateTodo(state, { id, todo }) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1,
      todo
    )
  },
  deleteTodo(state, id) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1
    )
  },
  deleteAllCompleted(state) {
    state.todos = state.todos.filter(t => !t.completed)
  },
  doLogin(state, userInfo) {
    state.user = userInfo
  }
}
