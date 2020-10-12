<template>
    <div>
        <div class="first">
            <!-- <el-link v-for="item in text" :key="item" :value="item" @click="ShowRe($event)" :type="(typeinfo === null?'info':'success')">{{item}}</el-link> -->
            <el-link v-for="item in text" :key="item" :value="item" @click="ShowRe($event)" >{{item}}</el-link>
        </div>
        <div class="second">
            <el-link  v-for="item in textarea" :key="item" :value="item" @click="ShowTips($event)" :underline="false" type="primary">{{item}}</el-link>
        </div>
        <div class="third">
            <div class="button1">
                <el-button class="button1" @click="showConflict">
                    {{button_msg_1}}
                </el-button>
            </div><br>
            <div>
                <el-label style="margin-left: 5px">
                    更改审核状态：
                </el-label>
                <el-select v-model="auditState">
                    <el-option v-for="item in auditStates" :key="item" :value="item"></el-option>
                </el-select>
            </div>
            <div style="margin-top: 5px;margin-right:15px">
                <el-button style="float:right;" @click="SaveState">
                    保存
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api'
export default {
  name: 'Detail',
  data () {
    return {
      returninfo: {},
      textarea: [],
      text: [],
      typeinfo: Object,
      button_msg_1: '查看已添加的冲突项',
      conflictmsg: [],
      auditState: '',
      auditStates: ['审核完成', '审核未完成'],
      textinfo_1: Object,
      id_2: Number,
      data_return_info:Array,
      origin_txt:"",//存放原文
      ref:[],//存放依据
      origin2ref:{},//存放原文与相关依据对应的json
    }
  },
  methods: {
    //显示相关依据
    ShowRe (e) {
      this.textarea = []
      console.log(typeof[this.textarea])
      console.log(this.data_return_info)
      console.log(typeof(this.data_return_info))
      var data = this.data_return_info
      console.log(data[0])
      console.log(typeof(data))
      var key1 = e.target.innerHTML
      console.log(typeof(key1))
      console.log(key1)
      console.log(data[0][key1])
      var type4info = data[0][key1].type4
      console.log(type4info)
      this.textarea = type4info
      this.origin_txt = key1
    },

    //提示添加冲突项
    ShowTips (e) {
      console.log(e.target.innerHTML)
      var cof_msg = e.target.innerHTML
      var org_txt = this.origin_txt
      this.$confirm('是否将'+cof_msg+'添加为“'+ org_txt+'”冲突项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log(cof_msg)
        var conctext = ("依据文件：{"+cof_msg+"}与原文：{"+org_txt+"}存在冲突" )
        this.conflictmsg.push(conctext)
        console.log(this.conflictmsg)
        this.$message({
          type: 'success',
          message: '添加成功!',
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
      })
    },
        //显示冲突项
    showConflict () {
      var msg = this.conflictmsg
      console.log(typeof(msg))
      //this.$router.push({name:'Edit',params:{conflictmsg:msg}})
      var {href} = this.$router.resolve({ 
        name: 'Edit', 
        // params: {conflictmsg:msg} 
        })
        localStorage.setItem("conflictmsg",msg)
        console.log(msg)
        window.open(href)

      // let ConflictPage = this.$router.resolve({ 
      //   name: 'Edit', 
      //   params: {conflictmsg:msg} })
      // // window.open(ConflictPage.href, '_blank')
      // window.open(ConflictPage.href)
    },
    //更改审核状态
    SaveState () {
      var state = ''
      if (this.auditState == '审核完成') {
        state = 1
      } else if (this.aiditState == '审核未完成') {
        state = 2
      }
      this.$api.changestate({
        id: this.id_2,
        state: state
      }).then(res => {
        console.log(res)
        alert(res.data.message)
      }).catch(error => {
        consol.log(error)
      })
    },
    updateView (e) {
      this.$forceUpdate()
    }
  },
  //渲染
  mounted () {
    console.log(this.$route.params)
    this.id_2 = this.$route.params.id

    var id_1 = this.$route.params.id
    console.log(id_1)
    this.$api.selectfilebyid({
      params: {
        id: id_1
      }
    }).then(res => {
      // console.log(res.data.data.list[0].fields.returncontent)
      this.textinfo_1 = res.data.data.list[0].fields.returncontent
      var data1 = {}
      data1 = JSON.parse(this.textinfo_1)
      var data = []
      data.push(data1)
      console.log(typeof(data))
      this.data_return_info = data
      console.log(data[0])
      var datakey = []// 存放key
      var datavalue = []// 存放value
      for (var key in data[0]) {
        datakey.push(key)
        console.log(key)
        this.text.push(key)
        datavalue.push(data[0][key])
        // console.log(datavalue)
        this.typeinfo = datavalue
      }
    }).catch(error => {
      console.log(error)
    })
  },
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive = true;
    if(this.reload){
      to.meta.keepAlive = false;
    }
    next();
  }
}

</script>

<style>
 .first {
    width: 49%;
    float:left;
    border: 1px solid #3B6273;
    height: 500px;
    overflow:scroll

}
.second {
    width: 49%;
    float:right;
    border: 1px solid #3B6273;
    height: 300px;
    overflow:scroll
}
.third{
    width: 49%;
    float:right;
    margin-top: 17px;
    border: 1px solid #3B6273;
    height: 180px;
}
.button1{
    margin-top: 3px;
    margin-left: 3px;

}
.richtext{
    height:280px;
}
</style>
