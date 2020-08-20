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
  // inject: ['value'],
  computed: {
    active() {
      return this.$parent.value === this.index
      // return this.value === this.index
    }
  },
  mounted() {
    this.$parent.panes.push(this)
  },
  methods: {
    handleClick() {
      this.$parent.onChange(this.index)
    }
  },
  render(h) {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active // 选中状态
    }
    return (
      <li class={classNames} on-click={this.handleClick}>
        {tab}
      </li>
    )
  }
}
