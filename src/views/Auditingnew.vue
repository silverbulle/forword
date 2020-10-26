<template>
  <div>
    <el-form ref="form" label-width="100px" style="margin-top: 15px">
      <el-form-item
        label="送审文件"
        :rules="[
          { required: true, message: '描述不能为空', trigger: 'change' },
        ]"
      >
        <el-col :span="5">
          <el-select v-model="mainfiletype">
            <el-option
              v-for="i in appendix"
              :key="i"
              :label="i"
              :value="i"
            ></el-option>
          </el-select>
        </el-col>

        <el-upload
          class="upload-demo"
          ref="upload"
          name="mainfile"
          action="https://jsonplaceholder.typicode.com/posts/"
          limit="1"
          accept=".docx"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :on-change="mainfilehandleChange"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
            style="margin-left: 10px"
            >选取送审文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传word文件(后缀名为.docx)
          </div>
        </el-upload>
      </el-form-item>

      <!--  -->

      <el-form :model="formData3" :inline="true" ref="formData3" size="medium">
        <el-row
          v-for="(item, index) in formData3.appendix"
          :key="index"
          style="border-bottom: 1px solid #f0f0f0; padding: 10px"
        >
          <!-- <el-form-item
          label="附件名"
          :rules="[
            { required: true, message: '参数名不能为空', trigger: 'change' },
            { max: 32, message: '不超过32个字符', trigger: 'change' },
          ]"
        > -->
          <el-form-item label="上传附件" style="margin-left: 2%">
            <el-input
              v-model="item.realName"
              placeholder="选取附件后显示附件名"
            />
          </el-form-item>

          <!-- <el-form-item
          label="描述"
          :prop="'appendix.' + index + '.Appendixtype'"
          :rules="[
            { required: true, message: '描述不能为空', trigger: 'change' },
          ]" 
        > -->
          <el-form-item
            label="选择附件类型"
            :prop="'appendix.' + index + '.appendixType'"
          >
            <el-select
              clearable
              v-model="item.appendixType"
              placeholder="请选择描述"
            >
              <el-option
                v-for="i in appendixType"
                :key="i"
                :label="i"
                :value="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              limit="1"
              :on-preview="handlePreview"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="
                function onchange(file, fileList) {
                  return appendixhandleChange(file, fileList, index);
                }
              "
              :on-success="
                function onSuccess(response, file, fileList) {
                  return handleSuccess(response, file, fileList, index);
                }
              "
              :on-remove="
                function onRemove(file, fileList) {
                  return handleRemove(file, fileList, index);
                }
              "
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取相关附件</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="addRow"
                style="margin-left: 12px"
                >添加其它附件</el-button
              >
            </el-upload>
          </el-form-item>

          <el-button
            type="danger"
            v-if="formData3.appendix.length > 1"
            size="medium"
            @click="removeRow(index)"
            >删除</el-button
          >
        </el-row>
      </el-form>
      <el-form-item label="缺少附件类型" label-width="100px">
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button
            v-for="item in appendixType"
            :label="item"
            :key="item"
            :value="item"
          ></el-checkbox-button>
          <!-- <div>{{checkboxGroup1}}</div> -->
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="送审单位">
        <el-input v-model="FormList.submissionUnit"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="FormList.issuerDepartment"></el-input>
      </el-form-item>
      <el-form-item label="送审人">
        <el-input v-model="FormList.issuer"></el-input>
      </el-form-item>
      <el-form-item
        label="送审时间"
        :rules="[
          { required: true, message: '描述不能为空', trigger: 'change' },
        ]"
      >
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="FormList.submissionTime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy年MM月dd日"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="FormList.remarks"></el-input>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" @click="onSubmit">提交审核</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import base from "../api/base";
import axios from "../utils/request";
Vue.component("dom", {
  template: "<div>组件</div>",
});
export default {
  name: "Auditingnew",
  data() {
    return {
      token: "",
      appendixtypelist: [],
      mainfiletype: "",
      file: [],
      appendixfile: [],
      FormList: {
        name: "",
        type: "",
        appendix: {},
        needAppendix: [
          // {
          //   appendixType: Number
          // }
        ],
        issuer: "",
        issuerDepartment: "",
        submissionUnit: "",
        submissionTime: "",
        remarks: "",
      },
      appendix: ["规范性文件", "法律", "合同"],
      appendixType: [],
      checkboxGroup1: [],
      counter: [],
      formData3: {
        appendix: [
          {
            realName: "",
            appendixFileName: "",
            appendixType: "",
          },
        ],
      },

      // 新增表单的验证规则
      moreRules: {
        fieldSort: [
          { required: true, message: "请输入排序", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (value < 0) {
                callback(new Error("必须大于0"));
              } else if (value.length > 5) {
                callback(new Error("不超过5位数字"));
              } else if (!value) {
                callback(new Error("排序不能为空"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.$api
      .getapp({
        params: {
          page: "1",
          pageSize: "1000",
          word: "",
        },
      })
      .then((res) => {
        // console.log(res);
        // alert(JSON.stringify(res.data.data.list));
        this.appendixtypelist = res.data.data.list;
        console.log(this.appendixtypelist);
        for (let i = 0; i < res.data.data.total; i++) {
          this.appendixType.push(res.data.data.list[i].fields.name);
        }
        // alert(this.appendixType);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addRow() {
      this.formData3.appendix.push({
        realName: "",
        appendixFileName: "",
        appendixType: "",
      });
    },
    // 删除属性列
    removeRow(index) {
      this.formData3.appendix.splice(index, 1);
    },
    // 提交
    // submit(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     console.log(this.formData3);
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    onSubmit() {
      const formData = new FormData();
      if (this.mainfiletype === "规范性文件") {
        this.FormList.type = "0";
      } else if (this.mainfiletype === "法律") {
        this.FormList.type = "1";
      } else if (this.mainfiletype === "合同") {
        this.FormList.type = "2";
      }
      // alert("进入提交函数");
      console.log(this.formData3.appendix[0].AppendixType);
      for (let i = 0; i < this.formData3.appendix.length; i++) {
        this.formData3.appendix[i].appendixFileName = "key" + i;
        for (let j = 0; j < this.appendixtypelist.length; j++) {
          //   const element = array[j];
          if (
            this.formData3.appendix[i].appendixType ===
            this.appendixtypelist[j].fields.name
          ) {
            this.formData3.appendix[i].appendixType = this.appendixtypelist[
              j
            ].fields.pk;
          }
        }
        formData.append("key" + i, this.appendixfile[i]);
      }
      if (this.formData3.appendix[0].realName === "") {
        this.formData3.appendix.splice(0, 1);
      }
      console.log(
        "this.appendixtypelist.length的值为" + this.appendixtypelist.length
      );
      console.log(
        "this.formData3.appendix.length的值为" + this.formData3.appendix.length
      );
      for (let a = 0; a < this.checkboxGroup1.length; a++) {
        for (let b = 0; b < this.appendixtypelist.length; b++) {
          if (this.checkboxGroup1[a] === this.appendixtypelist[b].fields.name) {
            this.checkboxGroup1[a] = this.appendixtypelist[b].fields.pk;
          }
        }
      }
      console.log(
        "this.checkboxGroup1.length的值为" + this.checkboxGroup1.length
      );
      console.log(
        "this.appendixtypelist.length的值为" + this.appendixtypelist.length
      );
      if (this.checkboxGroup1.length != 0) {
        for (let i = 0; i < this.checkboxGroup1.length; i++) {
          this.FormList.needAppendix.push({
            appendixType: this.checkboxGroup1[i],
          });
        }
      }

      //   alert("!!!!!!!!!!")
      //   alert(JSON.stringify(this.formData));
      this.FormList.appendix = this.formData3.appendix;
      // alert(JSON.stringify(this.FormList));
      //   this.FormList.push(this.formData3);
      //   console.log(JSON.stringify(this.formData3));

      var jsonText = JSON.stringify(this.FormList);
      formData.append("jsonText", jsonText);
      formData.append("file", this.file);
      //   alert(this.file);
      console.log(formData);
      //   console.log(this.uploadData);
      // const BASE_URL = window.global_config.BASE_URL;
      //如需打包，则将基础路径全局替换为BASE_URL;如需开发模式，则将所有BASE_URL替换为BASE_URL
      axios
        .post(base.proxyUrl + base.AddFile, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          alert(res);
          console.log(res);
          if (res.data.code === 200) {
            alert("test");
            alert(res.data.message);
            const ToDetailPage = this.$router.resolve({ name: "Filedetail" });
            window.open(ToDetailPage.href, "_blank");
          } else if (res.data.code === 500) {
            alert(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleCheckAllChange(val) {
      this.checkedtypes = val ? this.appendixType : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    mainfilehandleChange(file, fileList) {
      // console.log(fileList);
      // console.log(typeof fileList);
      this.FormList.name = file.name;
      this.file = fileList[0].raw;
    },
    appendixhandleChange(file, fileList, index) {
      //   this.appendixfile = fileList;
      //   console.log("success");
      console.log("success", file, fileList, index);
      this.formData3.appendix[index].realName = fileList[0].name;
      console.log(this.formData3.appendix[index].realName);
      this.appendixfile.push(file.raw);

      //   for (let index = 0; index < this.appendixfile.length; index++) {
      //     const element = array[index];
      //   }
    },
    // 上传成功
    handleSuccess(response, file, fileList, index) {},
    // 删除文件
    handleRemove(file, fileList, index) {
      this.formData3.appendix.splice(index, 1);
      console.log("remove", file, fileList, index);
      //   this.processList[index].fileList = fileList;
    },
  },
};
</script>
<style >
.el-select .el-input {
  width: 110px;
}

.submit {
  margin: 0px auto;
}
.el-form-item label:after {
  content: "";
  display: inline-block;
  width: 100%;
}
.el-form-item__label {
  text-align: justify;
  height: 50px;
}
.el-form-item.is-required.el-form-item__label:before {
  content: none !important;
}
</style>
