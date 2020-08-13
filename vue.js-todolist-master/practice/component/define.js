/**
 *  * Created by dxz on 2020/8/13-14:31.
 * explain：
 */
import Vue from 'vue'

const component = {
  props: { // 其变量不推荐修改
    active: Boolean
  },
  template: `
    <div>
      <p>is Component {{ text }}</p>
      <p>{{ active }}</p>
    </div>`,
  data () {
    return { // 不适用return，则复用组件数据容易冲突
      text: 123
    }
  }
}

// Vue.component('CompOne', component) // 组件相当于一个类，最好开头大写

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  template: `
    <div>
      <p>123</p>
      <comp-one :active="true"></comp-one>
      <comp-one :active="false"></comp-one>
    </div>
  `
})
