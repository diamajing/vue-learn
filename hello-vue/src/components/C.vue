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