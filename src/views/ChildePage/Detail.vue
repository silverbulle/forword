<template>
    <div>
      <el-popover
        placement="bottom"
        title="标题"
        width="200"
        trigger="click"
        content="左边边框内容：灰色表示未找到相关依据的条文，蓝色表示依据找到相关依据的条纹;点击左边蓝色文本会在右边文本框显示其相关依据">
        <el-button slot="reference" size="mini" icon="el-icon-question" circle style="margin-left:20px;margin-bottom:3px"></el-button>
      </el-popover>
        <div class="first">
          <!-- <el-link v-for="(item,index) in text1" :key="index" :value="item" @click="ShowRe($event)">
            <text-highlight :queries="queries" :style="{'color':text1[index].RefIsExit?'blue':'gay'}">{{item.text}}</text-highlight>
          </el-link> -->
            <el-link @click="ShowRe($event)" v-for="(item,index) in text1" :key="index" :value="item" style="font-size:18px">
              <p :style="{'color':text1[index].RefIsExit?'blue':'gay'}">{{item.text}}</p>
            </el-link>
        </div>
        <div class="second">
            <el-link style="font-size:18px"  v-for="item in textarea" :key="item" :value="item" @click="ShowTips($event)" :underline="false" type="primary">{{item}}</el-link>
        </div>
        <div class="third">
            <div class="button1">
                <el-button class="button1" @click="showConflict">
                    {{button_msg_1}}
                </el-button>

            <input type="file" @change="getFile($event)">
           
               <button @click="submitForm($event)" >提交审核意见书</button>
                <ul ref="LDQZOne">
               <button  @click="download()" >下载</button>

        <!-- <a :href="'http://39.105.91.30:6669/law/file/downloadReviewWord?id='+ '42'">下载</a> -->
               </ul>
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
import base from '../../api/base'
import axios from '../../utils/request'
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
      textinfo_2: '',
      id_2: Number,
      data_return_info: Array,
      origin_txt: '', // 存放原文
      ref: [], // 存放依据
      origin2ref: {}, // 存放原文与相关依据对应的json
      queries: [], // 需要高亮的文字
      RefIsExit: false,
      R: 1,
      text1: [],
      upData: {
        id: ''
      },
      file: '',
      url:'' //判断审核意见书是否已上传
    }
  },
  methods: {
    // 显示相关依据
    ShowRe (e) {
      this.textarea = []
      console.log(typeof [this.textarea])
      console.log(this.data_return_info)
      console.log(typeof (this.data_return_info))
      var data = this.data_return_info
      console.log(data[0])
      console.log(typeof (data))
      var key1 = e.target.innerHTML
      console.log(typeof (key1))
      console.log(key1)
      console.log(data[0][key1])
      var type4info = data[0][key1].type4
      console.log(type4info)
      this.textarea = type4info
      this.origin_txt = key1
    },

    // 提示添加冲突项
    ShowTips (e) {
      console.log(e.target.innerHTML)
      var cof_msg = e.target.innerHTML
      var org_txt = this.origin_txt
      this.$confirm('是否将' + cof_msg + '添加为“' + org_txt + '”冲突项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(cof_msg)
        var conctext = ('文件内容：{' + org_txt + '}与依据文件内容：{' + cof_msg + '}存在冲突')
        // var conctext = ("依据文件：{"+cof_msg+"}与原文：{"+org_txt+"}存在冲突" )
        this.conflictmsg.push(conctext)
        console.log(this.conflictmsg)
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
    // 显示冲突项
    showConflict () {
      var msg = this.conflictmsg
      console.log(typeof (msg))
      // this.$router.push({name:'Edit',params:{conflictmsg:msg}})
      var { href } = this.$router.resolve({
        name: 'Edit'
        // params: {conflictmsg:msg}
      })
      localStorage.setItem('conflictmsg', msg)
      localStorage.setItem('filename', this.textinfo_2)

      console.log(msg)
      window.open(href)

      // let ConflictPage = this.$router.resolve({
      //   name: 'Edit',
      //   params: {conflictmsg:msg} })
      // // window.open(ConflictPage.href, '_blank')
      // window.open(ConflictPage.href)
    },
    // 更改审核状态
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
    getFile (event) {
      this.file = event.target.files[0]
      console.log(this.file)
    },

    submitForm (event) {
      event.preventDefault()
      const formData = new FormData()
      formData.append('id', this.upData.id)
      // formData.append('age', this.age);
      formData.append('reviewWord', this.file)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const BASE_URL = window.global_config.BASE_URL;
//如需打包，则将基础路径全局替换为BASE_URL;如需开发模式，则将所有BASE_URL替换为BASE_URL
      axios.post(BASE_URL + base.uploadReviewWord,
        formData, config).then(function (response) {
        console.log(response)
        if (response.status === 200) {
          alert(response.data.message)
        }
      })
    },
    download () {
      //     this.$api.getReviewWord({
      //       params:{
      //         id:this.upData.id,
      //       }
      //     }).then((res) => {
      // console.log(res);
      //     let content = res.data;

      // const blob = new Blob([content], {type: 'application/msword'});     //重点重点，，，
      //  console.log(content)
      // application/msword类型要规定对，自己下载的是什么类型就写对应的类型
       if(this.url != ''){     
      var oReq = new XMLHttpRequest()
      // url参数为拿后台数据的接口
      const that = this
      oReq.open('POST', BASE_URL + base.getReviewWord + '?id=' + this.upData.id, true)
      // console.log(oReq)
      oReq.responseType = 'blob'
      // console.log(oReq.response)
  

      oReq.onload = function (oEvent) {
        var content = oReq.response
        var elink = document.createElement('a')
        // alert(that.textinfo_2)
        // console.log(document.body)
        // elink.download = document.name
        elink.download = that.textinfo_2 + '.doc'
        elink.style.display = 'none'
        console.log (this.status)
        
        var blob = new Blob([content], { type: 'application/msw1ord' })
        console.log(content)
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)          
      }


      // 请求头里放入用户口令，必须在.open()和.send()之间设置
      oReq.setRequestHeader('Authorization', localStorage.getItem('Authorization'))

         oReq.send()
       }else{
         alert('该文件尚未上传审核意见稿,请上传保存后再进行下载')
       }
      

      // elink.download = name+".docx";
      // const fileName = document;      //这个为文件名，可以自定义
      // if ('download' in elink) { // 非IE下载
      //   elink.download = fileName;
      //   elink.style.display = 'none';
      //   elink.href = URL.createObjectURL(blob);
      //   this.$refs.LDQZOne.appendChild(elink);
      //   elink.click();     //触发点击事件，实现文档下载
      //   URL.revokeObjectURL(elink.href); // 释放URL 对象
      //   $refs.LDQZOne.removeChild(elink);    //下载完成，移除新建的a标签
      // } else { // IE10+下载
      //   navigator.msSaveBlob(blob, fileName)
      // }

      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    },

    updateView (e) {
      this.$forceUpdate()
    }
  },
  // 渲染
  mounted () {
    this.$api.getsen({
      params: {
        page: '1',
        pageSize: '1000',
        word: ''
      }
    }).then(res => {
      console.log(res)
      // this.AppendixData = res.data.data.list[0].fields.name
      // this.Appendixes = res.data.data.list
      // console.log(this.Sensitives)
      for (let i = 0; i < res.data.data.total; i++) {
        this.queries.push(res.data.data.list[i].fields.name)
      }
      console.log(this.queries)
    }).catch(error => {
      console.log(error)
    })

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
      this.textinfo_2 = res.data.data.list[0].fields.name.replace(/.docx/, '')
      this.url = res.data.data.list[0].fields.reviewwordurl
      console.log("url是" + this.url)
      this.upData.id = res.data.data.list[0].pk
      var data1 = {}
      data1 = JSON.parse(this.textinfo_1)
      var data = []
      data.push(data1)
      // console.log(typeof (data))
      this.data_return_info = data
      // console.log(data[0])
      var datakey = []// 存放key
      var datavalue = []// 存放value
      for (var key in data[0]) {
        datakey.push(key)
        // console.log(key)
        this.text.push(key)
        datavalue.push(data[0][key])
        // console.log(datavalue)
        // console.log(data[0][key])
        // console.log(data[0][key].type4)
        // console.log(typeof(data[0][key].type4))
        // console.log(data[0][key].type4.length)
        // console.log(typeof(data[0][key].type4.length))
        if (data[0][key].type4.length === 0) {
          // console.log(data[0][key].type4)
          this.RefIsExit = false
          this.text1.push({ text: key, RefIsExit: false })
          // console.log(this.text1)
          // console.log(this.RefIsExit)
        } else if (data[0][key].type4.length != 0) {
          this.RefIsExit = true
          this.text1.push({ text: key, RefIsExit: true })
          // console.log(this.text1)
          // console.log(this.RefIsExit)
        }
        this.typeinfo = datavalue
      }
    }).catch(error => {
      console.log(error)
    })
  },
  beforeRouteLeave (to, from, next) {
    to.meta.keepAlive = true
    if (this.reload) {
      to.meta.keepAlive = false
    }
    next()
  }
}

</script>

<style>
 .first {
    width: 49%;
    float:left;
    border: 1px solid #3B6273;
    height: 880px;
    overflow:scroll

}
.second {
    width: 49%;
    float:right;
    border: 1px solid #3B6273;
    height: 650px;
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
.RefExit{
  color:red
}
.RefNotExit{
  color:gray
}
.tips{
  background-image: "../../static/images/提示.png";
  margin-left:20px;
  margin-bottom: 3px;
  width: 5px;
}
</style>
