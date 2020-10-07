<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="送审文件">
                <el-input placeholder="请输入内容" v-model="FormList.filename" class="input-with-select">
                    <el-select v-model="FormList.type" slot="prepend" placeholder="请选择">
                        <el-option v-for="i in appendix" :key="i" :label="i" :value="i"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search">上传送审稿</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="上传附件">
                <el-input placeholder="请输入内容" v-model="FormList.Appendix" class="input-with-select">
                    <el-select v-model="FormList.Appendixtype" slot="prepend" placeholder="请选择">
                        <el-option v-for="i in appendixtype" :key="i" :label="i" :value="i"></el-option>
                    </el-select>
                    <el-button slot="append" @click="add">+</el-button>
                </el-input>
                <div v-for="(d,index) in counter" :key="index">
                    <dom></dom>
                </div>
            </el-form-item>
            <el-form-item label="缺少附件类型" label-width="100px">
                <el-checkbox-group v-model="checkboxGroup1">
                    <el-checkbox-button v-for="item in appendixtype" :label="item" :key="item" :value="item"></el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="送审单位">
                <el-form-item label="送审单位">
                    <el-input v-model="FormList.issuer"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <el-input v-model="FormList.issuerdepartment"></el-input>
                </el-form-item>
                <el-form-item label="送审人">
                    <el-input v-model="FormList.issuer"></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item label="送审时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="FormList.uploadtime" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="FormList.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交审核</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Vue from 'vue'
Vue.component('dom', {
  template: '<div>组件</div>'
})
export default {
  name: 'Audidting',
  data () {
    return {
      FormList: {
        filename: '',
        type: '',
        Appendix: '',
        Appendixtype: '',
        needAppendix: '',
        needAppendixtype: '',
        issuer: '',
        issuerdepartment: '',
        uploadtime: '',
        remark: ''
      },
      appendix: ['规范性文件', '法律', '合同'],
      appendixtype: [],
      checkboxGroup1: [],
      counter: []
    }
  },
  mounted () {
    this.$api.getapp({
      params: {
        page: '1',
        pageSize: '1000',
        word: ''
      }
    }).then(res => {
      console.log(res)
      for (let i = 0; i < res.data.data.total; i++) {
        this.appendixtype.push(res.data.data.list[i].fields.name)
      }
      console.log(this.appendix)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    onSubmit () {
      this.$api.addfile({
        file: this.FormList.filename,
        jsonText: this.FormList

      }).then(res => {
        console.log(res)
        if (res.data.code == 500) {
          alert('上传成功')
          const ToDetailPage = this.$router.resolve({ name: 'Filedetail' })
          window.open(ToDetailPage.href, '_blank')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleCheckAllChange (val) {
      this.checkedtypes = val ? appendixtype : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    add () {
      this.counter.push({})
    }
  }
}
</script>

<style>
  .el-select .el-input {
    width: 110px;
  }
</style>
