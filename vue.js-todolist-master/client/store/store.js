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
    actions,
    modules: {
      a: {
        namespaced: true, // 开启模块命名空间
        state: {
          text: 1
        },
        mutations: { // 默认放在全局mutations【命名空间开启，直接调用报错】
          updateText (state, text) {
            console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            return state.text + rootState.b.text
          }
        },
        actions: {
          add ({ state, commit, rootState }) { // 默认在本模块寻找mutations
            commit('updateText', 'a+actions')
            commit('updateCount', 'add123', { root: true })
          }
        }
      },
      b: {
        state: {
          text: 2
        },
        actions: {
          testAction ({ commit }) {
            commit('a/updateText', 'test action', { root: true }) // 没有namespaced可以不写{ root: true }
          }
        }
      }
    }
  })
}