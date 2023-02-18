<template>
  <div id="manage-main">
    <div id="manage-navbar">
      <Breadcrumb class="bread"></Breadcrumb>
        <div id="head" @mouseleave="noshow">
          <div id="head-img" @mouseover="showDisLogin">
          </div>
          <transition name="el-zoom-in-top">
            <div v-show="showed" id="box-main">
              <div id="setting" @click="openSetting">
                <span> <i class="el-icon-setting"></i> 系统设置</span>
              </div>
              <div id="dislogin">
                <span> <i class="el-icon-close"></i> 退出登录</span>
              </div>
            </div>
          </transition>
        </div>
    </div>
    <div id="manage-content">
      <div id="manage-listbar">
        <el-menu
            default-active="/manage/department"
            class="el-menu-vertical-demo"
            :router="true"
            style="height: 100vh"
            :unique-opened=true>
          <el-menu-item id="items">
            <i class="el-icon-s-grid"></i>
            <span id="items-text">员工管理系统</span>
          </el-menu-item>
          <el-menu-item index="/index">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user-solid"></i><span>员工管理</span>
            </template>
            <el-menu-item index="/manage/department">人员管理</el-menu-item>
            <el-menu-item index="/manage/post">岗位管理</el-menu-item>
            <el-menu-item index="/manage/reportForm">员工报表</el-menu-item>
            <el-menu-item index="/manage/power">用户权限</el-menu-item>
          </el-submenu>
          <el-menu-item>
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-document"></i><span>日志管理</span>
            </template>
            <el-menu-item index="/manage/operation">操作日志</el-menu-item>
            <el-menu-item to="/manage/logLogin">日志登录</el-menu-item>
          </el-submenu>
          <el-menu-item index="/system/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
        <Live2d></Live2d>
      </div>
      <div id="manage-text">
        <router-view></router-view>
      </div>
      <div id="setting-box">
        <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose">
          <span>我来啦!</span>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import Live2d from "@/components/Live2d.vue";

export default {
  name: "manage",
  components: {Live2d},
  mounted() {
    this.user = localStorage.getItem("username").toUpperCase()
    console.log(this.$router.Location)
  },
  data() {
    return {
      user: '',
      showed: false,
      drawer: false,
      direction: 'rtl',
    }
  },
  methods: {
    disLogin() {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      this.$router.push({
        path: '/'
      })
    },
    showDisLogin() {
      this.showed = true;
    },
    noshow(){
      this.showed = false
    },
    openSetting(){
      this.drawer = true
    }

  }
}
</script>

<style lang="less">
@import "@/assets/css/manage.less";
</style>