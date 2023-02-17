<template>
  <div id="manage-main">
    <div id="manage-content-Title">
      <span>员工管理系统</span>
    </div>
    <div id="manage-navbar">
      <div id="manage-navbar-user" @mouseover="showDisLogin" @mouseleave="disShowLogin">
        {{ user }}
        <transition name="el-zoom-in-top">
          <div id="user-list" v-show="showed">
            <a href="javascript:void(0)" style="color: white;text-decoration: none">
              <div id="user-list-button" @click="disLogin">注销</div>
            </a>
          </div>
        </transition>
      </div>
    </div>
    <div id="manage-content">

      <div id="manage-listbar">
        <el-row class="tac" >
          <el-col :span="12" unique-opened="true" style="width: 100%;">
            <el-menu
                default-active="/manage/department"
                class="el-menu-vertical-demo"
                :router="true"
            style="height: 94vh">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-user-solid"></i><span>员工管理</span>
                </template>
                <el-menu-item index="/manage/department">员工部门</el-menu-item>
                <el-menu-item index="/manage/post">岗位管理</el-menu-item>
                <el-menu-item index="/manage/reportForm">员工报表</el-menu-item>
                <el-menu-item index="/manage/power">用户权限</el-menu-item>
              </el-submenu>
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title"><i class="el-icon-document"></i><span>日志管理</span>
                </template>
                <router-link to="/manage/operation">
                  <el-menu-item>操作日志</el-menu-item>
                </router-link>
                <router-link to="/manage/logLogin">
                  <el-menu-item>日志登录</el-menu-item>
                </router-link>
              </el-submenu>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
        <Live2d></Live2d>
        <!--        -->

      </div>
      <div id="manage-text">
        <router-view></router-view>
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
  },
  data() {
    return {
      user: '',
      showed: false
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
    showDisLogin(){
      this.showed = true
    },
    disShowLogin(){
      this.showed = false
    }

  }
}
</script>

<style lang="less">
@import "@/assets/css/manage.less";
</style>