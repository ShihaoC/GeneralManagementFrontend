<template>
  <div id="404-box">

  </div>
</template>

<script>
import Global from "@/views/Global.vue";
export default {
  name: "404",
  mounted() {
    window.location.href = Global.baseUrl;
  }
}
</script>

<style>

</style>