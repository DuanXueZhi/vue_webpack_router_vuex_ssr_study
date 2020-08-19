/**
 *  * Created by dxz on 2020/8/19-9:28.
 * explain：
 */
import Notification from './notification'

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
      verticalOffset: 0
    }
  }
}
