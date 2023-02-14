<template>
    <div class="container">
        <div class="skip_box"></div>
        <div>
            <div class="up">
                <!--            el-icon-search-->
                <span style="font-weight: bold">员工ID:</span>
                <span>&nbsp;&nbsp;</span>
                <el-input class="sBox" v-model="input" placeholder="请输入员工ID"></el-input>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style="font-weight: bold">员工名称:</span>
                <span>&nbsp;&nbsp;</span>
                <el-input class="sBox" v-model="input" placeholder="请输入员工名称"></el-input>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button type="primary" icon="el-icon-search" @click="skip">搜索</el-button>
            </div>
            <div class="operate_box">
                <!--                dialogFormVisible = true-->
                <el-button type="success" icon="el-icon-edit" @click="dialogadd = true"> 添加</el-button>
                <el-button type="warning" icon="el-icon-upload2">导入</el-button>
                <el-button type="info" icon="el-icon-download">导出</el-button>
            </div>
            <div class="block">
                <el-table
                        v-loading="loading"
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号">
                    </el-table-column>
                    <el-table-column
                            prop="join_date"
                            label="入职日期">
                    </el-table-column>
                    <el-table-column
                            prop="department"
                            label="职位">
                    </el-table-column>
                    <el-table-column
                            prop="clockin"
                            label="是否打卡(今日)">
                    </el-table-column>
                    <el-table-column
                            prop="work_num"
                            label="此工程工数">
                    </el-table-column>
                    <el-table-column
                            prop="quit"
                            label="是否离职">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="edit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        layout="prev, pager, next"
                        :total="50">
                </el-pagination>
            </div>
            <el-dialog title="员工信息"  :visible.sync="dialogFormVisible">
                <el-form :inline="true" :model="form">
                    <el-form-item label="员工ID:" :label-width="formLabelWidth">
                        <el-input v-model="form.id" autocomplete="off" class="sBox" disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item  label="员工岗位:" :label-width="formLabelWidth">
                        <el-input v-model="form.department" autocomplete="off" class="sBox"></el-input>
                    </el-form-item>
                    <el-form-item label="员工名称:" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off" class="sBox"></el-input>
                    </el-form-item>
                    <el-form-item label="此工程工数:" :label-width="formLabelWidth">
                        <el-input v-model="form.work_num" autocomplete="off" class="sBox"></el-input>
                    </el-form-item>
                    <el-form-item label="员工手机号:" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off" class="sBox"></el-input>
                    </el-form-item>
                    <el-form-item label="是否离职:" :label-width="formLabelWidth">
                        <el-select v-model="form.quit" placeholder="" class="sBox">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入职日期" :label-width="formLabelWidth">
                        <el-date-picker
                                v-model="form.value1"
                                type="date"
                                placeholder="选择日期"
                                style="width: 15vw"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="xiugai">确 定</el-button>
                </div>
            </el-dialog>


            <el-dialog title="创建员工" :visible.sync="dialogadd">
                <el-form :inline="true" :model="addform">
                    <el-form-item label="员工名称:" :label-width="formLabelWidth">
                        <el-input v-model="addform.name" autocomplete="off" class="sBox"></el-input>
                    </el-form-item>
                    <el-form-item label="员工手机号:" :label-width="formLabelWidth">
                        <el-input v-model="addform.phone" autocomplete="off" class="sBox"></el-input>
                    </el-form-item>
                    <el-form-item label="员工岗位:" :label-width="formLabelWidth">
                        <el-input v-model="addform.department" autocomplete="off" class="sBox"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogadd = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import axios from "axios";
    import global from "@/views/Global";
    import $ from 'jquery'
    import Post from "@/components/staff/post";

    let newAxios = axios.create({
        baseURL: global.baseUrl
    })
    export default {
        components: {Post},
        mounted() {
            this.loaddata()
        },
        data() {
            return {
                input: '',
                tableData: [{
                    phone: 111
                }],
                dialogFormVisible: false,
                dialogadd: false,
                form: {
                    id: '',
                    name: '',
                    phone: '',
                    join_date: '',
                    department: '',
                    work_num: '',
                    quit: '',
                    type: [],
                    value1: null,
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        },
                    }
                },
                addform: {
                    name: '',
                    phone: '',
                    department: ''
                },
                formLabelWidth: '120px',
                loading: false
            }
        },
        methods: {
            skip() {
                newAxios.get("/manage/post").then((resp) => {

                })
            },
            edit(i, r) {
                this.dialogFormVisible = true
                this.form.phone = r.phone
                this.form.id = r.id
                this.form.name = r.name
                this.form.department = r.department
                this.form.work_num = r.work_num
                this.form.quit = r.quit
                this.form.value1 = new Date(r.join_date)
            },
            add() {
                newAxios.post("/em/insert_employee", this.addform).then((resp) => {
                    console.log(resp)
                })

                this.dialogadd = false
                this.loaddata();
            },
            loaddata() {
                this.loading = true
                newAxios.get("/em/select_all?page=1").then((resp) => {
                    console.log(resp)
                    this.tableData = resp.data.data.limit_data
                    this.loading = false
                })
            },
            xiugai(){
                newAxios.post("/em/update_employee",this.form).then((resp) => {
                    console.log(resp)

                })
                this.dialogFormVisible = false
                setTimeout(()=>{
                    this.loaddata();
                },50)
            }
        }
    }
</script>
<style lang="less">
  .sBox {
    width: 15vw;
  }

  .block {
    //position: relative;
    width: 87vw;
    text-align: center;
  }

  .container {
    width: 88vw;
    height: 89vh;
    margin: 1vw 0vw 1vw 1vw;
  }

  .skip_box {
    width: 1vw;
    height: 14vh;
    float: left;
  }

  .operate_box {
    margin: 1vw 0vw 0vw 0vw;
  }

  .amend_box {
    //float: left;
    width: 20vw;
    height: 40vh;
  }

  #dialog-box {
    top: 0;
    width: 70vw;
    height: 80vh;
    //background: red;
  }
</style>
