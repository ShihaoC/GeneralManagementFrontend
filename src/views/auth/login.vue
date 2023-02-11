<template>
  <div class="login-wrap">
    <el-from class="login-container">
      <h1 class="title">用户登录:</h1>
      <el-from-item>
        <el-input type="text" placeholder="账号" v-model="userName" autocomplete="off"></el-input>
      </el-from-item>
      <el-from-item>
        <el-input type="password" placeholder="密码" v-model="password" autocomplete="off"></el-input>
      </el-from-item>
        <el-row style="text-align: center;margin-top: -10px;">
          <el-link type="primary" @click="toRegister">用户注册</el-link>
          <el-link type="primary">忘记密码</el-link>
        </el-row>
    </el-from>
  </div>
</template>

<script>
import $ from 'jquery'


export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    doLogin: function () {
      let username = this.username;
      let password = this.password;
      console.log("username=%s,password=%s", username, password);
    },
    toRegister: function () {
      this.$router.push('/Register');
    }
  }
}
</script>

<style>
.login-wrap{
  box-sizing:border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background: url("@/assets/login.png");
  background-repeat: no-repeat;
  background-position: center right;
  background-size: contain;
}
.login-container{
  border-radius: 10px;
  margin: 0 auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>