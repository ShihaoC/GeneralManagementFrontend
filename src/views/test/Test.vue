<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input v-model="form.department"></el-input>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Test",
  data(){
    return{
      form: {
        name: '',
        phone: '',
        department: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      this.axios.post("http://localhost:8848/em/insert_employee",this.form).then((resp)=>{
        console.log(resp.data)
      })
    }

  }
}
</script>

<style>
html, body {
  height: 100%
}

body {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 50px;
  background-color: #fff;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.02);
}

.background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
</style>