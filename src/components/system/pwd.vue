<template>
  <div>
    <el-card style="width: 40vw" id="card">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="pass" :label-width="formLabelWidth">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass" :label-width="formLabelWidth">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item id="tj">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import service from "@/service";
import {Message} from "element-ui";
import Manage from "@/views/manage/manage.vue";

export default {

  name: "",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    let validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码最低六位'))
      }else {
        callback();

      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.checkPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        checkPassword: '',
      },
      formLabelWidth: '100px',
      rules: {
        pass: [
          {validator: validatePass, trigger: 'change'}
        ],
        checkPass: [
          {validator: validateCheckPass, trigger: 'change'}
        ],
        checkPassword: [
          {validator: validatePass2, trigger: 'change'}
        ],
      }
    };
  },
  methods: {
    submitForm() {
      if(this.ruleForm.pass && this.rules.checkPass && this.ruleForm.checkPassword){

        service.GET("/auth/updatePassword/" + localStorage.getItem("userid") + "?pass1=" + this.ruleForm.pass + "&pass2=" + this.ruleForm.checkPass, resp => {
          console.log(resp)
          if(resp.data.code === 400){
            this.$message.error(resp.data.msg)
          }else {
            this.$message.success('修改成功请重新登录')
            this.disLogin()
          }
        })
      }else {
        this.$refs.ruleForm.validate()
        this.$message.warning("请检查表单内容")
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    disLogin() {
      localStorage.removeItem("username")
      localStorage.removeItem("password")
      localStorage.removeItem("authorization")
      localStorage.removeItem("image")
      localStorage.removeItem("userid")
      localStorage.removeItem("role_id")
      this.$router.push({
        path: '/'
      })
    },
  }

}
</script>

<style scoped>
#card {
  width: 40vw;
  margin: 2vh 0 0 1vw;
}

#tj {
  margin: 0 0 0 8vw;
  /*text-align: center;*/

}


</style>