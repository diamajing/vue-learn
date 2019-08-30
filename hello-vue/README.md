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

![todo](./src/assets/todo.png)
**### 组件**

还是那句话，组件的官方文档这里就不介绍了 ， <https://cn.vuejs.org/v2/guide/components.html> 大家自行去看，下面我们先说组件设计中第一个老生常谈的问题，Vue的组件化通信方式

#### 1.父传子
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
props 一层层传递，爷爷给孙子还好，如果嵌套了五六层还这么写，感觉自己就是一个沙雕，所以这里介绍一个比较冷门的API，【provice/inject](https://cn.vuejs.org/v2/api/#provide-inject),专门用来跨层提供数据
在很多开源的库都在使用这个歌API来做跨层级数据共享，比如element-ui(tabs)(https://github.com/ElemeFE/element/blob/efcfbdde0f06e3e1816f1a8cd009a4e413e6e290/packages/tabs/src/tabs.vue#L26) 和 [select](https://github.com/ElemeFE/element/blob/f55fbdb051f95d52e92f7a66aee9a58e41025771/packages/select/src/select.vue#L161
```
//祖先元素 provide 
<template>
  <div id="app">
    <h2>Parent</h2>
    <h3>{{msg}}</h3>
    <child1 :title="title1" @getmsg="getmsg"></child1>
  </div>
</template>

<script>
import Child1 from '@/components/Child1'
export default {
  name: "app",
  provide:{
    woniu:'我是你祖先'
  },
  data(){
    return {
      msg:'',
      title1:'我是你爸爸'
    }
  },
  methods:{
    getmsg(msg){
      this.msg = msg
    }
  },
  components:{Child1},
  mounted(){
  }

}

</script>
<style>

div{
  border:3px blue solid;
  padding:10px;
  display: inline-block;
  vertical-align: top;
  /* width:50%; */
}
h1,h2{
  font-size:18px;
  margin:5px 0;
  
}
h3{
  color:red;
  font-size:14px;
}
</style>


```

```
//inject 子孙元素
<template>
    
    <div>
        <h2>Grandson1</h2>
        <p>
            祖先元素提供的数据 : {{woniu}}
        </p>
        <h3>{{msg}}</h3>
    </div>
</template>
<script>
export default {
    name:'GrandChild1',
    data(){
        return {
            msg:""
        }
    },
    inject:['woniu'],
    mounted(){
    }
}
</script>

```
这里只需要祖先元素
```
 provide:{
    woniu:'我是你祖先'
  },
```
子孙元素
```
 inject:['woniu'],
```
这里注意：数据不是相应的，子孙元素想要改变祖先元素的数据，需要hack一下，，Vue1中有dispatch和boardcast两个方法，但是vue2中被干掉了，我们自己可以模拟一下
####  5. dispatch
```
Vue.prototype.$dispatch = function(eventName,data){
  let parent = this.$parent;
  while (parent) {
    if (parent) {
      // 父元素用$emit触发
      parent.$emit(eventName, data);
      // 递归查找父元素
      parent = parent.$parent;
    } else {
      break;
    }
  }
}
```
####  6. boardcast
```
Vue.prototype.$boardcast = function (eventName, data) {
  boardcast.call(this, eventName, data)
}
function boardcast(eventName, data) {
  this.$children.forEach(child => {
    // 子元素触发$emit
    child.$emit(eventName, data)
    if (child.$children.length) {
      // 递归调用，通过call修改this指向 child
      boardcast.call(child, eventName, data)
    }
  });
}
```
#####   全局挂载dispatch和boardcast,想用的时候，需要自己组件内部定理dispatch和boardcast太烦了，我们挂载到Vue的原型链上，岂不是很high,找到main.js
####  7. 没啥关系的组件：event-bus
如果俩组件没啥关系呢，我们只能使用订阅发布模式来做，并且挂载到Vue.protytype之上，我们来试试，我们称呼这种机制为总线机制，也就是喜闻乐见的 event-bus
```
class Bus {
  constructor() {
    // {
    //   eventName1:[fn1,fn2],
    //   eventName2:[fn3,fn4],
    // }
    this.callbacks = {}
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      // 存在 遍历所有callback
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
}



Vue.prototype.$bus = new Bus()
```

使用

```js
// 使用
eventBus(){
    this.$bus.$emit('event-bus','测试eventBus')
}

// 监听
this.$bus.$on("event-bus",msg=>{
    this.msg = '接收event-bus消息:'+ msg
})
```
同时呢，这个vue也是发布订阅模式的，所以我们这里可以偷个懒，新建一个空的vue实例就可以了
```
Vue.prototype.$bus = new Vue()
```
####  8. $attr和$listener
$attr 和 $listener 是vue 2.4 之后新添加的属性  
使用场景：ABC(父子孙)  AB(父传子)
这时候A和 C 希望能通话 这时候就能派上用场了   
简单介绍一下：$attr 和 $listener  
        $attr : v-bind属性$attr,继承所有的父组件属性（除了prop传递的属性、class 和 style ;  
              注：这里有一个inheritAttrs属性：默认值true,继承所有的父组件属性（除props的特定绑定）作为普通的HTML特性应用在子组件的根元素上，如果你不希望组件的根元素继承特性设置inheritAttrs: false,但是class属性会继承.  
        listeners : 它是一个对象，里面包含了作用在这个组件上所有监听器，可以配合v-on ="$listeners" 将所有的事件监听指向这个组件的某个特定的子元素
2.而v-bind属性$listeners，则保证C组件能直接调用A组件的方法。
代码如下
```
// A 组件
<template>
    <div>
        <h1>我是爷爷</h1>
        我儿子对我说:{{msgBClick}}<br/>
        我孙子对我说:{{msgCClick}}
        <B :child="msgB" :grandchild="msgC"  @clickc="clickc"  @getmsg="getmsg"></B>
      
    </div>
</template>
<script>
import B from '@/components/B.vue'

export default {
  name: 'A',
  data(){
      return {
          msgB:"我是来自A ，要传给B",
          msgC:"我是来自A，要传给C",
          msgBClick:'',
          msgCClick:'',
      }
  },
  methods:{
      getmsg(msg){
          this.msgBClick = msg;
      },
      clickc(data){
        this.msgCClick = data;
      }
  },
  components: {
    B 
  }
}
</script>
<style scoped>
 div{
     border: 1px solid red;
     padding: 30px;
 }
</style>

```

```
// B 组件
<template>
    <div>
        <h1>我是爸爸</h1>
        我爸爸对我说：{{child}}<br/>
        <button @click="toParent()">与爸爸通话</button>
        <C v-bind="$attrs" v-on="$listeners"></C> 
    </div>
</template>
<script>
import C from '@/components/C.vue'

export default {
  name: 'B',
  props:['child'],
  inheritAttrs: false,
  components: {
    C 
  },
 methods: {
    toParent() {
      this.$emit("getmsg", "爸爸,我知道错了");
    }
  },
}
</script>
<style scoped>
 div{
     border: 1px solid blue;
     padding: 30px;
 }
</style>
```
```
// C 组件
<template>
    <div>
        <h1>我是孙子</h1>
        我爷爷对我说：{{grandchild}}
        <button @click="clickC()">跟爷爷通话</button>
    </div>
</template>
<script>
export default {
    name: 'C',
    props:['grandchild'],
    methods:{
        clickC(){
          this.$emit('clickc','爷爷!我来救你(来自C)')
        }
    }

}
</script>
<style scoped>
div{
    border: 1px chocolate solid;
    padding: 30px;
}
</style>
```

这里可以看到
####  9. vuex
当组件中没有关联关系时,需要实现数据的传递共享,可以使用Vuex  

