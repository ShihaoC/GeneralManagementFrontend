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
import particles_js from 'particles.js'
import particles from 'particlesjs'
import qs from 'qs'
import service from "@/service";
import particles_config from '@/static/config/particles_config.json'

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
    // particlesJS("login-main", particles_config);
    canv = particles.init({
      selector: '#canv',
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
      console.log(this.loginForm.username)
      console.log(this.loginForm.password)
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.warning("用户名密码不能为空")
        return
      }
      service.POST("/login?"+qs.stringify(this.loginForm),null,resp=>{
        console.log(resp)
        if(resp.data.data === "账户停用"){
          this.$message.error(resp.data.data)
          return
        }
        if (resp.data.data != null) {
          localStorage.setItem("username ", this.loginForm.username)
          // localStorage.setItem("password", this.loginForm.password)
          localStorage.setItem("Authorization", resp.headers['authorization'])
          localStorage.setItem("image",resp.headers['image'])
          localStorage.setItem("userid",resp.headers['userid'])
          localStorage.setItem("role_id",resp.headers['role_id'])
          console.log(resp.headers['image'])
          console.log(resp.headers['authorization'])
          this.$router.push({path: '/index'})
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
    background: rgba(255,255,255,0.2);
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