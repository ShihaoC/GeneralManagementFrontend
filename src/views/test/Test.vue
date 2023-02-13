<template>
  <div>
    <div class="container">
      Your content here...
    </div>
    <a href="javascript:void(0)" @click="dis">123123</a>
    <canvas class="background"></canvas>
  </div>
</template>

<script>
export default {
  name: "Test",
  mounted() {

  },
  methods:{
    dis(){
      this.$router.push({path: '/'})
    }

  }
}
</script>

<style >
html, body { height: 100% }

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