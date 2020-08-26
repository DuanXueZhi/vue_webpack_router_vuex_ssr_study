<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs
        :value="tabValue"
        @change="handleChangeTab"
      >
        <tab
          v-for="tab in stats"
          :key="tab"
          :label="tab"
          :index="tab"
        >
          <span>tab content 1{{ inputContent }}</span>
        </tab>
      </tabs>
    </div>
    <input
      v-model="inputContent"
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来做什么"
      @keyup.enter="handleAdd"
    >
    <Item
      v-for="todo in filterTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
      @toggle="toggleTodoState(todo)"
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
import { mapState, mapActions } from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'
// import { constants } from 'crypto'

// let id = 0

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
      // todos: [],
      filter: 'all',
      tabValue: 'all',
      inputContent: '123',
      stats: ['all', 'active', 'completed']
    }
  },
  computed: {
    ...mapState(['todos']),
    filterTodos() {
      if (this.filter === 'all') {
        return this.todos
      }
      const filterCompleted = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === filterCompleted)
    }
  },
  mounted() {
    console.log('todo mounted')
    // setTimeout(() => {
    //   this.tabValue = '2'
    // }, 2000)
    this.fetchTodos()
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'updateTodo',
      'deleteTodo',
      'deleteAllCompleted'
    ]),
    handleAdd(e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '内容不能为空'
        })
        return
      }
      // this.todos.unshift({
      //   id: id++,
      //   content: e.target.value,
      //   completed: false
      // })
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // deleteTodo(id) {
    //   this.todos.splice(this.todos.findIndex(todo => id === todo.id), 1)
    // },
    toggleTodoState(todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    toggleFilter(state) {
      console.log(state)
      this.filter = state
    },
    clearAllCompletedTodo() {
      // this.todos = this.todos.filter(todo => todo.completed === false)
      this.deleteAllCompleted()
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
