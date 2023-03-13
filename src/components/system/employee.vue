<!--人员页面-->
<template>
  <div class="container" v-loading="fullscreen">
    <div id="employee-main">
      <div class="up">
        <el-button type="success" icon="el-icon-edit" @click="dialogadd = true" plain size="small"> 添加</el-button>
        <span>&nbsp;&nbsp;</span>
        <el-upload
            style="display: inline-block"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
        >
          <el-button type="warning" icon="el-icon-upload2" plain size="small">导入</el-button>
        </el-upload>

        <span>&nbsp;&nbsp;</span>
        <el-button type="info" @click="daochu" icon="el-icon-download" plain size="small">导出</el-button>
        <el-button :disabled="select" type="danger" @click="batch_Delete" icon="el-icon-close" plain size="small">删除
        </el-button>
      </div>
      <div class="block">
        <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="tableData"
            style="width: 100%;"
            :header-cell-style="header_cell_style"
            :cell-style="cell_style"
            @selection-change="handleSelectionChange">
          <el-table-column
              type="selection">
          </el-table-column>
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
          <el-table-column label="是否打卡(今日)" prop="statue">
            <template slot-scope="scope">
              <el-tag type="warning" v-if="scope.row.statue === '已经签退'">{{scope.row.statue}}</el-tag>
              <el-tag type="success" v-if="scope.row.statue === '已签到'">{{scope.row.statue}}</el-tag>
              <el-tag type="danger" v-if="!scope.row.statue">未签到</el-tag>
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
              <el-option v-for="item in departments" :label="item.nick" :value="item.nick"></el-option>
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
          <el-form-item label="员工名称:" :label-width="formLabelWidth" prop="name" >
            <el-input v-model="addform.name" autocomplete="off" class="sBox" placeholder="请输入员工名称"></el-input>
          </el-form-item>
          <el-form-item label="员工手机号:" :label-width="formLabelWidth" prop="phone">
            <el-input v-model.number="addform.phone" autocomplete="off" class="sBox"
                      placeholder="请输入员工手机号"></el-input>
          </el-form-item>
          <el-form-item label="员工岗位:" :label-width="formLabelWidth">
            <el-select class="sBox" v-model="addform.department" placeholder="请选择员工岗位">
              <el-option v-for="item in departments" :label="item.nick" :value="item.nick"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogadd = false">取 消</el-button>
          <el-button type="primary" @click="addTest">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import global from "@/views/Global";
import Post from "@/components/system/department.vue";
import service from '@/service.js'
// import service from '@/assets/util/service.vue'

// let newAxios = global.newAxios
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
          {type: 'number', message: '手机号必须为数字值', trigger: 'change'}
        ]
      },
      formLabelWidth: '120px',
      loading: false,
      total: 0,
      page: 1,
      departments: [],
      ss: '',
      multipleSelection: [],
      select: true,
      fullscreen: false
    }
  },
  methods: {
    loadDepartment() {
      service.GET("/dep/all_department", resp => {
        this.departments = resp.data.data
      })
    },
    search() {//查询
      service.GET("/em/select_something?query=" + this.ss + "&page=" + this.page, resp => {
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
    addTest() {
      if (this.addform.name && this.addform.phone && this.addform.department) {
        service.POST("/em/insert_employee", this.addform, (resp) => {

          this.CodeCheck(resp.data.code)
          this.dialogadd = false
          this.loaddata(this.page)
        })
      } else {
        this.$message.warning("请检查表单内容，不能为空")
        return
      }
    },
    loaddata(page) {
      this.loading = true
      setTimeout(() => {
        service.GET("/em/select_all?page=" + page, resp => {
          this.tableData = resp.data.data.limit_data
          this.loading = false
          this.total = resp.data.data.count
          if (this.tableData.length === 0 && this.page - 1 !== 0) {
            this.loaddata(this.page - 1)
          }
        })
      }, 200)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
      if (this.multipleSelection.length !== 0) {
        this.select = false
      } else {
        this.select = true
      }
    },
    modify() {//修改
      service.POST("/em/update_employee", this.form, resp => {
        if (resp.data.code === 200) {
          this.$message.success("修改成功")
        }
      })
      this.loaddata(this.page);
      this.dialogFormVisible = false

    },
    changePage(index) {
      this.page = index
      this.loaddata(index)
    },
    toDelete(i, r) {
      service.GET("/em/delete_employee?id=" + r.id + "&name=" + r.name, resp => {
        console.log(resp)
      })
      this.loaddata(this.page)
    },
    batch_Delete() {
      service.POST("/em/batch_Delete", this.multipleSelection, resp => {
        this.loaddata(this.page)
      })
    },

    daochu() {
      service.download("/em/export_excel")
    },
    cell_style() {
      return "height:2vh";
    },
    header_cell_style() {
      return "background:#f8f8f9";
    },
    checkAuth(fun) {
      if (localStorage.getItem("auth") === 'ROOT') {
        fun()
      } else {
        this.$message.error("权限不足")
        return
      }
    },
    CodeCheck(ErrCode) {
      if (ErrCode === 200) {
        this.$message.success("成功")
      } else if (ErrCode === 404) {
        this.$message.warning("未找到")
      } else if (ErrCode === 500) {
        this.$message.error("服务器错误,请检查表单参数")
      } else if (ErrCode === 330) {
        this.$message.error("已经存在")
      } else if (ErrCode === 340) {
        this.$message.error("不存在")
      }
    }
  }
}
</script>
<style lang="less">
@import "@/assets/css/employee-manage.less";
</style>
