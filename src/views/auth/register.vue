<template>
  <div id="register-main">

    <div class="register-wrap">
      <el-form :model="formData" :rules="rule" ref="ruleForm" class="register-container">
        <h1 class="register-title">注册</h1>
        <el-form-item prop="username">
          <el-input type="text" placeholder="用户账号" v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="用户密码" v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password1">
          <el-input type="password" placeholder="确认密码" v-model="formData.password1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doRegister" style="width: 48%;">注册</el-button>
          <el-button type="primary" @click="toLogin" style="width: 48%;">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  name: "register",
  data: function () {
    let password1 = (rule, value, callback)=>{
      if(!value){
        callback(new Error("密码不能为空"))
      }else {
        if(value !== this.formData.password){
          callback(new Error("两次密码不正确"))
        }else {
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
      rule: {
        username: [
          {required: true, message: '请输入活动名称', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
        password1: [
          {validator: password1,trigger: 'blur'}
        ]

      },
    }
  },
  methods: {
    doRegister: function () {

    },
    toLogin: function () {
      this.$router.push("/auth/login")
    }
  }
}

</script>

<style lang="less">
#register-main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: url("@/assets/img/bg1.png") no-repeat;
  background-size: cover;
}

.register-wrap {
  margin: 20vh 0 0 0;
  padding: 2vw;
  width: 25%;
  height: 40%;
  border-radius: 8px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

.register-title {
  text-align: center;
  font-size: 32px;
  margin: 0 0 1vh 0;
}
</style>