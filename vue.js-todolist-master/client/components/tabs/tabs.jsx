import './style.styl'
export default {
  name: 'Tabs',
  props: {
    value: { // 控制显示哪个tab
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      fileExplain: '文件说明' // 文件说明
    }
  },
  render(h) {
    return (
      <div class='tabs'>
        <ul class='tabs-header'>
          {this.$slots.default} {/* 调用时slot中的内容 */}
        </ul>
      </div>
    )
  }
}
