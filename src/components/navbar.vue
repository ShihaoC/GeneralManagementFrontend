<template>
  <div id="manage-main">
    <div id="manage-navbar">

    </div>
    <div id="manage-content">
      <div id="manage-listbar">

      </div>
      <div id="manage-text">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style lang="less">
#manage-main{
  width: 100vw;
  height: 100vh;
  #manage-navbar{
    width: 100vw;
    height: 6vh;
    background: #409eff;
  }
  #manage-content{
    display: flex;
    width: 100vw;
    height: 94vh;
    position: relative;
    #manage-listbar{
      width: 10vw;
      height: 100%;
      background: #dcdfe6;
    }
  }
}
</style>