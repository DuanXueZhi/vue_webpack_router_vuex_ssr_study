/**
 *  * Created by dxz on 2020/8/13-15:45.
 * explain：
 */
import Vue from 'vue'

const component = {
  // model: {
  //   prop: 'valueOne', // 保留value值，返回valueOne值
  //   event: 'input1'
  // },
  props: [
    'value',
    'valueOne'
  ],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value"><!-- :value="valueOne", 保留value值，返回valueOne值 -->
    </div>`,
  methods: {
    handleInput (e) {
      console.log(e)
      this.$emit('input1', e.target.value) // 通过事件暴露值即可
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data () {
    return {
      value: '123'
    }
  },
  template: `
    <div>
      <comp-one :value="value" @input1="value = arguments[0]" />
    </div>
  `
})
