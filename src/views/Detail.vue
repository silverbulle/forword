<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-input placeholder="请输入内容" v-model="pageform.word" @keyup.enter.native="searchfile" @input="updateView($event)">
                <el-button slot="append" icon="el-icon-search" @click="searchfile"></el-button>
            </el-input>
        </el-header>

        <el-main>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed type="index" width="80"></el-table-column>
            <el-table-column prop="submissiontime" label="送达时间" width="100" >
            </el-table-column>
            <el-table-column fixed prop="filename" label="送审稿名称" width="300">
            </el-table-column>
            <el-table-column fixed prop="type" label="送审稿类型" width="100">
            </el-table-column>
            <el-table-column prop="submissionunit" label="送审单位" width="150">
            </el-table-column>
            <el-table-column prop="issuer" label="签发人姓名" width="150">
            </el-table-column>
            <el-table-column prop="issuerdepartment" label="签发人科室" width="120" >
            </el-table-column>
            <el-table-column prop="remarks" label="备注" width="120">
            </el-table-column>
            <el-table-column prop="review" label="审查意见书" width="95">
            </el-table-column>
            <el-table-column prop="lastedittime" label="上次修改时间" width="100" >
            </el-table-column>
            <el-table-column fixed prop="state" label="状态" width="95">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small" >查看</el-button >
                <el-button type="text" size="small" @click="delfile(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-container style="direction: horizontal">
      <el-footer>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change" >
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import load from '../views/Detail'
import api from '../api'

