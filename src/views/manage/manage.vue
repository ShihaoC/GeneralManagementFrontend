<template>
    <div id="manage-main">
        <div id="manage-navbar">
          <div id="manage-navbar-title">员工管理系统</div>
          <div id="manage-navbar-user">{{user}}</div>
        </div>
        <div id="manage-content">
            <div id="manage-listbar">

                <!--        -->
                <el-row class="tac">
                    <el-col :span="12" style="width: 100%">
                        <el-menu
                                default-active="2"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                :router="true">
                            <el-submenu index="1">
                                <template slot="title"><i class="el-icon-user-solid"></i><span>员工管理</span>
                                </template>
                                <router-link to="/manage/department">
                                    <el-menu-item>员工部门</el-menu-item>
                                </router-link>
                                <router-link to="/manage/post">
                                    <el-menu-item>员工岗位</el-menu-item>
                                </router-link>
                                <router-link to="/manage/reportForm">
                                    <el-menu-item>员工报表</el-menu-item>
                                </router-link>
                                <router-link to="/manage/power">
                                    <el-menu-item>用户权限</el-menu-item>
                                </router-link>
                            </el-submenu>
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">导航二</span>
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
                                <span slot="title">导航四</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
                <!--        -->

            </div>
            <div id="manage-text">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "manage"
    }
</script>

<style lang="less">
  @import "@/assets/css/manage.less";
</style>