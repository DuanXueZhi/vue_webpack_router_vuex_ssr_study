<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs
        :value="tabValue"
        @change="handleChangeTab"
      >
        <tab
          label="tab1"
          index="1"
        />
        <tab index="2">
          <span
            slot="label"
            style="color: red;"
          >tab2</span>
        </tab>
        <tab
          label="tab3"
          index="3"
        />
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来做什么"
      @keyup.enter="addTodo"
    >
    <Item
      v-for="todo in filterTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
    />
    <helper
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAll="clearAllCompletedTodo"
    />
    <router-view />
  </section>
</template>

<script>
import Item from './item.vue'
import Helper from './tabs.vue'
// import { constants } from 'crypto'

let id = 0

export default {
  beforeRouteEnter(to, from, next) { // 【获取数据】此时没有this
    console.log('todo beforeRouteEnter', this)
    next(vm => { // next回调，进入组件后的回调
      console.log(vm)
    })
  },
  beforeRouteUpdate(to, from, next) { // 路由参数更新调用【可以替换组件中watch】
    // 获取改变的参数信息
    console.log('todo beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('todo beforeRouteLeave')
    if (global.confirm('are you sure?')) {
      next()
    }
  },
  components: {
    Item,
    Helper
  },
  data() {
    return {
      todos: [],
      filter: 'all',
      tabValue: '1'
    }
  },
  computed: {
    filterTodos() {
      if (this.filter === 'all') {
        return this.todos
      }
      const filterCompleted = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === filterCompleted)
    }
  },
  mounted() {0
    console.log('todo mounted')
    // setTimeout(() => {
    //   this.tabValue = '2'
    // }, 2000)
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value,
        completed: false
      })

      e.target.value = ''
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => id === todo.id), 1)
    },
    toggleFilter(state) {
      console.log(state)
      this.filter = state
    },
    clearAllCompletedTodo() {
      this.todos = this.todos.filter(todo => todo.completed === false)
    },
    handleChangeTab(value) {
      this.tabValue = value
    }
  }
}
</script>

<style lang="stylus" scoped>
  .real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666

  .add-input
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border none
    outline none
    color inherit
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
  .tab-container
    backage-color: #fff;
    padding: 0 15px;
</style>
