<template>
  <div>login</div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) { // 【可以获取数据】此时没有this
    console.log('login beforeRouteEnter', this)
    next(vm => { // next回调，进入组件后的回调
      console.log('login next', vm.id)
    })
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      text: ''
    }
  },
  created() { // 不同参数切换不会执行，更新参数则使用beforeRouteUpdate
    console.log('login created', this.id)
  },
  mounted() { // 不同参数切换不会执行，更新参数则使用beforeRouteUpdate
    console.log('login mounted', this.id)
  }
}
</script>
