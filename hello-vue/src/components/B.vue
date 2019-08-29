<template>
    <div>
        <h1>我是爸爸</h1>
        <C></C>
    </div>
</template>
<script>
import C from '@/components/C.vue'

export default {
  name: 'B',
  components: {
    C 
  }
}
</script>
<style scoped>
 div{
     border: 1px solid blue;
     padding: 30px;
 }
</style>