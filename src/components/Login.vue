<template >
<div>
    <div>
      <h1 class="title">合法性审查辅助系统</h1>
    </div>

  <div class="hello">

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="pass">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
       <el-checkbox v-model="ruleForm.checked" style="color: white;padding-left:100px;padding-bottom: 10px;" checked>记住用户名和密码 </el-checkbox>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
        <el-button @click="resetForm(ruleForm)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
import api from "../api";
// import axios from "axios";

export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  mounted(){
 this.getCookie();
    },
  methods: {
    submitForm(ruleForm) {
      if(this.ruleForm.checked){//判断是否勾选记住用户名和密码一栏
            //  console.log('checked=true');
        this.setCookie(this.ruleForm.username, this.ruleForm.password, 7);//保存时间为7天
          }
      else{
           //  console.log('清空cookie');
         this.clearCookie();
       }
      // console.log(ruleForm);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // alert('submit!')
          api
            .getLogin({
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.code === 220) {
                // console.log("判断成功");
                var Authorization = res.data.Authorization;
                // console.log(Authorization);
                localStorage.setItem("Authorization", Authorization);
                this.$router.push({ path: "/filedetail" });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // submitForm() {
      //   console.log(this.ruleForm)
      //   api.getLogin({
      //     username: this.ruleForm.username,
      //     password: this.ruleForm.password,
      //   }).then(res=>{
      //     console.log(res)
      //   })
    },
    resetForm(ruleForm) {
      this.$refs.ruleForm.resetFields();
      this.ruleForm.username = "";
      this.ruleForm.password = "";
    },
     //设置cookie
     setCookie(username,password, exdays) {
         var exdate = new Date(); //获取时间
         exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
         //字符串拼接cookie
         window.document.cookie = "username" + "=" + username + ";path=/;expires=" + exdate.toGMTString();
         window.document.cookie = "password" + "=" + password + ";path=/;expires=" + exdate.toGMTString();
      },
     //获取cookie
      getCookie: function() {
          if (document.cookie.length > 0) {
              var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
              for (var i = 0; i < arr.length; i++) {
                  var arr2 = arr[i].split('='); //再次切割
                  //判断查找相对应的值
                 if (arr2[0] == 'username') {
                     this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                 } else if (arr2[0] == 'password') {
                     this.ruleForm.password = arr2[1];
                        }
                    }
                }
            },
       clearCookie: function() {
             this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello {
  width: 20%;
  magin: 0 auto;
  margin-top: 10%;
  position: absolute;
  right: 200px;
  top: 10%;
}
/deep/.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #fff;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
}
.title{
  font-size:36px
  font-family:"微软雅黑"
  color:white 
  margin-left:60%
  margin-top:10%
}
</style>
