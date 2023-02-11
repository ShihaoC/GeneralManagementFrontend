<template>
  <div class="login-wrap">
    <el-form :model="loginForm" class="login-container" ref="ruleForm" :rules="rule">
      <h1 class="login-title">登录</h1>
      <el-form-item></el-form-item>
      <el-form-item prop="username">
        <el-input type="text" placeholder="用户账号" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="用户密码" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toLogin" style="width: 48%;">登录</el-button>
        <el-button type="primary" @click="register" style="width: 48%;">去注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import $ from 'jquery'


export default {
  name: 'Login',
  data: function () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rule: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {

    },
    register() {
      this.$router.push({
        path: '/auth/register'
      })
    }
  }
}
</script>

<style>
.login-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: url("@/assets/img/bg1.png") no-repeat;
  background-size: cover;
}

.login-container {
  width: 500px;
  height: 400px;
  padding: 2vw;
  margin: 20vh 0 0 0;
  border-radius: 8px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

.login-title {
  text-align: center;
  font-size: 32px;
  margin: 0 0 1vh 0;
}
</style>