<template>
  <div id="manage-main" v-loading="fullscreenLoading">
    <div id="manage-navbar">
      <Breadcrumb class="bread"></Breadcrumb>
      <div id="weather">
        <ul>
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
            <li class="top_item">
              <i id="full-screen" @click="full" class="iconfont icon-fullscreen top-item"></i>
            </li>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Gitee代码开源" placement="bottom">
            <li @click="openGitee()">
              <i id="gitee" class="iconfont icon-gitee-fill-round"></i>
            </li>
          </el-tooltip>

          <!--          <li @click="openGithub()">-->
          <!--            <i id="github" class="iconfont icon-github-fill"></i>-->
          <!--          </li>-->
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
            <router-link id="link" to="/information/person">
            <div id="user" @click="">
              <span> <i
                  class="el-icon-user"></i> 个人中心   </span>
            </div>
            </router-link>
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
            <span id="items-text">{{Title}}</span>
          </el-menu-item>
          <navbar :items="items"></navbar>
          <!--          <NavMenu :navlist="items"></NavMenu>-->
        </el-menu>
        <transition name="el-fade-in">
          <Live2d v-show="kanbanniang"></Live2d>
        </transition>
      </div>
      <div id="manage-text">


        <!--        首页-->
        <div v-show="index_show" id="index-main">
          <div id="textMain">
            <div id="textLeft">
              <el-card style="width: 35vw" shadow="hover">
                <template>
                  <h2>通用管理后台</h2>
                  <el-divider></el-divider>
                  <span style="margin:  0 0 0 2vw">
<!--                    一直想做一款后台管理系统，看了很多优秀的开源项目但是发现没有合适自己的。于是利用空闲休息时间开始自己写一套后台系统。如此有了员工管理系统，她可以用于所有的Web应用程序，如网站管理后台，网站会员中心，CMS，CRM，OA等等，当然，您也可以对她进行深度定制，以做出更强系统。所有前端后台代码封装过后十分精简易上手，出错概率低。同时支持移动客户端访问。系统会陆续更新一些实用功能。-->
                      崔崔的面板qwq
                  </span>
                </template>
              </el-card>
            </div>
            <div id="textRight">
              <el-card style="width: 35vw" shadow="hover">
                <div class="left">
                  <h2>后端技术</h2>
                  <el-divider></el-divider>
                  Redis<br/>
                  JWT<br/>
                  MySQL<br/>
                  OSS<br/>
                  FastJSON<br/>
                  SpringBoot<br/>
                  Myabtis-Plus<br/>
                  &nbsp;
                </div>
                <div class="right">
                  <h2>前端技术</h2>
                  <el-divider></el-divider>
                  <span>
                    Vue<br/>
                    Vuex<br/>
                    Router<br/>
                    Axios<br/>
                    Element-UI<br/>
                    Less<br/>
                    Scss<br/>
                    particles.js<br/>
                  </span>
                </div>
              </el-card>

            </div>
          </div>
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
              <!--              <li>-->
              <!--                <span class="drawer-settings-item">头像设置</span>-->
              <!--                <el-upload-->
              <!--                    :on-success="reload_head"-->
              <!--                    class="upload-demo"-->
              <!--                    :action="uploadURL"-->
              <!--                    multiple-->
              <!--                    :limit="1"-->
              <!--                    :file-list="fileList"-->
              <!--                    :show-file-list="false">-->
              <!--                  <el-button size="small" type="primary">点击上传</el-button>-->
              <!--                </el-upload>-->
              <!--              </li>-->
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
              <li>
                <span class="drawer-settings-item">公告设置</span>
                <el-switch
                    @change="gonggao1"
                    v-model="gonggao"
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
    <Notice :notices="notices"></Notice>

  </div>
</template>

<script>
import Live2d from "@/components/Live2d.vue";
import service from "@/service";
import $ from 'jquery'
import screenfull from "screenfull";
import config from '@/config/config'


export default {
  name: "manage",
  components: {Live2d},
  watch: {
    $route(to, from) {
      if (to.path == '/index') {
        this.index_show = true
      } else {
        this.index_show = false
      }
    }
  },
  mounted() {
    this.Title = config.title;
    this.fullscreenLoading = true
    service.GET("/user/headImage/" + localStorage.getItem("userid"), resp => {
      $("#head-img").css({
        "height": "2.5vw",
        "background": "url(" + resp.data.data + ") no-repeat",
        "background-size": "cover",
        "background-position": "center",
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
    service.GET("/menu/menus/+" + localStorage.getItem("role_id"), resp => {
      console.log(resp)
      this.items = resp.data.data
    })
    service.GET("/Notice/getAllNotice", resp => {
      this.notices = resp.data.data
      console.log(resp.data.data)
    })
    if (localStorage.getItem("noticeEnable")) {
      if (localStorage.getItem('noticeEnable') === 'true') {
        this.gonggao = true
      } else {
        this.gonggao = false
      }
    }

    console.log(localStorage.getItem("noticeEnable"))
  },
  data() {
    return {
      Title: "",
      gonggao: false,
      notices: [],
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
          "background-position": "center",
          "border-radius": "8px",
          "border": "1px solid #e6e6e6"
        })
        this.fullscreenLoading = false
        this.drawer = false
      })


    },
    gonggao1() {
      console.log(this.gonggao)
      localStorage.setItem("noticeEnable", this.gonggao)
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
    },
    openGitee() {
      window.location.href = "https://gitee.com/CUICUI233/employee-manage-back-end-open";
    },
    openGithub() {

    }

  }
}
</script>

<style lang="less">
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

//------------------wws--------------------
#textLeft {
  margin: 0vw 1vw 0 1vw;
  float: left;
  //height: 20vh;
}

#textRight {
  margin: 1vw 10vw 0 0;
  //height: 3vh;
}


.left {
  width: 15vw;
  //height: 10.5vw;
  float: left;

}


@import "@/assets/css/manage.less";
</style>