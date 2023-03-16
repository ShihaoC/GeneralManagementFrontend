<template>
    <div>
        <el-card style="width: 40vw" id="card">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="pass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth">
                    <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item id="tj" >
                    <el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
    import service from "@/service";
    export default {

        name: "",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    checkPassword:'',
                },
                formLabelWidth: '100px',
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                service.GET("/updataPassword/"+ localStorage.getItem("userid")+"?pass1="+formName.password+"&pass2="+formName.checkPass,resp =>{
                    console.log(resp)
                })
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         alert('submit!');
                //     } else {
                //         this.$message.error("提交错误")
                //         return false;
                //     }
                // });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style scoped>
    #card {
        width: 40vw;
        margin: 2vh 0 0 1vw;
    }
    #tj{
        margin: 0 0 0 8vw;
        /*text-align: center;*/

    }


</style>