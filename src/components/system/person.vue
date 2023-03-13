<template>
    <div>
        <div id="left">
            <el-card id="card">
                <el-upload
                        class="avatar-uploader"
                        :action="actionURL"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        style="text-align: center ; margin: 10px"
                >
                    <img v-if="from.image_url" :src="from.image_url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form>
                    <el-form-item label="用户名:"  :label-width="formLabelWidth" >
                        <el-input v-model="from.username" autocomplete="off" class="sBox" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="名称:" :label-width="formLabelWidth">
                        <el-input v-model="from.nick_name" autocomplete="off" class="sBox"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" :label-width="formLabelWidth">
                        <el-input v-model="from.phone" autocomplete="off" class="sBox"></el-input>
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
                // imageURL: '',
                from: {},
                pwdfrom:{},
                formLabelWidth: '120px',
                actionURL: "http://localhost:8848/user/uploadImage/" + localStorage.getItem("userid")
            }
        },
        mounted() {
            this.initialize()
        },
        methods: {
            modify() {
                service.POST("/user/user_update/",this.from,resp =>{
                    if (resp.data.code === 200) {
                        this.$message.success("修改成功")
                        this.initialize()
                        Manage.methods.reload_head()
                    }
                })
            },
            pwdModify(){

            },
            handleAvatarSuccess() {
                this.initialize()

            },
            initialize() {
                service.GET("/user/username/" + localStorage.getItem("userid"), resp => {
                    console.log(resp);
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
    }

    #left{
        float: left;
    }

</style>