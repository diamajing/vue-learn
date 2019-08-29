# hello-vue
```
yarn install  yarn run serve
```
# Vue组件化实战
### Vue基础扫盲
1. Vue单文件组件
2. 条件渲染，循环渲染
3. 样式和class渲染
4. 组件
5. 事件绑定
6. 计算属性
7. 监听器

![todo](assets/todo.png)
**### 组件**

还是那句话，组件的官方文档这里就不介绍了 ， <https://cn.vuejs.org/v2/guide/components.html> 大家自行去看，下面我们先说组件设计中第一个老生常谈的问题，Vue的组件化通信方式

**#### 1.父传子**
Props 文档基本操作
```
<template>
  <div id="app">
​    <Child1 :title="title1"></Child1>
  </div>
</template>
<script>
import Child1 from '@/components/Child1'
export default {
  name: "app",
  data(){
​    return {
​      title1:'我是你爸爸'
​    }
  },
  components:{Child1}
</script>

```
```
// Child1
<template>
    <div>
​        <h2>Child2</h2>
        <div>{{title}}</div>
​    </div>
</template>
<script>
export default {
​    props:['title']
}
</script>
```

####  2. 子传父
```
<template>
  <div id="app">
​    <h2>Parent</h2>
​    <h3>{{msg}}</h3>
​    <Child1 :title="title1" @getmsg="getmsg"></Child1>
  </div>
</template>
<script>
import Child1 from '@/components/Child1'
export default {
  name: "app",
  data(){
​    return {
​      msg:'',
​      title1:'我是你爸爸'
​    }
  },
  methods:{
​    getmsg(msg){
​      console.log(msg)
​      this.msg = msg
​    }
  },
  components:{Child1}
}
</script>
<style>
div{
  border:1px red solid;
  padding:20px;
}
</style>
```
```
// Child
<template>
    <div>
​        <h2>Child2</h2>
        <p>{{title}}</p>
​        <button @click="toParent">传递到父元素</button>
​    </div>
</template>
<script>
export default {
​    props:['title'],
​    methods:{
​        toParent(){
​            this.$emit('getmsg','爸爸,我知道错了')
​        }
​    }
}
</script>
```
Vue更推荐单向数据流，所以子组件像修改传递的数据，需要通知父组件来修改，使用$emit触发父元素传递的事件
####  3. 兄弟组件

兄弟组件不能直接通信，只需要父元素搭个桥即可，大家自己体验即可
#### 4. 祖先后代  provide & inject
####  5. dispatch
####  6. boardcast
#####   全局挂载dispatch和boardcast
####  7. 没啥关系的组件：event-bus
####  8. $attr和$listener
####  9. vuex
