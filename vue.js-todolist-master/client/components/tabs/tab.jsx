import './style.styl'
export default {
  name: 'Tab',
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  computed: {
    active() {
      return false
    }
  },
  render(h) {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active // 选中状态
    }
    return (
      <li class={classNames}>
        {tab}
      </li>
    )
  }
}
