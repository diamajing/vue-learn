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
