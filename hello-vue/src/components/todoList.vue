<template>
  <div id="app">
    <h1>{{title}}</h1>
    <div>
        <input type="text" v-model="value">
        <button @click="add()">添加</button>
        <button @click="clear()">清空</button>
    </div>
    <div>
       <ul>
        <li v-for="todo in todos" :key="todo.title" :class="{done:todo.done}">
            <input type="checkbox" v-model="todo.done">
            {{todo.title}}
        </li>
    </ul>
    </div>
    <div>{{active}}/{{all}}</div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "我的todo-list",
      value: "",
      todos: []
    };
  },
  mounted() {
    const todos = localStorage.getItem("todos");
    if (todos) {
      this.todos = JSON.parse(todos);
    } else {
      this.todos = [
        { title: "读书", done: false },
        { title: "编程", done: false },
        { title: "思考", done: false }
      ];
    }
  },
  computed: {
      active() {
          return this.todos.filter(v=>!v.done).length;
      },
      all() {
          return this.todos.length;
      }
  },
  watch: {
    todos: {
      deep: true,
      handler(todos){
          window.localStorage.setItem('todos',JSON.stringify(todos));
      }

    }
  },
  methods: {
    clear() {
        this.todos = this.todos.filter( v => !v.done);
    },
    add() {
        if(this.value){
            this.todos.push({
                title:this.value,
                done:false
            })
            this.value = '';
        }
    }
  }
};
</script>
<style>
li.done {
  color: red;
  text-decoration: line-through;
}
</style>
