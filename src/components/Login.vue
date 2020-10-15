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
        username: "boom",
        password: "boom",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(ruleForm) {
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
                console.log("判断成功");
                this.$router.push({ path: "/main" });
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
