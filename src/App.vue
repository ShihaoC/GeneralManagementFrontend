<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>


</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Sc;
  //transition: all 0.1s ease-in-out;
}
html {
  background-color: #ffffff;
  /* Or any color / image you want */
}

.el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #ebeef5;
}

::-webkit-scrollbar-thumb {
  background-color: #ebeef5;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 1);
}

@font-face {
  font-family: Sc;
  src: url("@/assets/font/test.woff2");
}




</style>

