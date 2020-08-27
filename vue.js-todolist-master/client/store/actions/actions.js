/**
 *  * Created by dxz on 2020/8/17-10:01.
 * explain：处理异步修改数据方法
 */
import model from '../../model/client-model'
// import model from 'model'
import notify from '../../components/notification/function'
import bus from '../../utils/bus'

const handleError = (err) => {
  // 处理401未登录
  if (err.code === 401) {
    notify({
      content: '未登录'
    })
    bus.$emit('auth')
  }
}

export default {
  updateCountAsync(store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
  fetchTodos({ commit }) {
    commit('startLoading')
    return model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        commit('endLoading')
        return handleError(err)
      })
  },
  addTodo({ commit }, todo) {
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        notify({
          content: '添加事件actions'
        })
      })
      .catch(err => {
        handleError(err)
      })
  },
  updateTodo({ commit }, id, todo) {
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', { id, todo: data })
        // notify({
        //   content: '修改事件actions'
        // })
      })
      .catch(err => {
        handleError(err)
      })
  },
  deleteTodo({ commit }, id) {
    model.deleteTodo(id)
      .then(data => {
        commit('deleteTodo', id)
        notify({
          content: '删除事件actions'
        })
      })
      .catch(err => {
        handleError(err)
      })
  },
  deleteAllCompleted({ commit, state }) {
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted')
        notify({
          content: '清理事件actions'
        })
      })
      .catch(err => {
        handleError(err)
      })
  },
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => { // 要与页面有耦合操作
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
        })
        .catch((err) => {
          handleError(err)
          reject(err)
        })
    })
  }
}
