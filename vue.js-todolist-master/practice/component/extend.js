/**
 *  * Created by dxz on 2020/8/13-15:10.
 * explain：对公用组件设置默认值或扩展
 */
import Vue from 'vue'

const component = {
  props: { // 其变量不推荐修改
    active: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return { // 不适用return，则复用组件数据容易冲突
      text: 123
    }
  },
  mounted () {
    console.log('mounted 1')
  },
  template: `
    <div>
      <p>is Component {{ text }}</p>
      <p>{{ active }}</p>
    </div>`
}

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  // parent: parent, // 在非new Vue中不能指定parent
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log('mounted 3', this.$parent.name, this.$parent.$options.name)
    this.$parent.text = 123 // 子组件可以修改父组件中的data【不推荐】
  }
}

// const CompVue = Vue.extend(component)
//
// new CompVue({
//   el: '#root',
//   propsData: {
//     active: false
//   },
//   data: { // 与data合并
//     test: 1
//   },
//   mounted () {
//     console.log('mounted 2')
//   }
// })

new Vue({
  el: '#root',
  name: 'Root',
  parent: parent,
  components: {
    Comp: component2
  },
  data: {
    text: 222
  },
  mounted () {
    console.log('mounted 4', this.$parent.$options.name)
  },
  template: `
    <div>
      <p>aaa{{ text }}</p>
      <comp :active="false"></comp>
    </div>
  `
})
