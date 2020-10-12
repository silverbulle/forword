<template>  
<div>  
    <el-button @click="Download" style="margin-left:5px">
      导出到本地
    </el-button>
    <el-button @click="Back2detail" style="margin-right:5px">
      返回
    </el-button>
    <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>  
    
</div>  
</template>  
<script>  
import EditorBar from '../../components/wangEnduit' 
export default {  
    components: { EditorBar },  
    data() {  
      return {  
            test:'',  
            isClear: false,  
            detaillist:[],
            detail:""  
        }  
      },    
    methods: {  
        change(val) {  
            console.log(val)  
        },  
    },
    mounted(){
      console.log(this.$route.params.conflictmsg)
      this.detaillist = this.$route.params.conflictmsg
      for(let i=0;i<this.detaillist.length;i++){
        this.detail += this.detaillist[i] +"<br><br>"
      }
    },
    beforeRouteEnter(to,from,next){
      if(from.name == "Detail"){
        to.meta.keepAlive = false;
      }else{
        to.meta.keepAlive = true;
      }
      next();
    }  
}  
</script> 