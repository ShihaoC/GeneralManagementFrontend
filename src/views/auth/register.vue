<template>
  <div id="register-main">
    <canvas class="canv" id="canv" v-show="true"></canvas>
    <div class="register-wrap">
      <el-form :model="formData" :rules="rule" ref="ruleForm" class="register-container">
        <h1 class="register-title">注册</h1>
        <el-form-item prop="username">
          <el-input type="text" placeholder="用户账号" @keyup.enter.native="register" v-model="formData.username"
                    name="username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="用户密码" @keyup.enter.native="register" v-model="formData.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password1">
          <el-input type="password" placeholder="确认密码" @keyup.enter.native="register" v-model="formData.password1"
                    name="password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register" style="width: 48%;">注册</el-button>
          <el-button type="primary" @click="login" style="width: 48%;">返回登录</el-button>
        </el-form-item>
      </el-form>
      <div id="register-yiyan" v-loading="loading" style="text-align: center">
        <span id="register-yiyan" style="font-size: 8px">{{ yiyan }} --{{ yiyan_from }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Global from "@/views/Global.vue";
import axios from "axios";
import particles from 'particlesjs'

const newAxios = axios.create({
  baseURL: Global.baseUrl
})

let canv = null;

export default {
  name: "register",
  mounted() {
    this.loading = true
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
    let password1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"))
      } else {
        if (value !== this.formData.password) {
          callback(new Error("两次密码不正确"))
        } else {
          callback()
        }
      }
    }
    return {
      formData: {
        username: '',
        password: '',
        password1: '',
      },
      yiyan: '',
      yiyan_from: '',
      loading: false,
      rule: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 5, message: '最少5个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, message: '密码最少6位', trigger: 'blur'}
        ],
        password1: [
          {validator: password1, trigger: 'blur'}
        ]

      },
    }
  },
  methods: {
    register() {
      if (this.formData.username === '' || this.formData.password === '' || this.formData.password1 === '') {
        this.$message.warning("用户名密码或密码不能为空")
        return;
      }
      if(!(this.formData.password == this.formData.password1)){
        this.$message.warning("两次密码不同")
        return;
      }
      newAxios.post("/auth/register", {
        username: this.formData.username,
        password: this.formData.password1
      }).then((resp) => {
        if(resp.data.code === 330){
          this.$message.warning("已经存在此账号")
        }else if(resp.data.code === 200){
          localStorage.setItem("username", this.formData.username)
          localStorage.setItem("password", this.formData.password1)
          this.$router.push({path: '/'})
          console.log(resp.data)
        }
      })
    },
    login() {
      this.$router.push("/")
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

#register-main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  //background: url("@/assets/img/bg1.png") no-repeat;
  background-size: cover;
}

.register-wrap {
  margin: 20vh 0 0 0;
  padding: 2vw;
  width: 30vw;
  height: 40vh;
  border-radius: 8px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

.register-title {
  text-align: center;
  font-size: 32px;
  margin: 0 0 1vh 0;
}

#register-yiyan {
  display: flex;
  justify-content: center;
}

#register-yiyan:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background: #a6a6a6;
  bottom: 2.5vh;
  margin: 0 auto;
  transition: all 0.5s;
}

#register-yiyan:hover:after {
  width: 80%;
}
</style>