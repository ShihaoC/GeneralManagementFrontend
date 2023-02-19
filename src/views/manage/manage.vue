<template>
  <div id="manage-main">
    <div id="manage-navbar">
      <Breadcrumb class="bread"></Breadcrumb>
      <div id="head" @mouseleave="noshow">
        <div id="head-img" @mouseover="showDisLogin">
        </div>
        <transition name="el-zoom-in-top">
          <div v-show="showed" id="box-main">
            <div id="user" @click="">
              <span> <i class="el-icon-user"></i> 个人中心 </span>
            </div>
            <div id="setting" @click="openSetting">
              <span> <i class="el-icon-setting"></i> 系统设置</span>
            </div>
            <div id="dislogin" @click="disLogin">
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
            <template slot="title"><i class="el-icon-user-solid"></i><span>系统管理</span>
            </template>
            <el-menu-item index="/manage/department">人员管理</el-menu-item>
            <el-menu-item index="/manage/post">岗位管理</el-menu-item>
            <el-menu-item index="/manage/power">角色管理</el-menu-item>
            <el-menu-item index="/manage/reportForm">员工报表</el-menu-item>
          </el-submenu>
          <el-submenu>
            <template slot="title"> <i class="el-icon-data-analysis"></i> <span>系统监控</span> </template>
            <el-menu-item>
              <span slot="title">资源概览</span>
            </el-menu-item>
            <el-menu-item>
              <span slot="title">数据库概览</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-document"></i><span>日志管理</span>
            </template>
            <el-menu-item index="/manage/operation">操作日志</el-menu-item>
            <el-menu-item to="/manage/logLogin">日志登录</el-menu-item>
          </el-submenu>
        </el-menu>
        <transition name="el-fade-in">
          <Live2d v-show="kanbanniang"></Live2d>
        </transition>
      </div>
      <div id="manage-text">
        <router-view></router-view>
      </div>
      <div id="setting-box">
        <el-drawer
            :size="400"
            :visible.sync="drawer"
            :direction="direction"
            :with-header="false">
          <div id="drawer-title">
            <span>系统设置</span>
          </div>
          <div id="drawer-settings">
            <ul>
              <li>
                <span class="drawer-settings-item">看板娘设置</span>
                <el-switch
                    v-model="kanbanniang"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    id="kanbanniang-btn">
                </el-switch>
              </li>
            </ul>
          </div>
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
      kanbanniang: true,
      collapse1: false
    }
  },
  methods: {
    disLogin() {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("password")
      this.$router.push({
        path: '/'
      })
    },
    showDisLogin() {
      this.showed = true;
    },
    noshow() {
      this.showed = false
    },
    openSetting() {
      this.drawer = true
    },
    collapse() {
      if (this.collapse1) {
        this.collapse1 = false
      } else {
        this.collapse1 = true
      }
    }

  }
}
</script>

<style lang="less">
@import "@/assets/css/manage.less";
</style>