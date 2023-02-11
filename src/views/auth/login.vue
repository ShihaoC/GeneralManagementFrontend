<template>
  <div id="login-main">
    <h1>Login</h1>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  name: "login",
  mounted() {
    $("title").text("登录")
  }
}
</script>

<style>

</style>