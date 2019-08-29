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

