<template>
  <div id="app">
   <div v-for="msg in prod" :key="msg.id">我是：{{msg.text}}</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data(){
    return {
				prod: [],
			};
  },
  components: {
    HelloWorld
  },
  async mounted () {
    let ret = await this.$axios.get('/api/goods')
    console.log(ret.data,'ddd');
    //用easymock
    let mock = await this.$axios.get('/easymock/')
    console.log(mock.data)

    let prod = await this.$axios.get('http://localhost:8080/api/goods')
    this.prod = prod.data.list;
    console.log( this.prod);
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
