<template>
  <form
    class="login-form"
    autocomplete="off"
    @submit="doSubmit"
  >
    <h1>
      <span>login</span>
      <span
        v-show="errorMsg"
        class="error-msg"
      >{{ errorMsg }}</span>
    </h1>
    <input
      v-model="username"
      type="text"
      class="login-input"
      placeholder="user name"
    >
    <input
      v-model="password"
      type="password"
      class="login-input"
      placeholder="password"
    >
    <button
      type="submit"
      class="login-btn"
    >
      登录
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
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
      text: '',
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  created() { // 不同参数切换不会执行，更新参数则使用beforeRouteUpdate
    console.log('login created', this.id)
  },
  mounted() { // 不同参数切换不会执行，更新参数则使用beforeRouteUpdate
    console.log('login mounted', this.id)
  },
  methods: {
    ...mapActions(['login']),
    doSubmit(e) {
      e.preventDefault() // 移除默认提交、跳转页面
      if (this.validate()) {
        // 调用接口
        this.login({
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.replace('/app') // replace跳转浏览器不可回退
        })
      }
    },
    validate() {
      if (!this.username.trim()) {
        this.errorMsg = '姓名不能为空'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空'
        return false
      }
      this.errorMsg = ''
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login-form
    display flex
    flex-direction column
    align-items flex-start
    width 350px
    margin 0 auto
    padding 20px
    background-color #fff
    h1
      font-weight 100
      color #3d3d3d
  .login-input
    appearance none
    padding 0 10px
    line-height 30px
    margin-bottom 20px
    border 1px solid #aaa
    width 100%
    border-radius 0
    box-shadow 0 0 0
  .login-btn
    appearance none
    width 100%
    line-height 30px
    text-align center
    background-color #0d60c7
    color #eaeaea
    cursor pointer
    border-color #0d60c7
    transition all .3s
    &:hover
      color #fff
      background-color darken(#0d60c7, 10)
  .error-msg
    font-size 12px
    color red

  @media screen and (max-width: 600px) {
    .login-form {
      width 90%
    }
    .login-input{
      line-height 40px
    }
  }
</style>
