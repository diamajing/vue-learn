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