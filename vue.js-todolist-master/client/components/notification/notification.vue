<!--
  Created by dxz on 2020/8/18-17:06.
  explain:
-->
<template>
  <transition
    name="fade"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
  >
    <div
      v-show="visible"
      id="notification"
      :style="style"
    >
      <p>{{ fileExplain }}</p>
      <span class="content">{{ content }}</span>
      <a
        class="btn"
        @click="handleClose"
      >{{ btn }}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  components: {},
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  data() {
    return {
      fileExplain: '文件说明', // 文件说明
      visible: true
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    this.mainIndex()
  },
  beforeDestroy() {
  },
  destroy() {
  },
  methods: {
    /*
  * -------------------------------------- 入口函数 --------------------------------------
  * */
    mainIndex() {
    },

    /*
  * --------------------------------------   公用   --------------------------------------
  * */
    /* 获取or请求函数 */
    /* 功能or共用函数 */
    requestCallBackArrange(local, res) { // local：位置，res：数据
      // 出错 alert(local + res.错误信息)
    },

    /*
  * -------------------------------------- 子组件相关函数 --------------------------------------
  * */
    // 接收检索参数

    /*
  * -------------------------------------- 页面操作 --------------------------------------
  * */
    handleClose(e) {
      e.preventDefault()
      this.$emit('close')
    },

    afterLeave() {
      this.$emit('closed')
    },

    afterEnter() {}

    /*
  * -------------------------------------- 图表数据处理+渲染 arrangeData*、makeCharts* --------------------------------------
  * */
    /* 数据处理 arrangeData* */
    /* 渲染 makeCharts* */
  }
}
</script>

<style lang="stylus" scoped>
  #notification
    display: inline-flex
    background-color #303030
    color rgba(255, 255, 255, 1)
    align-items center
    padding 20px
    min-width 280px
    box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
    flex-wrap wrap
    transition all .3s
  .content
    padding 0
  .btn
    color #ff4081
    padding-left 24px
    margin-left auto
    cursor pointer
</style>
