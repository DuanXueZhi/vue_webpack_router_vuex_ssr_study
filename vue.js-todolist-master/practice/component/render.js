/**
 *  * Created by dxz on 2020/8/13-17:52.
 * explain：
 */
import Vue from 'vue'

const component = {
  name: 'comp',
  props: ['props1'],
  // template: `
  //   <div :style="style">
  //     <slot :value="value" :test="aaa"></slot><!-- 自定义插槽 -->
  //   </div>
  // `,
  render (createElement) { // template最终被编译为render
    return createElement(
      'div',
      {
        style: this.style
        // on: {
        //   click: () => {
        //     this.$emit('click1')
        //   }
        // }
      },
      [
        this.$slots.default, // this.$slots.header
        this.props1
      ]
    )
  },
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
  data () {
    return {
      value: 123
    }
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.span) // this.$refs.comp.value 不推荐修改
  },
  methods: {
    handleClick () {
      console.log('handleClick')
    }
  },
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span slot-scope="props" ref="span">{{ props.value }}-{{ props.test }}-{{ value }}</span>
  //     </comp-one>
  //     <input type="text" v-model="value">
  //   </div>
  // `,
  render () {
    return this.$createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          props1: 12
        },
        on: {
          click1: this.handleClick
        },
        nativeOn: { // 默认绑定到组件根节点
          click: this.handleClick
        }
      },
      [ // 子节点用数组，字符串不需要
        this.$createElement(
          'span',
          {
            ref: 'span',
            // slot: 'header' // 调用this.$slots.header【没声明则使用default】
            // domProps: {
            //   innerHTML: '<span>345</span>' // 导致this.value无效【替换内容了】
            // },
            attrs: {
              id: 'test-id'
            }
          },
          this.value
        )
      ]
    )
  }
  // render (createElement) { // 相同
  //   return createElement()
  // }
})
