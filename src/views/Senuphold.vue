<template>
    <div>
        <el-input placeholder="请输入内容" v-model="word" @keyup="searchsensitive">
            <el-button slot="append" icon="el-icon-search" @click="searchsensitive"></el-button>
        </el-input>
        <el-button type="text" @click="open">添加敏感词</el-button><br><br>
        <!-- <button @click="show">111</button> -->
        <!-- <p>Appendixes：{{ Appendixes }}</p>  -->
          <el-table
            :data="Sensitives" border style="width: 100%">
            <el-table-column prop="pk" label="编号" width="180"></el-table-column>
            <el-table-column prop="name" label="敏感词" width="180"></el-table-column>
            <el-table-column
                label="操作" width="140">
                <template slot-scope="">
                    <el-button @click="DeletSen" type="text" size="small"> 移除 </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import api from '../api'
export default {
    name:'Senuphold',
    data(){
        return{
            SensitiveData:'',
            Sensitives:[],
            word:''
        }
    },
    methods:{
        DeletSen(){
            this.$api.delsen({
                pk:""
            }).then(res=>{
                console.log(res)
            }).catch(error =>{
                console.log(error)
            })
        },
        searchsensitive(){
            this.$api.getsen({
                params:{
                    page:'1',
                    pageSize:'100',
                    word:this.word
                }
            }).then(res=>{
                console.log(res)
                this.Sensitives = []
                for(let i=0;i<res.data.data.total;i++)
                {
                    this.Sensitives.push(res.data.data.list[i].fields)
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        open() {
            this.$prompt('请输入要添加的敏感词', '添加敏感词', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.$api.addsensitive({
                    name:value
                }).then(res=>{
                    console.log(res)
                    if(res.data.code == 200)
                    {
                        this.$message({
                        type: 'success',
                        message: '你添加的敏感词是: ' + value,
                        
                    });
                    window.reload()
                    }
                }).catch(error =>{
                    this.$router.go(0)
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
      }
        
    },
    mounted(){
            this.$api.getsen({
                params:{
                    page:'1',
                    pageSize:'1000',
                    word:''
                }   
            }).then(res =>{
                console.log(res)
                // this.AppendixData = res.data.data.list[0].fields.name
                // this.Appendixes = res.data.data.list
                // console.log(this.Sensitives)
                for(let i=0;i<res.data.data.total;i++)
                {
                    this.Sensitives.push(res.data.data.list[i].fields)
                }
            }).catch(error =>{
                console.log(error)
            })
    },
}
</script>
