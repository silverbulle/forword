<template>
    <div>
        <!-- <button @click="show">111</button> -->
        <!-- <p>Appendixes：{{ Appendixes }}</p>  -->
        <el-input placeholder="请输入内容" v-model="word" @keyup.enter.native="searchappendix">
            <el-button slot="append" icon="el-icon-search" @click="searchappendix"></el-button>
        </el-input>
        <el-button type="text" @click="open">添加文件类型</el-button><br><br>
          <el-table
            :data="Appendixes" border style="width:100%">
            <el-table-column type="index" width="80"></el-table-column>
            <!-- <el-table-column prop="pk" label="编号" width="180"></el-table-column> -->
            <el-table-column prop="name" label="附件类型" width="180"></el-table-column>
            <el-table-column
                label="操作" width="140">
                <template slot-scope="scope">
                    <el-button @click="UpdataAppendix(scope.row)" type="text" size="small">
                    修改
                    </el-button>
                    <el-button @click="AppendixDel(scope.row)" type="text" size="small">
                    移除
                    </el-button>
                    
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import api from '../api'
export default {
  name: 'Appuphold',
  data () {
    return {
      AppendixData: '',
      Appendixes: [],
      word: ''
    }
  },
  mounted () {
    this.$api.getapp({
      params: {
        page: '1',
        pageSize: '10',
        word: ''
      }
    }).then(res => {
      console.log(res)
      for (let i = 0; i < res.data.data.total; i++) {
        this.Appendixes.push(res.data.data.list[i].fields)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    AppendixDel (row) {
      console.log(row)
      this.$api.delappendix({
        id: row.pk
      }).then(res => {
        console.log(res)
        this.$api.getapp({
          params: {
            page: '1',
            pageSize: '1000',
            word: this.word
          }
        }).then(res1 => {
          console.log(res1)
          this.Appendixes = []
          for (let i = 0; i < res1.data.data.total; i++) {
            this.Appendixes.push(res1.data.data.list[i].fields)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    UpdataAppendix(row){
      console.log(row)
      var oldstring = row.name
      this.$prompt('将['+oldstring+']修改为:', '修改附件类型', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$api.updateApp({
          id:row.pk,
          name: value
        }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '已将['+oldstring+']修改为[' + value +']'
            })
            this.$api.getapp({
              params: {
                page: '1',
                pageSize: '1000',
                word: this.word
              }
            }).then(res => {
              console.log(res)
              this.Appendixes = []
              for (let i = 0; i < res.data.data.total; i++) {
                this.Appendixes.push(res.data.data.list[i].fields)
              }
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          this.$router.go(0)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    searchappendix () {
      this.$api.getapp({
        params: {
          page: '1',
          pageSize: '1000',
          word: this.word
        }
      }).then(res => {
        console.log(res)
        this.Appendixes = []
        for (let i = 0; i < res.data.data.total; i++) {
          this.Appendixes.push(res.data.data.list[i].fields)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    open () {
      this.$prompt('请输入要添加的附件类型', '添加附件类型', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$api.addappendix({
          name: value
        }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '你添加的附件类型是: ' + value
            })
            this.$api.getapp({
              params: {
                page: '1',
                pageSize: '1000',
                word: this.word
              }
            }).then(res => {
              console.log(res)
              this.Appendixes = []
              for (let i = 0; i < res.data.data.total; i++) {
                this.Appendixes.push(res.data.data.list[i].fields)
              }
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          this.$router.go(0)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }

}
</script>
