/**
 *  * Created by dxz on 2020/8/17-9:22.
 * explain：类似组件computed()
 */
export default {
  fullName (state) {
    return `${state.firstName} ${state.lastName}`
  }
}
