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