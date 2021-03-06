/**
 *  * Created by dxz on 2020/8/19-9:28.
 * explain：扩展组件的js
 */
import Notification from './notification' // 与原组件使用同一dom

export default {
  extends: Notification,
  computed: {
    style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  data() {
    return {
      verticalOffset: 0,
      autoClose: 5000,
      height: 0,
      visible: false // 扩展组件要使用，必须声明，否则无法生成响应式
    }
  },
  mounted() {
    this.createTimer()
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    createTimer() {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },

    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },

    afterEnter() { // 覆盖原afterEnter
      this.height = this.$el.offsetHeight
    }
  }
}