export default {
  name: 'Detail',
  components: {
    load
  },
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      total: Number,
      page: 1,
      // pagesize: 9,
      currentPage: 1,
      pageform: {
        page: 1,
        pageSize: 9,
        word: '',
        type: '0,1,2',
        state: '0,1,2,3'
      },
      id: Number
    }
  },
  methods: {
    gosen () {
      this.$router.push('About')
    },
    filedetail () {
      this.$router.push('filedetail')
    },
    handleClick (row) {
      console.log(row)
      console.log(row.state)
      if(row.state == "系统处理中")
      {
        alert("处理中的文件不可操作！")
      }
      else{
        console.log(row.pk)
        this.FileDetail1(row.pk)
      }
    },
    getfilelist (params) {
      console.log('已进入请求函数中')
      api
        .getFilelist({
          page: this.pageform.page,
          pageSize: this.pageform.pageSize,
          word: this.pageform.word,
          type: this.pageform.type,
          state: this.pageform.state
        },{"Authorization": localStorage.getItem("Authorization")})
        .then((res) => {
          console.log('已取得响应数据')
          console.log(res.data)
          if (res.data.code == 200) {
            console.log(res.data.data.list)
            for (let i = 0; i < this.pageform.pageSize; i++) {
              if (res.data.data.list[i].fields != null) {
                
                var string = res.data.data.list[i].fields.name
                var arr = string.split('.')
                string = arr[0]
                console.log(string)
                res.data.data.list[i].fields.name = string
                this.tableData.push(res.data.data.list[i].fields)
                if (res.data.data.list[i].fields.state == '0') {
                  res.data.data.list[i].fields.state = '审核未完成'
                } if (res.data.data.list[i].fields.state == '1') {
                  res.data.data.list[i].fields.state = '审核完成'
                } if (res.data.data.list[i].fields.state == '2') {
                  res.data.data.list[i].fields.state = '系统处理中'
                } if (res.data.data.list[i].fields.state == '3') {
                  res.data.data.list[i].fields.state = '系统处理完成'
                }

                if (res.data.data.list[i].fields.type == '0') {
                  res.data.data.list[i].fields.type = '规范性文件'
                } if (res.data.data.list[i].fields.type == '1') {
                  res.data.data.list[i].fields.type = '法律'
                } if (res.data.data.list[i].fields.type == '2') {
                  res.data.data.list[i].fields.type = '合同'
                }
              } else {
                this.tableData.push([{ filename: '' }])
                console.log(this.tableData)
              }
            }
            // this.tableData = res.data.data.list;
            this.total = res.data.data.total
            console.log(res.data.data.total)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
      console.log('分页效果已进入请求函数中')
      api
        .getFilelist({
          page: this.currentPage,
          pageSize: this.pageform.pageSize,
          word: this.pageform.word,
          type: this.pageform.type,
          state: this.pageform.state
        })
        .then((res) => {
          console.log(res)
          console.log('分页效果已取得响应数据')
          console.log(res.data.data.list)
          if (res.data.code == 200) {
            console.log(res.data.data.list)
            this.tableData = []
            for (let i = 0; i < res.data.data.list.length; i++) {
              if (res.data.data.list[i].fields != null) {
                this.tableData.push(res.data.data.list[i].fields)
                if (res.data.data.list[i].fields.state == '0') {
                  res.data.data.list[i].fields.state = '审核未完成'
                } if (res.data.data.list[i].fields.state == '1') {
                  res.data.data.list[i].fields.state = '审核完成'
                } if (res.data.data.list[i].fields.state == '2') {
                  res.data.data.list[i].fields.state = '系统处理中'
                } if (res.data.data.list[i].fields.state == '3') {
                  res.data.data.list[i].fields.state = '系统处理完成'
                }

                if (res.data.data.list[i].fields.type == '0') {
                  res.data.data.list[i].fields.type = '规范性文件'
                } if (res.data.data.list[i].fields.type == '1') {
                  res.data.data.list[i].fields.type = '法律'
                } if (res.data.data.list[i].fields.type == '2') {
                  res.data.data.list[i].fields.type = '合同'
                }
              } else {
                this.tableData.push([{ filename: '' }])
              }
            }
            // this.tableData = res.data.data.list;
            this.total = res.data.data.total
            console.log(res.data.data.total)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    FileDetail1 (e) {
      var msg = e
      console.log(msg)
      this.$router.push({ name: 'Detail1', params: { id: msg } })
    },
    updateView (e) {
      this.$forceUpdate()
    },
    delfile(row){
      console.log(row.pk)
      if(row.state == "系统处理中"){
        alert("处理中的文件不可被操作！")
      }
      else{
        this.$api.delfile({
          id:row.pk
        }).then(res =>{
          console.log(res)
          if(res.data.code == 200){
            alert("删除成功！")
          }
          else{
            alert(res.data.message)
          }
        }).catch(error =>{
          console.log(error)
        })
      }
    },
    searchfile () {
      console.log(this.pageform.word)
      this.$api.getfile({
        params: {
          page: this.pageform.page,
          pageSize: this.pageform.pageSize,
          word: this.pageform.word,
          type: this.pageform.type,
          state: this.pageform.state
        }
      }).then(res => {
        console.log(res)
        this.tableData = []
        for (let i = 0; i < res.data.data.total; i++) {
          this.tableData.push(res.data.data.list[i].fields)
          if (res.data.data.list[i].fields.state == '0') {
            res.data.data.list[i].fields.state = '审核未完成'
          } if (res.data.data.list[i].fields.state == '1') {
            res.data.data.list[i].fields.state = '审核完成'
          } if (res.data.data.list[i].fields.state == '2') {
            res.data.data.list[i].fields.state = '系统处理中'
          } if (res.data.data.list[i].fields.state == '3') {
            res.data.data.list[i].fields.state = '系统处理完成'
          }

          if (res.data.data.list[i].fields.type == '0') {
            res.data.data.list[i].fields.type = '规范性文件'
          } if (res.data.data.list[i].fields.type == '1') {
            res.data.data.list[i].fields.type = '法律'
          } if (res.data.data.list[i].fields.type == '2') {
            res.data.data.list[i].fields.type = '合同'
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
  mounted: function () {
    this.getfilelist();
  }
}
</script>

<style type="text/css">
.el-header {
  background-color: #98aac2;
  color: #333;
  line-height: 60px;
  /* height: 100%; */
}

.el-aside {
  width: 200px;
  color: #333;
}
.el-main {
  height: 50%;
}
.el-footer{
  height: 80px;
}
</style>
