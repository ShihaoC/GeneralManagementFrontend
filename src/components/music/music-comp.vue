<template>
  <div>

  </div>
</template>

<script>
import service from "@/service";
export default {
  name: "music-comp",
  data(){
    return{
      ll: []
    }
  },
  mounted() {
    service.GET("/log/getLogs?module=&page=1",resp=>{
      this.ll = resp.data.data.limit_data
      console.log(this.ll)
    })
    setTimeout(()=>{
      service.DELETE("/log/del",this.ll,resp=>{
        console.log(resp)
      })
    },1000)
  }
}
</script>

<style lang="less">

</style>