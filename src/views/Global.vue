<template>

</template>

<script>
import axios from "axios";

const canvColor = "#409eff";
const canvSpeed = "0.2";
// const baseUrl = "http://localhost:8848";
const baseUrl = "http://39.106.16.171:8848";

let newAxios = axios.create({
  baseURL: baseUrl
})

export default {
  baseUrl,
  canvColor,
  canvSpeed,
  newAxios
}
</script>

<style scoped>

</style>