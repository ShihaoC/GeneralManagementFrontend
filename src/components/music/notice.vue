<template>
  <div id="big-box" v-show="showdd">
    <transition name="el-zoom-in-center">
      <div id="notice-container" v-show="showd">
        <div id="title">公告</div>
        <el-carousel trigger="click" height="30vh" :autoplay="false">
          <el-carousel-item v-for="item in notices" :key="item.id">
            <NoticeItem :text="item.context" :name="'sss-'+item.id"></NoticeItem>
          </el-carousel-item>
        </el-carousel>
        <div id="footer">
          <el-button type="primary" @click="hide">知道了</el-button>

        </div>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: "notice",
  props: ["notices"],
  data() {
    return {
      showd: true,
      showdd: false
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.notices.length)
      console.log(this.notices)
      if (this.notices.length !== 0) {
        this.showdd = true
      }
    }, 100)
  },
  methods: {
    hide() {
      this.showd = false
      setTimeout(() => {
        this.showdd = false
      }, 500)
    }
  }

}
</script>

<style lang="less">
#big-box {
  top: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-carousel__item {
  background-color: #e6e6e6;
}

#footer {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}


#notice-cropper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}


#notice-container {
  width: 30vw;
  height: 50vh;
  padding: 0 1vw 0 1vw;
  border-radius: 8px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 9999;

  #title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2vw;
    font-weight: bold;
    width: 100%;
    height: 10vh;
  }
}
</style>