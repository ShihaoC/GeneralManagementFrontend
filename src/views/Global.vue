<template>

</template>

<script>
import axios from "axios";

const canvColor = "#409eff";
const canvSpeed = "0.2";
const baseUrl = "http://localhost:8848";
// const baseUrl = "http://39.106.16.171:8848";
// const baseUrl = "http://172.20.10.2:8848";

let newAxios = axios.create({
  baseURL: baseUrl
})

const service = axios.create({
  baseURL: baseUrl
})


let check = (code)=>{
  if(code === 200){
    this.$message.success("成功")
  }else if(code === 404){
    this.$message.warning("未找到")
  }else if(code === 500){
    this.$message.error("服务器错误,请检查表单参数")
  }else if(code === 330){
    this.$message.error("已经存在")
  }else if(code === 340){
    this.$message.error("不存在")
  }
}
export default {
  baseUrl,
  canvColor,
  canvSpeed,
  newAxios,
  check
}
</script>

<style scoped>

</style>