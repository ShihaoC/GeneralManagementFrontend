<template>
  <div id="person-main">
    <div id="left">

      <el-card style="width: 40vw" id="card">
        <el-upload
            class="avatar-uploader"
            :action="actionURL"
            :show-file-list="false"
            :on-success="reloadHead"
            style="text-align: center; margin: 10px"
        >
          <himg v-show="himgshow" :image="image_url"></himg>

          <i v-show="!himgshow" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form>
          <el-form-item label="用户名:" :label-width="formLabelWidth">
            <el-input v-model="from.username" autocomplete="off" class="ssBox" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称:" :label-width="formLabelWidth">
            <el-input v-model="from.nick_name" autocomplete="off" class="ssBox"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" :label-width="formLabelWidth">
            <el-input v-model="from.phone" autocomplete="off" class="ssBox"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button type="primary" @click="modify">确 定</el-button>
        </div>


      </el-card>
    </div>

  </div>

</template>

<script>
import service from "@/service";
import Manage from "@/views/manage/manage";

export default {
  name: 'person',
  data() {
    return {
      activeIndex: 1,
      from: {},
      pwdfrom: {},
      formLabelWidth: '20%',
      actionURL: "http://47.93.223.115:62655/user/uploadImage/" + localStorage.getItem("userid"),
      himgshow: true,
      image_url: ''
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    modify() {
      service.POST("/user/user_update/", this.from, resp => {
        if (resp.data.code === 200) {
          this.$message.success("修改成功")
          this.initialize()
          this.himgshow = false
          this.$nextTick(() => {
            console.log(234)
            this.himgshow = true
          })
          Manage.methods.reload_head()
        }
      })
    },
    pwdModify() {

    },
    handleAvatarSuccess() {
      this.initialize()
      console.log(123)
      this.himgshow = false
      setTimeout(() => {
        this.himgshow = true
      }, 1000)

    },
    initialize() {
      service.GET("/user/username/" + localStorage.getItem("userid"), resp => {
        this.image_url = resp.data.data.image_url
        this.from = resp.data.data;
      })

    },
    reloadHead() {
      Manage.methods.reload_head()
      this.$message.success("成功")
      service.GET("/user/username/" + localStorage.getItem("userid"), resp => {
        console.log(resp);
        this.image_url = resp.data.data.image_url
        this.from = resp.data.data;
      })
    }


  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.ssBox {
  width: 80%;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

#card {
  width: 40vw;
  margin: 2vh 0 0 1vw;
}

#left {
  position: absolute;
  /*left: ;*/
}

#person-main {
  display: block;
  width: 100%;

}
</style>