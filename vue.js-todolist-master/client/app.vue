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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

console.log(Header.__docs)

export default {
  components: {
    Header,
    Footer
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
      count: (state) => state.count
    }),
    ...mapGetters(['fullName'])
  },
  mounted () {
    console.log(this.$store)
    this.$store.dispatch('updateCountAsync', { num: 5, time: 1000 })
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
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
