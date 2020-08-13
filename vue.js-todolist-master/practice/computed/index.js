/**
 *  * Created by dxz on 2020/8/13-11:40.
 * explain：
 */
import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    firstName: 'a',
    lastName: 'b',
    obj: {
      a: null
    }
  },
  computed: { // 对象
    name () {
      return `${this.firstName} ${this.lastName}`
    }
    // name: {
    //   get () {
    //     console.log('new name')
    //     return `${this.firstName} ${this.lastName}`
    //   },
    //   set (name) {
    //     const names = name.split(' ')
    //     this.firstName = names[0]
    //     this.lastName = names[1]
    //   }
    // }
  },
  watch: { // 尽量不修改监听属性
    // firstName (newName, oldName) {
    //   this.fullName = newName + this.lastName
    // },
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + this.lastName
      },
      immediate: true, // 先运行一下函数
      deep: true
    },
    'obj.a' () {
      console.log('a change')
    }
  },
  methods: {
    getName () {
      return `${this.firstName} ${this.lastName}`
    },
    templateTest () {
      return '<span>123</span>'
    }
  },
  template: `
    <div>
      <p>{{ firstName + ' ' + lastName }}</p>
      <p>{{ name }}</p>
      <p>{{ getName() }}</p>
      <p>{{ templateTest() }}</p>
      <input type="text" v-model="obj.a">
    </div>`
})
