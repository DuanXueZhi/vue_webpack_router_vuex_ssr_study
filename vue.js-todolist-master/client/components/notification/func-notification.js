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
      visible: false
    }
  },
  mounted() {
    this.createTimer()
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    createTimer() {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },

    afterEnter() { // 覆盖原afterEnter
      this.height = this.$el.offsetHeight
    }
  }
}
