/**
 *  * Created by dxz on 2020/8/17-10:01.
 * explain：处理异步修改数据方法
 */
export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  }
}
