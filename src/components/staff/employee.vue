<template>
  <div class="container">
    <div id="employee-main">
      <div class="up">
        <el-button type="success" icon="el-icon-edit" @click="dialogadd = true" plain size="small"> 添加</el-button>
        <span>&nbsp;&nbsp;</span>
        <el-upload
            style="display: inline-block"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"

            :limit="3"
        >
          <!--          <el-button size="small" type="primary">点击上传</el-button>-->
          <el-button type="warning" icon="el-icon-upload2" plain size="small">导入</el-button>
          <!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>

        <span>&nbsp;&nbsp;</span>
        <el-button type="info" @click="daochu" icon="el-icon-download" plain size="small">导出</el-button>
      </div>
      <div class="block">
        <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%;"
            :header-cell-style="header_cell_style"
            :cell-style="cell_style">
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
              label="手机号"
          >
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
              prop="work_num"
              label="此工程工数">
          </el-table-column>
          <el-table-column label="是否打卡(今日)" prop="clockin">
            <template slot-scope="scope">
              <el-tag type="warning" v-if="!scope.row.clockin">未签到</el-tag>
              <el-tag type="success" v-else>已签到</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否离职" prop="quit">
            <template slot-scope="scope">
              <el-tag type="success" v-if="!scope.row.quit">在职</el-tag>
              <el-tag type="warning" v-else>离职</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot="header" slot-scope="scope">
              <el-input
                  v-model="ss"
                  size="mini"
                  placeholder="输入关键字搜索"
                  @change="search"/>
            </template>
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="edit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="toDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div id="pages">
          <el-pagination
              layout="prev, pager, next"
              :total="total"
              :size="10"
              :current-page.sync="page"
              @current-change="changePage">
          </el-pagination>
        </div>
      </div>
      <el-dialog title="员工信息" :visible.sync="dialogFormVisible">
        <el-form :inline="true" :model="form">
          <el-form-item label="员工ID:" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off" class="sBox" disabled></el-input>
          </el-form-item>
          <el-form-item label="员工岗位:" :label-width="formLabelWidth">
            <el-select class="sBox" v-model="form.department" placeholder="请选择员工岗位">
              <el-option v-for="item in departments" :label="item.department" :value="item.department"></el-option>
            </el-select>
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
                v-model="form.join_date"
                type="date"
                placeholder="选择日期"
                style="width: 15vw"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modify">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="创建员工" :visible.sync="dialogadd">
        <el-form :rules="insertRule" ref="ruleForm" :inline="true" :model="addform">
          <el-form-item label="员工名称:" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addform.name" autocomplete="off" class="sBox" placeholder="请输入员工名称"></el-input>
          </el-form-item>
          <el-form-item label="员工手机号:" :label-width="formLabelWidth" prop="phone">
            <el-input v-model.number="addform.phone" autocomplete="off" class="sBox"
                      placeholder="请输入员工手机号"></el-input>
          </el-form-item>
          <el-form-item label="员工岗位:" :label-width="formLabelWidth">
            <el-select class="sBox" v-model="addform.department" placeholder="请选择员工岗位">
              <el-option v-for="item in departments" :label="item.department" :value="item.department"></el-option>
            </el-select>
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
import Post from "@/components/staff/department.vue";

let newAxios = axios.create({
  baseURL: global.baseUrl
})
export default {
  components: {Post},
  mounted() {
    this.loaddata(1)
    this.loadDepartment()
  },
  data() {
    return {
      input: '',
      sId: '',
      sName: '',
      tableData: [],
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
        },
      },
      addform: {
        name: '',
        phone: '',
        department: ''
      },
      insertRule: {
        name: [
          {required: true, message: '用户名不能为空', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '用户名不能为空', trigger: 'change'},
          {type: 'number', message: '年龄必须为数字值', trigger: 'change'}
        ]
      },
      formLabelWidth: '120px',
      loading: false,
      total: 0,
      page: 1,
      departments: [],
      ss: ''
    }
  },
  methods: {
    loadDepartment() {
      newAxios.get("/dep/all_department").then((resp) => {
        console.log(resp)
        this.departments = resp.data.data
      })
    }
    ,
    search() {//查询
      newAxios.get("/em/select_something?query=" + this.ss + "&page=" + this.page).then((resp) => {
        console.log(resp)
        this.tableData = resp.data.data.limit_data
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
      this.form.join_date = new Date(r.join_date)
    },
    add() {//添加
      this.checkAuth(()=>{
        if (this.addform.name && this.addform.phone && this.addform.department) {
          newAxios.post("/em/insert_employee", this.addform).then((resp) => {
            console.log(resp)
            this.$message.success("添加成功")
          })
          this.dialogadd = false
          this.loaddata(this.page);
        } else {
          this.$message.warning("请检查表单内容，不能为空")
          return
        }
      })
      this.dialogadd = false

    },
    loaddata(page) {
      this.loading = true
      setTimeout(() => {
        newAxios.get("/em/select_all?page=" + page).then((resp) => {
          this.tableData = resp.data.data.limit_data
          this.loading = false
          this.total = resp.data.data.count
          if (this.tableData.length === 0 && this.page - 1 !== 0) {
            this.loaddata(this.page - 1)
          }
          this.$message.success("查询成功")
          console.log(this.total)
        })
      }, 200)
    },
    modify() {//修改
      this.checkAuth(()=>{
        newAxios.post("/em/update_employee", this.form).then((resp) => {
          console.log(resp)
          if (resp.data.code === 200) {
            this.$message.success("修改成功")
          }
        })
        this.dialogFormVisible = false

        this.loaddata(this.page);
      })
      this.dialogFormVisible = false

    },
    changePage(index) {
      this.page = index
      this.loaddata(index)
    },
    toDelete(i, r) {
      this.checkAuth(()=>{
        newAxios.get("/em/delete_employee?id=" + r.id + "&name=" + r.name).then((resp) => {
          console.log(resp)
        })
        this.loaddata(this.page)
      })

    },
    daochu() {
      let url = "http://localhost:8848/em/export_excel";
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true); //
      xhr.responseType = "blob"; //js 中的二进制对象
      xhr.onreadystatechange = function () {


        if (xhr.readyState == 3) {

        }
        if (xhr.readyState == 4) {

        }
      };

      xhr.onload = function () {

        //
        if (this.status === 200) {
          //兼容所有的浏览器的代码
          let blob = this.response;
          let a = document.createElement('a');
          a.download = '员工表.xls';
          a.href = window.URL.createObjectURL(blob);
          $("body").append(a);
          a.click();
          $(a).remove();

        }
      };
//     ajax
      xhr.send()
    },
    cell_style() {
      return "height:2vh";
    },
    header_cell_style() {
      return "background:#f8f8f9";
    },
    checkAuth(fun){
      if(localStorage.getItem("auth") === 'ROOT'){
        fun()
      }else {
        this.$message.error("权限不足")
        return
      }
    }
  }
}
</script>
<style lang="less">
@import "@/assets/css/employee-manage.less";
</style>
