/**
 *  * Created by dxz on 2020/8/13-13:58.
 * explain：
 */
import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    text: 0,
    active: false,
    arr: [1, 2, 3],
    picked: ''
  },
  template: `
    <div>
      <p>{{ text }}</p>
      <p>v-for遍历数组参数(item, index)，遍历对象参数(val, key, index)</p>
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
      <input type="text" v-model.number="text">
      <input type="text" v-model.trim="text">
      <input type="text" v-model.lazy="text"><!-- 改变才改变值（失焦） -->
      <p>v-once: 绑定一次（该节点中的内容仅展示）</p>
      <p>v-cloak: 数据渲染前样式填充</p>
    </div>`
})
