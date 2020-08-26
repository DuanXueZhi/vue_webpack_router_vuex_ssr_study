/**
 *  * Created by dxz on 2020/8/17-10:01.
 * explain：处理异步修改数据方法
 */
import model from '../../model/client-model'
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
    model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        return handleError(err)
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
