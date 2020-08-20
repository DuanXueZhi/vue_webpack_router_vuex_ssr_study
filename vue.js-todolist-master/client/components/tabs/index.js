/**
 *  * Created by dxz on 2020/8/19-17:12.
 * explain：
 */
import Tabs from './tabs.jsx'
import Tab from './tab.jsx'

export default (Vue) => {
  Vue.component(Tabs.name, Tabs)
  Vue.component(Tab.name, Tab)
}
