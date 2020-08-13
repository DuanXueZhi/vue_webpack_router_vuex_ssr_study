/**
 *  * Created by dxz on 2020/8/13-10:55.
 * explain：
 */
import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>', // vue默认转义防止攻击
    aaa: 'name',
    styles: {
      color: 'red',
      appearance: 'none' // 消除浏览器默认样式【vue自动添加前缀】
    },
    styles1: {
      color: 'black'
    }
  },
  computed: {},
  methods: {
    handleClick () {
      alert('clicked')
    },
    getJoinedArr (arr) {
      return arr.join(',')
    }
  },
  template: `
    <div v-bind:id="aaa" v-on:click="handleClick">
      {{ isActive ? 'active' : 'not active' }}
      {{ arr.join(',') }}
      {{ getJoinedArr(arr) }}
      {{ html }}
      <p v-html="html"></p>
      <div :class="{ active: !isActive }">123</div>
      <div :class="[ isActive ? 'active' : '' ]">123</div>
      <div :class="[{'active': isActive}]">123</div>
      <div :style="styles">123</div>
      <div :style="[ styles, styles1 ]">123</div>
    </div>`
})
