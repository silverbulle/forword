<template>
    <div>
        <div class="first">
            <!-- <el-button type="text" v-for="item in text" :key="item" :value="item">
                {{item}}
            </el-button> -->
                <!-- <label  v-for="item in text" :key="item" :value="item">{{item}}<br><br></label> -->
            <!-- <ul>
                <li v-for="item in text" :key="item">{{item}}</li>
            </ul> -->
            <el-link v-for="item in text" :key="item" :value="item" @click="ShowRe($event)">
                {{item}}
            </el-link>
        </div>
        <div class="second">
            <label  v-for="item in textarea" :key="item" :value="item" @dblclick="ShowTips" :underline="false">{{item}}<br><br></label>
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
      conflictmsg: '这是冲突项',
      auditState: '',
      auditStates: ['审核完成', '审核未完成'],
      textinfo_1: Object,
      id_2: Number
    }
  },
  methods: {
    ShowRe (e) {
      this.textarea = []
      console.log('textinfor_1：' + this.textinfo_1)
      // console.log(e.target.innerHTML)
      var key = []
      var key1 = e.target.innerHTML
      console.log(key1)
      console.log(this.textinfo_1[key1])
      var type4info = this.textinfo_1[key1].type4
      this.textarea = type4info
      // console.log(this.textarea)
    },
    showConflict () {
      var msg = this.conflictmsg
      const ConflictPage = this.$router.resolve({ name: 'Edit', params: msg })
      window.open(ConflictPage.href, '_blank')
    },
    ShowTips () {
      this.$confirm('是否将此项添加到冲突项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
      })
    },
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
      console.log(data[0])
      var datakey = []// 存放key
      var datavalue = []// 存放value
      var i = data[0].length
      console.log(i)
      console.log(typeof (data[0]))
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
