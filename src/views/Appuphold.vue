<template>
    <div>
        <!-- <button @click="show">111</button> -->
        <!-- <p>Appendixes：{{ Appendixes }}</p>  -->
        <el-input placeholder="请输入内容" v-model="word" @keyup="searchappendix">
            <el-button slot="append" icon="el-icon-search" @click="searchappendix"></el-button>
        </el-input>
        <el-button type="text" @click="open">添加文件类型</el-button><br><br>
          <el-table
            :data="Appendixes" border style="width:100%">
            <el-table-column prop="pk" label="编号" width="180"></el-table-column>
            <el-table-column prop="name" label="附件类型" width="180"></el-table-column>
            <el-table-column
                label="操作" width="140">
                <template >
                    <el-button @click="AppendixDel" type="text" size="small">
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
    name:'Appuphold',
    data(){
        return{
            AppendixData:'',
            Appendixes:[],
            word:''
        }
    },
    methods:{
        
    },
    mounted(){
            this.$api.getapp({
                params:{
                    page:'1',
                    pageSize:'10',
                    word:''
                }   
            }).then(res =>{
                console.log(res)
                for(let i=0;i<res.data.data.total;i++)
                {
                    
                    this.Appendixes.push(res.data.data.list[i].fields)
                }
            }).catch(error =>{
                console.log(error)
            })
    },
    methods:{
        AppendixDel(){
            this.$api.delappendix({
                id:this.Appendixes.pk
            }).then(res => {
                console.log(res)
            }).catch(error =>{
                console.log(error)
            })
        },
        searchappendix(){
            this.$api.getapp({
                params:{
                    page:'1',
                    pageSize:'10',
                    word:this.word
                }
            }).then(res=>{
                console.log(res)
                this.Appendixes = []
                for(let i=0;i<res.data.data.total;i++)
                {
                    this.Appendixes.push(res.data.data.list[i].fields)
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        open() {
            this.$prompt('请输入要添加的附件类型', '添加附件类型', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.$api.addappendix({
                    name:value
                }).then(res=>{
                    console.log(res)
                    if(res.data.code == 200)
                    {
                        this.$message({
                        type: 'success',
                        message: '你添加的附件类型是: ' + value,
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
    }

}
</script>