/**
 *  * Created by dxz on 2020/8/14-17:49.
 * explain：
 */
import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount (state, num) {
        state.count = num
      }
    }
  })
}
