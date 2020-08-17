/**
 *  * Created by dxz on 2020/8/14-17:49.
 * explain：
 */
import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
  // return new Vuex.Store({
  //   state: {
  //     count: 0
  //   },
  //   mutations: {
  //     updateCount (state, num) {
  //       state.count = num
  //     }
  //   }
  // })
  return new Vuex.Store({
    // strict: process.env.NODE_ENV !== 'production' // 严格模式，禁止（并警告）通过state.xxx修改变量，问题处理办法：https://vuex.vuejs.org/zh/guide/forms.html
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
