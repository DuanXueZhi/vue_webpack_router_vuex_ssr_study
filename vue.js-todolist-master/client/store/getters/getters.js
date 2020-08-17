/**
 *  * Created by dxz on 2020/8/17-9:22.
 * explain：类似组件computed()
 */
export default {
  fullName (state) { // 依赖变量修改则修改
    return `${state.firstName}111 ${state.lastName}`
  }
}
