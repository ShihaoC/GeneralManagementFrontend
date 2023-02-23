<template>
  <div id="manage-main">
    <div id="manage-navbar">
      <Breadcrumb class="bread"></Breadcrumb>
      <div id="open">
        <ul>
        </ul>
      </div>
      <div id="weather">
        <ul>
          <li>
            <i class="iconfont icon-fullscreen"></i>
          </li>
          <li>
            <i class="iconfont icon-gitee-fill-round"></i>
          </li>
          <li>
            <i class="iconfont icon-github-fill"></i>
          </li>
          <li>
            时间: {{ time }}
          </li>
          <li>
            温度: {{ temp }}℃
          </li>
          <li>
            湿度: {{ humidity }} %
          </li>
          <li>
            风力: {{ windScale }} 级
          </li>
          <li>
            风向: {{ windDir }}
          </li>
        </ul>
      </div>
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
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :router="true"
            style="height: 100vh;"
            :unique-opened=true
            >
          <el-menu-item id="items" index="/index">
            <i class="el-icon-s-grid"></i>
            <span id="items-text">员工管理系统</span>
          </el-menu-item>
          <el-menu-item index="/index" id="itemss">
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
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-data-analysis"></i> <span>系统监控</span></template>
            <el-menu-item index="/system/resource">
              <span slot="title">资源概览</span>
            </el-menu-item>
            <el-menu-item index="3">
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
                    @change="kanban"
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
import axios from "axios";
import Global from "@/views/Global.vue";
import $ from 'jquery'

let newAxios = axios.create({
  baseURL: Global.baseUrl
})

export default {
  name: "manage",
  components: {Live2d},
  mounted() {
    if(this.$route.path === '/index' || $("#itemss").focus){
      $("#items").css({
        "color":"#000000"
      })
      $(".el-icon-s-grid").css({
        "color":"#909399"
      })
    }
    console.log("123" + localStorage.getItem("kanbanniang"))
    if (localStorage.getItem("kanbanniang")) {

      if (localStorage.getItem("kanbanniang") === 'true') {
        this.kanbanniang = true
      } else {
        this.kanbanniang = false
      }
    } else {
      this.kanbanniang = true
    }
    this.user = localStorage.getItem("username").toUpperCase()
    console.log(this.$router.Location)
    this.init()
  },
  data() {
    return {
      user: '',
      showed: false,
      drawer: false,
      direction: 'rtl',
      kanbanniang: false,
      collapse1: false,
      time: '00:00',
      temp: '-',
      humidity: '-',
      windScale: '-',
      windDir: '-'
    }
  },
  methods: {
    disLogin() {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("password")
      localStorage.removeItem("auth")
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
    },
    gettime() {
      let date = new Date();
      let hour = '';
      let minute = '';
      if ((hour = date.getHours()) < 10) {
        hour = "0" + hour;
      }
      if ((minute = date.getMinutes()) < 10) {
        minute = "0" + minute;
      }

      return hour + ":" + minute
    },
    getWeather() {
      newAxios.get("/api/weather").then((resp) => {
        this.temp = resp.data.data.temp
        this.humidity = resp.data.data.humidity
        this.windScale = resp.data.data.windScale
        this.windDir = resp.data.data.windDir
      })
    },
    kanban(a) {
      localStorage.setItem("kanbanniang", a)
    },
    init() {
      setTimeout(() => {
        setInterval(() => {
          this.time = this.gettime()
        }, 1000 * 60)
        this.time = this.gettime()
        this.getWeather();
      }, 1000)
    },
    checkAuth(){
      if(localStorage.getItem("auth") === 'root'){

      }else {
        return
      }
    }

  }
}
</script>

<style lang="less">
@import "@/assets/css/manage.less";
</style>