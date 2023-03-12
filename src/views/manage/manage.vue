<template>
  <div id="manage-main" v-loading="fullscreenLoading">
    <div id="manage-navbar">
      <Breadcrumb class="bread"></Breadcrumb>
      <div id="weather">
        <ul>
          <li class="top_item">
            <i id="full-screen" @click="full" class="iconfont icon-fullscreen top-item"></i>
          </li>
          <li>
            <i id="gitee" class="iconfont icon-gitee-fill-round"></i>
          </li>
          <li>
            <i id="github" class="iconfont icon-github-fill"></i>
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
              <span> <router-link id="link" to="/manage/power"><i class="el-icon-user"></i> 个人中心</router-link>   </span>
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
          <el-menu-item id="items" index="/index" @click="check()">
            <i class="el-icon-s-grid"></i>
            <span id="items-text">员工管理系统</span>
          </el-menu-item>
          <navbar :items="items"></navbar>
        </el-menu>
        <transition name="el-fade-in">
          <Live2d v-show="kanbanniang"></Live2d>
        </transition>
      </div>
      <div id="manage-text">


        <!--        首页-->
        <div v-show="index_show" id="index-main">
          <h1></h1>
        </div>
        <!--        首页-->


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
                <span class="drawer-settings-item">头像设置</span>
                <el-upload
                    :on-success="reload_head"
                    class="upload-demo"
                    :action="uploadURL"
                    multiple
                    :limit="1"
                    :file-list="fileList"
                    :show-file-list="false">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </li>
                <li></li>
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
import service from "@/service";
import $ from 'jquery'
import screenfull from "screenfull";


export default {
  name: "manage",
  components: {Live2d},
  mounted() {
    this.fullscreenLoading = true
    service.GET("/user/headImage/" + localStorage.getItem("userid"), resp => {
      $("#head-img").css({
        "height": "2.5vw",
        "background": "url(" + resp.data.data + ") no-repeat",
        "background-size": "cover",
        "border-radius": "8px",
        "border": "1px solid #e6e6e6"
      })
    })
    if (this.$route.path === '/index' || $("#itemss").focus) {
      $("#items").css({
        "color": "#000000"
      })
      $(".el-icon-s-grid").css({
        "color": "#909399"
      })
    }
    if (this.$route.path !== '/index') {
      this.index_show = false
    }
    if (localStorage.getItem("kanbanniang")) {

      if (localStorage.getItem("kanbanniang") === 'true') {
        this.kanbanniang = true
      } else {
        this.kanbanniang = false
      }
    } else {
      this.kanbanniang = true
    }
    this.init()
    this.uploadURL = 'http://localhost:8848/user/uploadImage/' + localStorage.getItem("userid")
    this.fullscreenLoading = false
    service.GET("/menu/menus/+"+localStorage.getItem("role_id"),resp=>{
      this.items = resp.data.data
    })
  },
  data() {
    return {
      items: [],
      fullscreenLoading: false,
      uploadURL: '',
      index_show: true,
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
      windDir: '-',
      fileList: []
    }
  },
  methods: {
    reload_head() {
      this.fullscreenLoading = true
      this.fileList = []
      service.GET("/user/headImage/" + localStorage.getItem("userid"), resp => {
        $("#head-img").css({
          "height": "2.5vw",
          "background": "url(" + resp.data.data + ") no-repeat",
          "background-size": "cover",
          "border-radius": "8px",
          "border": "1px solid #e6e6e6"
        })
        this.fullscreenLoading = false
        this.drawer = false
      })
      this.$message.success("修改成功")


    },
    check() {
      if (this.$route.path !== '/index') {
        this.index_show = false
      } else {
        this.index_show = true
      }
    },
    full() {
      if (!screenfull.isFullscreen) {
        $("#full-screen").removeClass("iconfont icon-fullscreen top-item").addClass("iconfont icon-fullscreen-exit top-item")
      } else {
        $("#full-screen").removeClass("iconfont icon-fullscreen-exit top-item").addClass("iconfont icon-fullscreen top-item")

      }

      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        this.$message.error("您的浏览器不支持全屏")
      }
    },
    disLogin() {
      localStorage.removeItem("username")
      localStorage.removeItem("password")
      localStorage.removeItem("authorization")
      localStorage.removeItem("image")
      localStorage.removeItem("userid")
      localStorage.removeItem("role_id")
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
      service.GET("/api/weather", resp => {
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
    checkAuth() {
      if (localStorage.getItem("auth") === 'root') {

      } else {
        return
      }
    }

  }
}
</script>

<style lang="less">
@import "@/assets/css/manage.less";
</style>