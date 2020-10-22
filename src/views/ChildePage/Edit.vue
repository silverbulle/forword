<template>
  <div>
    <el-button @click="Download" style="margin-left: 5px">
      导出到本地
    </el-button>
    <!-- <el-button @click="Back2detail" style="margin-right: 5px">
      上传意见书
    </el-button> -->
    
    <editor-bar
      class="rich_textbox"
      v-model="detail"
      :isClear="isClear"
      @change="change"
    ></editor-bar>
  </div>
</template>  
<script>
import EditorBar from "../../components/wangEnduit";
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
export default {
  components: { EditorBar },
  data() {
    return {
      // id: "",
      filename: "",
      test: "",
      isClear: false,
      detaillist: [],
      detail: "",
      submissiondetail: {
        mainsubmission: "",
      },
    };
  },
  methods: {
    change(val) {
      console.log(val);
    },
    Download() {
      this.submissiondetail.mainsubmission = this.detail;
      // alert(JSON.stringify(this.submissiondetail));
      // console.log(JSON.stringify(this.submissiondetail));
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent("/templete.docx", function (error, content) {
        // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          throw error;
        }
        console.log("读取过模板文件");
        // 创建一个PizZip实例，内容为模板的内容
        let zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new docxtemplater().loadZip(zip);
        // 设置模板变量的值
        doc.setData({
          ...that.submissiondetail,
        });

        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        // that.filename = that.filename + "意见书";
        saveAs(out, that.filename);
      });
    },
  },

  //以上为导出word文件

  mounted() {
    var ConInfo = "";
    // var filename1 = "";
    if (localStorage.getItem("conflictmsg")) {
      ConInfo = localStorage.getItem("conflictmsg");
      // this.id = localStorage.getItem("id");
      this.filename = localStorage.getItem("filename") + "意见书";
      this.filename = this.filename.replace(/.docx/, "");
      // alert(this.filename);
      
      ConInfo = ConInfo.replace(/存在冲突,文件内容/g, "存在冲突<br><br>文件内容");
      this.detail = ConInfo
      console.log(ConInfo)
      localStorage.conflictmsg.clear();
    }
    
    // console.log(ConInfo);
    // console.log(typeof ConInfo);
    // console.log(JSON.stringify(this.filedetail));
    //this.detail = ConInfo;
    //console.log(this.detail)
    // alert(this.filename);
    console.log(this.filename);
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
  beforeRouteEnter(to, from, next) {
    if (from.name == "Detail") {
      to.meta.keepAlive = false;
    } else {
      to.meta.keepAlive = true;
    }
    next();
  },
};
</script> 

<style>
.rich_textbox{
  height: 880px;
  font-size: 18px;
}
</style>