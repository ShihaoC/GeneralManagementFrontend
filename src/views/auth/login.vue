<template>
  <div id="login-main">
    <canvas class="canv" id="canv" v-show="true"></canvas>
    <div id="login-wrap">
      <el-form :model="loginForm" id="login-container" ref="ruleForm" :rules="rule">
        <h1 id="login-title">登录</h1>
        <el-form-item></el-form-item>
        <el-form-item prop="username">
          <el-input type="text" placeholder="用户账号" @keydown.enter.native="login()" v-model="loginForm.username"
                    name="username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="用户密码" @keydown.enter.native="login()" v-model="loginForm.password"
                    name="password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width: 48%;">登录</el-button>
          <el-button type="primary" @click="register" style="width: 48%;">去注册</el-button>
        </el-form-item>
      </el-form>
      <div id="login-yiyan" v-loading="loading" style="text-align: center">
        <span id="login-yiyan" style="font-size: 8px">{{ yiyan }} --{{ yiyan_from }}</span>
      </div>
    </div>
  </div>

</template>

<script>
import Global from "@/views/Global.vue";
import axios from "axios";
import particles from 'particlesjs'

let canv = null;

const newAxios = axios.create({
  baseURL: Global.baseUrl
})

export default {
  name: 'Login',
  mounted() {
    this.loading = true
    if (localStorage.getItem("username")) {
      this.loginForm.username = localStorage.getItem("username")
      this.loginForm.password = localStorage.getItem("password")
    }
    this.axios.get("https://v1.hitokoto.cn/").then((resp) => {
      this.yiyan = resp.data.hitokoto
      this.yiyan_from = resp.data.from
      this.loading = false
    })
    canv = particles.init({
      selector: '#canv',
      connectParticles: true,
      color: Global.canvColor,
      speed: Global.canvSpeed
    });

  },
  beforeDestroy() {
    canv.destroy()

  },
  data: function () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      yiyan: '',
      yiyan_from: '',
      loading: false,
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
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.warning("用户名密码不能为空")
        return
      }

      newAxios.post("/auth/login", this.loginForm).then((resp) => {

        if (resp.data.data != null) {
          this.$router.push({path: '/manage/department'})
        } else {
          this.$message.error("用户名密码不正确")
        }
      })
    },
    register() {
      this.$router.push({
        path: '/auth/register'
      })
    }
  }
}
</script>

<style lang="less">
.canv {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: 0;
}

#login-main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-size: cover;

  #login-wrap {
    margin: 20vh 0 0 0;
    padding: 2vw;
    width: 600px;
    height: 400px;
    border-radius: 8px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
  }

  #login-title {
    text-align: center;
    font-size: 32px;
    margin: 0 0 1vh 0;
  }

  #login-yiyan {
    display: flex;
    justify-content: center;
  }

  #login-yiyan:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: #a6a6a6;
    bottom: 2.5vh;
    margin: 0 auto;
    transition: all 0.5s;
  }

  #login-yiyan:hover:after {
    width: 80%;
  }
}

</style>