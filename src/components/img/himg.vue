<template>
  <div id="image">

  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "himg",
  props: ["image"],
  mounted() {
    setTimeout(()=>{
      $("#image").css({
        "background":"url("+this.image+") no-repeat top",
        "background-size":"cover"
      })
    },100)
  },
  destroyed() {

  }
}
</script>

<style>
  #image{
    width: 200px;
    height: 200px;
    background:  no-repeat center;
    background-size: cover;

  }
</style>