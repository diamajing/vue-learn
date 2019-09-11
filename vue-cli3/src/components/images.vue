<template>
    <div>
         <!-- {{dataList.length}} -->
        <img src="../assets/icon-airline160808.png" style="float: left;"/>
        <table style="display:table-cell">
            <tr v-for="itemx in dataList" :key="itemx[0]+'index'" style="height:30px;" >
                <td v-for="itemy in itemx" :key="itemy" style="border-bottom:1px solid #ccc;border-left:1px solid #ccc">
                    {{itemy}}
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import DATALIST from '../test.js'

export default {
    data(){
        return {
            dataList:[],
        }
    },
    methods:{
        createArray(x,y){
        for(let i=0;i<=23;i++) { 
            this.dataList[i]=new Array(); //将每一个子元素又定义为数组 
                for(let n=0;n<=6;n++) { 
                  this.dataList[i][n]=this.dataList[i][n]?this.dataList[i][n]:''; //此时items[i][n]可以看作是一个二级数组 
                } 
            }
        },
    },
   
     mounted(){
        this.createArray();
        // let step = 32;
        this.$nextTick(()=>{
             let dataList = DATALIST.dataList;
                let xmax =0;
                let ymax = 0;
                for(let i = 0;i<dataList.length;i++){
                    let x = Math.abs(dataList[i][1])/32;
                    let y =Math.abs(dataList[i][2])/32;
                    this.dataList[y][x] =  this.dataList[y][x] + dataList[i][0] + '/';
                }
                console.log(this.dataList);
        })
       

        
    }
}
</script>