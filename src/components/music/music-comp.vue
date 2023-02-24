<template>
  <div id="music-main">
    <div id="contant">

    </div>
  </div>
</template>

<script>
import service from '@/service'
export default {
  name: "music-comp",
  mounted() {
    service.get("/test/test2",(resp)=>{
      console.log(resp)
    });
  }
}
</script>

<style lang="less">
#music-main {
  width: 30vw;
  height: 20vh;
  background: red;
  padding: 1vw;

  #contant {
    width: 10vw;
    height: 10vw;
    background: black;
  }
}
</style>