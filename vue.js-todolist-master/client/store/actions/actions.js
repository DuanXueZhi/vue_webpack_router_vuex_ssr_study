/**
 *  * Created by dxz on 2020/8/17-10:01.
 * explain：处理异步修改数据方法
 */
import model from '../../model/client-model'

const handleError = () => {

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
  }
}
