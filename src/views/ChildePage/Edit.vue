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
      var ConInfo = ""
      if(localStorage.getItem("conflictmsg"))
      {
        ConInfo = localStorage.getItem("conflictmsg")
        localStorage.clear()
      }
      ConInfo = ConInfo.replace(/存在冲突,依据文件/g,'存在冲突<br><br>依据文件')
      console.log(ConInfo)
      console.log(typeof(ConInfo))
      this.detail = ConInfo
      // console.log(this.$route.params.conflictmsg)
      // this.detaillist = this.$route.params.conflictmsg
      // console.log(ConInfo)
      // console.log(typeof(this.detaillist))
      // console.log(this.detaillist)
      // for(let i=0;i<ConInfo.length;i++){
      //   ConInfo[i].replace("存在冲突,依据文件","存在冲突<br><br>依据文件")
      //   this.detail += ConInfo[i] 
      // }
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