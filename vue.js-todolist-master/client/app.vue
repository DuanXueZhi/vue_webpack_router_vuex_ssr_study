<template>
  <div id="app">
    <Header />
    <router-link :to="{ name: 'app' }">
      app
    </router-link>
    <router-link to="/login/abc?b=123">
      login
    </router-link>
    <router-link to="/login/def?b=123">
      login
    </router-link>
    <router-link to="/login/exact">
      login exact
    </router-link>
    <!--    <Todo></Todo>-->
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
    <!--    <router-view name="a" />-->
    <div>VueX</div>
    <p>{{ count }}</p>
    <p>{{ fullName }}</p>
    <p>{{ textA }}</p>
    <p>{{ textPlus }}</p>
    <!--<p>{{ textC }}</p>-->
    <notification content="test notify" />
    <button @click="notify">
      notify
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

console.log(Header.__docs)

export default {
  metaInfo: {
    title: 'app custom title'
  },
  components: {
    Header,
    Footer
  },
  data() {
    return {
      interval: null
    }
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
    // 1.
    // ...mapState(['count']),
    // 2.
    // ...mapState({
    //   count: 'count'
    // }),
    // 3.
    ...mapState({
      count: (state) => state.count,
      textA: (state) => state.a.text
      // textC: (state) => state.c.text
    }),
    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'a/textPlus'
    })
    // textA () {
    //   return this.$store.state.a.text // a模块
    // }
  },
  mounted() {
    console.log(this.$store)
    this.$store.dispatch('updateCountAsync', { num: 5, time: 1000 })
    // this.updateCountAsync({ num: 5, time: 1000 })
    // let i = 1
    // this.interval = setInterval(() => {
    //   // this.$store.commit('updateCount', i++)
    //   this.updateCount(i++)
    // }, 1000)
    // this.updateText('abc') // [vuex] unknown mutation type: updateText
    this['a/updateText']('abc1')
    this['a/add']()
    // this['b/testAction']() // b模块没有namespaced不需要写模块名
    this.testAction()
    this.$notify({
      content: 'test notify',
      btn: 'close'
    })
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    ...mapActions(['updateCountAsync', 'a/add', 'testAction']),
    ...mapMutations(['updateCount', 'a/updateText']), // [vuex] unknown mutation type: updateText
    notify() {
      const now = new Date()
      this.$notify({
        content: `test notify${now}`,
        btn: 'close'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity 0.2
        z-index -1
</style>
