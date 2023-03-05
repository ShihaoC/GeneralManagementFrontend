<template>
  <div>

  </div>
</template>

<script>
import service from "@/service";
export default {
  name: "music-comp",
  mounted() {
    service.DELETE("/log/del/1",null,resp=>{
      console.log(resp)
    })
  }
}
</script>

<style lang="less">

</style>