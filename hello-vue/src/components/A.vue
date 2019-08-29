<template>
    <div>
        <h1>我是爷爷</h1>
        <B></B>
    </div>
</template>
<script>
import B from '@/components/B.vue'

export default {
  name: 'A',
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