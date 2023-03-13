<template>
    <div id="right">
        <el-card>
            <el-form :rule="rules" ref="ruleForm">
                <el-form-item prop="password" label="旧密码:" :label-width="formLabelWidth">
                    <el-input v-model="from.password" show-password autocomplete="off" class="sBox"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" :label-width="formLabelWidth">
                    <el-input v-model="from.newPassword" show-password autocomplete="off" class="sBox"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" :label-width="formLabelWidth">
                    <el-input v-model="from.confirmPassword" show-password autocomplete="off" class="sBox"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button type="primary" @click="pwdModify">确 定</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'Password',
        data() {
            return {
                from: {},
                formLabelWidth: '120px',
                user: localStorage.getItem("username") ? JSON.parse(localStorage.getItem("usename")) : {}
                rules: {
                    password: [
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                        {min: 6, message: '长度不少于6位', trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                        {min: 6, message: '长度不少于6位', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                        {min: 6, message: '长度不少于6位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            pwdModify(){

            }
        }
    }
</script>

<style>

</style>