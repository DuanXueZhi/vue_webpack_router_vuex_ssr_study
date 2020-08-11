<template>
  <header :class="$style.mainHeader">
    <h1>Todo</h1>
  </header>
</template>

<script>
  export default {
    // computed: { // 相当于在计算属性中增加$style
    //   $style() {
    //     return {
    //       minHeader: ''
    //     }
    //   }
    // }
  }
</script>

<style lang="stylus" module>
  // module：使用cssModules的方式编译，类似指定loader，需要用$style对象获取
  .main-header
    text-align center

    h1
      font-size 100px
      color rgba(175, 47, 47, 0.4)
      font-weight 400
      margin 20px
</style>

<docs>
  #123 = 456
</docs>
