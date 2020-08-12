/**
 *  * Created by dxz on 2020/8/12-10:25.
 * explain：
 */
import Vue from 'vue'
const app = new Vue({
  data: {
    text: 'text'
  },
  template: '<div>{{text}}</div>'
})
app.$mount('#root')
app.text = 'text1'
