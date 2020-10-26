<template>
  <div>
    <el-form ref="form" label-width="100px" :model="formData3" size="medium">
      <el-form-item label="送审文件">
        <el-select v-model="mainfiletype">
          <el-option
            v-for="i in appendix"
            :key="i"
            :label="i"
            :value="i"
          ></el-option>
        </el-select>

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
          <el-button slot="trigger" size="small" type="primary"
            >选取送审文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传word文件(后缀名为.docx)
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="上传附件类型"
        :prop="'powerAttrList.' + index + '.fieldDesc'"
        :rules="[
          { required: true, message: '描述不能为空', trigger: 'change' },
        ]"
      >
        <el-select v-model="FormList.Appendixtype">
          <el-option
            v-for="i in appendixtype"
            :key="i"
            :label="i"
            :value="i"
          ></el-option>
        </el-select>

        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :on-change="appendixhandleChange"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取相关附件</el-button
          >
          <div slot="tip" class="el-upload__tip">maybe只能上传word文件</div>
        </el-upload>
        <el-row>
          <el-button type="primary" size="medium" @click="addRow"
            >新增属性</el-button
          >
          <el-button type="primary" size="medium" @click="submit('formData3')"
            >提交</el-button
          >
        </el-row>
        <div v-for="(d, index) in counter" :key="index">
          <dom></dom>
        </div>
      </el-form-item>
      <el-form-item label="缺少附件类型" label-width="100px">
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button
            v-for="item in appendixtype"
            :label="item"
            :key="item"
            :value="item"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="送审单位">
        <el-form-item label="送审单位">
          <el-input v-model="FormList.submissionUnit"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="FormList.issuerDepartment"></el-input>
        </el-form-item>
        <el-form-item label="送审人">
          <el-input v-model="FormList.issuer"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="送审时间">
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
      <el-form-item>
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
  name: "Audidting",
  data() {
    return {
      formData3: {
        powerAttrList: [
          {
            fieldName: "",
            fieldSort: "",
            fieldDesc: "",
            fieldTime: "",
          },
        ],
      },

      mainfiletype: "",
      file: [],
      appendixfile: [],
      FormList: {
        name: "",
        type: "",
        appendix: [
          {
            Appendixtype: "",
            appendixFileName: "",
            realName: "",
          },
        ],
        needAppendix: [
          {
            needAppendixtype: "",
          },
        ],
        issuer: "",
        issuerDepartment: "",
        submissionUnit: "",
        submissionTime: "",
        remarks: "",
      },
      appendix: ["规范性文件", "法律", "合同"],
      appendixtype: [],
      checkboxGroup1: [],
      counter: [],
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
        console.log(res);
        for (let i = 0; i < res.data.data.total; i++) {
          this.appendixtype.push(res.data.data.list[i].fields.name);
        }
        console.log(this.appendix);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onSubmit() {
      let formData = new FormData();
      if (this.mainfiletype === "规范性文件") {
        this.FormList.type = "1";
      } else if (this.mainfiletype === "法律") {
        this.FormList.type = "2";
      } else if (this.mainfiletype === "合同") {
        this.FormList.type = "3";
      }

      var jsonText = JSON.stringify(this.FormList);
      formData.append("jsonText", jsonText);
      formData.append("file", this.file);

      // alert(jsonText);
      alert(this.file);
      // this.$api
      //   .addfile({
      //     file: this.file,
      //     jsonText: jsonText,
      //     // jsonText: this.FormList,
      //   })
      console.log(formData);
      const BASE_URL = window.global_config.BASE_URL;
      //如需打包，则将基础路径全局替换为BASE_URL;如需开发模式，则将所有BASE_URL替换为BASE_URL
      axios
        .post(BASE_URL + base.AddFile, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            alert("上传成功");
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
      this.checkedtypes = val ? appendixtype : [];
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
    appendixhandleChange(file, fileList) {
      this.appendixfile = fileList;
      for (let index = 0; index < this.appendixfile.length; index++) {
        const element = array[index];
      }
    },
    addRow() {
      this.formData3.powerAttrList.push({
        fieldName: "",
        fieldSort: "",
        fieldDesc: "",
        fieldTime: "",
      });
    },
  },
};
</script>

<style>
.el-select .el-input {
  width: 110px;
}
</style>
