<template>
  <div id="image" v-loading="loading">

  </div>
</template>

<script>
import $ from 'jquery'
import service from "@/service";

export default {
  name: "himg",
  props: ["image", "userid"],
  data() {
    return {
      image_url: '',
      loading: false
    }
  },
  watch: {
    image(curVal, oldVal) {
      this.image_url = curVal
      console.log(this.image_url)
      $("#image").css({
        "background": "url(" + curVal + ") no-repeat top",
        "background-size": "cover"
      })
      this.loading = false
      console.log(curVal)
      console.log(oldVal)
    }
  },
  mounted() {
    this.loading = true
    setTimeout(() => {
      console.log(this.image_url)
      $("#image").css({
        "background": "url(" + this.image_url + ") no-repeat top",
        "background-size": "cover"
      })
      this.loading = false
    }, 1000)

  },
  destroyed() {

  }
}
</script>

<style>
#image {
  width: 200px;
  height: 200px;
  background: no-repeat center;
  background-size: cover;

}
</style>