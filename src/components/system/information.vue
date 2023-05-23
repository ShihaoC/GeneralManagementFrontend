<template>
  <div id="infomation-main">
    <div id="top-bar">
      <el-menu router :default-active="action" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/information/person">修改信息</el-menu-item>
        <el-menu-item index="/information/pwd">修改密码</el-menu-item>
      </el-menu>
    </div>
    <div id="view">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeIndex: 1,
      action: this.$route.path
    }

  },
  methods: {
    handleSelect(key, keyPath) {

    },
  }
}
</script>

<style>
#infomation-main {
  width: 100%;
  height: 100%;
}

#top-bar {
  width: 100%;
  /*height: ;*/
}

#view {
  width: 40%;
  height: 90%;
}
</style>