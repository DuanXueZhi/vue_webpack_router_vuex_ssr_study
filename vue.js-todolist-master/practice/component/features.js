/**
 *  * Created by dxz on 2020/8/13-17:06.
 * explain：
 */
import Vue from 'vue'

const ChildComponent = {
  template: '<div>ChildComponent-{{ value }}-{{ data.value }}</div>',
  inject: ['yeye', 'value', 'data'], // 并没有reactive方法（仅展示）, data可以单独指定
  mounted () {
    console.log(this.$parent.$options.name)
    console.log(this.yeye, this.value)
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  // template: `
  //   <div :style="style">
  //     <!--      <slot></slot>&lt;!&ndash; slot内置组件 &ndash;&gt;-->
  //     <div class="header">
  //       <slot name="header"></slot><!-- 具名插槽 -->
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot :value="value" :test="aaa"></slot><!-- 自定义插槽 -->
      <child-component></child-component>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #c33'
      },
      value: '456',
      aaa: 'components slot'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  provide () { // 其下的所有子组件都可以使用其中的值【跨层级使用变量】
    const data = {}

    Object.defineProperty(data, 'value', { // 指定value为reactive【不推荐，vue官方升级可能会放弃】
      get: () => {
        return this.value
      },
      enumerable: true // 可被读取
    })

    return {
      yeye: this,
      value: this.value,
      data
    }
  },
  data () {
    return {
      value: 123
    }
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.span) // this.$refs.comp.value 不推荐修改
  },
  template: `
    <div>
      <comp-one ref="comp">
<!--        <span slot="header">this is content</span>-->
<!--        <span slot="body">this is content body</span>-->
        <span slot-scope="props" ref="span">{{ props.value }}-{{ props.test }}-{{ value }}</span>
      </comp-one>
      <input type="text" v-model="value">
    </div>
  `
})
