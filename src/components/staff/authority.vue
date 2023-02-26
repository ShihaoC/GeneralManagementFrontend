<!--用户权限页面-->
<template>
  <div class="container">
    <div id="power-main">
      <div class="up">
        <el-button type="success" icon="el-icon-edit" plain size="small" @click="dialogadd = true"> 添加</el-button>
        <span>&nbsp;&nbsp;</span>
        <el-upload
            style="display: inline-block">
          <el-button type="info" @click="daochu" icon="el-icon-download" plain size="small">导出</el-button>
          <el-button :disabled="select" type="danger" @click="batch_Delete" ico="el-icon-close" plain size="small">删除</el-button>
        </el-upload>
      </div>
      <div class="block">
        <el-table
            ref="multipleTable"
            v-loading="false"
            :data="tableData"
            style="width: 100%;"
            :header-cell-style="header_cell_style"
            :cell-style="cell_style"
            @select-change="handleSelectionChange">
          <el-table-column
          type="selection">
          </el-table-column>
          <el-table-column
              prop="id"
              label="ID">
          </el-table-column>
          <el-table-column
              prop="role_name"
              label="角色代号">
          </el-table-column>
          <el-table-column
              prop="nick"
              label="角色名称">
          </el-table-column>
          <el-table-column
              width="300px"
              prop="mark"
              label="权限">
          </el-table-column>
          <el-table-column
              prop="enable"
              label="是否启用">
            <el-switch
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-table-column>
          <el-table-column label="操作" width="250">
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
              <el-button
              size="mini"
              type="">修改权限
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
          <el-form-item label="角色代号:" :label-width="formLabelWidth">
            <el-input v-model="form.role_name"></el-input>
          </el-form-item>
          <el-form-item label="角色名称:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" class="sBox"></el-input>
          </el-form-item>
          <el-form-item label="权限:" :label-width="formLabelWidth">
          <el-input v-model="form.mark" autocomplete="off" class="sBox"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modify">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
      title="创建角色" :visible.sync="dialogadd">
        <el-form :rules="insertRule" ref="ruleForm" :inline="true" :model="addform">

          <el-form-item label="角色代号:" :label-width="formLabelWidth" prop="role_name">
            <el-input v-model="addform.role_name" autocomplete="off" class="sBox"
                      placeholder="请输入角色代号"></el-input>
          </el-form-item>
          <el-form-item label="角色名称:" :label-width="formLabelWidth" prop="nick">
            <el-input v-model="addform.nick" autocomplete="off" class="sBox"
                      placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="权限:" :label-width="formLabelWidth" prop="mark">
          <el-input v-model="addform.mark" autocomplete="off" class="sBox"
                    placeholder="请输入权限">
          </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogadd = false">取消</el-button>
          <el-button type="primary" @click="addTest">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import global from "@/views/Global";
import $ from 'jquery'
import Post from "@/components/staff/department.vue";
import service from "@/service";
import {enable} from "core-js/internals/internal-metadata";

let newAxios = global.newAxios
export default {
  components: {Post},
  mounted() {
    this.loaddata(1,'');
  },
  data() {
    return {
      input: '',
      tableData: [],
      dialogFormVisible: false,
      dialogadd: false,
      form: {
        id: '',
        role_name:'',
        nick:'',
        mark:'',
        type: [],
        value1: null,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      },
      addform: {
        role_name:'',
        nick:'',
        mark:'',
      },
      insertRule: {
        role_name: [
          {required: true, message: '角色代号不能为空', trigger: 'change'}
        ],
        nick:[
          {required: true, message: '角色名称不能为空', trigger: 'change'}
        ],
        mark:[
          {required: true, message: '权限不能为空', trigger: 'change'}
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
      fullscreen:false
    }
  },
  methods: {
    enable,
    edit(i, r) {
      this.dialogFormVisible = true
      this.id=r.id
      this.role_name=r.name
      this.nick=r.nick
      this.mark=r.mark
    },
    addTest() {
      if (this.addform.role_name && this.addform.nick && this.addform.mark) {
        service.post("/em/insert_employee", this.addform, resp => {
          this.CodeCheck(resp.data.code)
          this.dialogadd = false
          this.loaddata(this.page)
        })
      }else{
        this.$message.warning("请检查表单内容，不能为空")
        return
      }
    },
    loaddata(page,search) {
      this.loading = true
      setTimeout(() => {
        service.get("/role/list?page="+this.page+"&search="+search,resp => {
          this.tableData =  resp.data.data.limit_data
          this.loading = false
          this.total = resp.data.data.count
          if (this.tableData.length === 0 && this.page - 1 !== 0) {
            this.loaddata(this.page - 1)
          }
        })
      }, 200)
    },
    handleSelectionChange(val) {
      this.multtiplesSelection = val;
      if (this.multtiplesSelection.length !== 0) {
        this.select = false
      } else {
        this.select = true
      }
    },
    modify() {//修改
      this.checkAuth(() => {
        service.post("/user/user_update", this.form,resp => {
          if (resp.data.code === 200) {
            this.$message.success("修改成功")
          }
        })
        this.dialogFormVisible = false
        this.loaddata(this.page);
        this.dialogFormVisible = false
      })
    },
    changePage(index) {
      this.page = index
      this.loaddata(index)
    },
    toDelete(i, r) {
        service.get("/user/user_delete?id=" + r.id + "&name=" + r.name).then((resp) => {
          console.log(resp)
        })
        this.loaddata(this.page)
    },
    batch_Delete() {
      newAxios.post("/em/batch_Delete", this.multtiplesSelection).then((resp) => {
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
          a.download = '权限表.xls';
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
@import "@/assets/css/department.less";
</style>
