import './style.styl'
import TabContainer from './tab-container.jsx'
export default {
  name: 'Tabs',
  // provide() { // 其下子组件都可以收到
  //   return {
  //     value: this.value // 此时的value并不是relative
  //   }
  // },
  components: {
    TabContainer
  },
  props: {
    value: { // 控制显示哪个tab
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      fileExplain: '文件说明', // 文件说明
      panes: []
    }
  },
  methods: {
    onChange(index) {
      this.$emit('change', index)
    }
  },
  render(h) {
    return (
      <div class='tabs'>
        <ul class='tabs-header'>
          {this.$slots.default} {/* 调用时slot中的内容 */}
        </ul>
        <tab-container panes={this.panes}></tab-container>
      </div>
    )
  }
}
