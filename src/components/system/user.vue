<template>
  <div class="container">
    <div id="user-main">
      <div class="up">
        <el-button type="success" icon="el-icon-edit" plain size="small" @click="insertDialog = true"> 添加</el-button>
        <span>&nbsp;&nbsp;</span>
        <el-button type="info" @click="export_excel" icon="el-icon-download" plain size="small">导出</el-button>
        <el-button :disabled="select" type="danger" @click="batch_Delete" icon="el-icon-close" plain size="small">批量删除
        </el-button>
      </div>
      <div class="block">
        <el-table
            ref="multipleTable"
            v-loading="table_loading"
            :data="tableData"
            style="width: 100%;"
            :header-cell-style="'height: 6vh'"
            :cell-style="'height: 6vh'"
            @selection-change="handleSelectionChange"
            @cell-click="cellclick">
          <el-table-column
              type="selection"
              align="center"
              width="50">
          </el-table-column>
          <el-table-column
              prop="id"
              label="用户ID">
          </el-table-column>
          <el-table-column
              prop="image_url"
              label="头像">
            <template slot-scope="scope">
              <img width="30" :src="scope.row.image_url" alt="">
            </template>
          </el-table-column>
          <el-table-column
              prop="username"
              label="用户名">
          </el-table-column>
          <el-table-column
              prop="role"
              label="角色">
          </el-table-column>
          <el-table-column
              prop="department"
              label="职位">
          </el-table-column>
          <el-table-column
              prop="nick_name"
              label="昵称">
          </el-table-column>
          <el-table-column
              prop="enable"
              label="是否启用">
            <template v-slot="scope">
              <el-switch
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeStatue1"
                  v-model="scope.row.used">
              </el-switch>
            </template>

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
                  @click="edit(scope.$index, scope.row)"
              >编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="toDelete(scope.$index, scope.row)"
              >删除
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
      <el-dialog
          title="创建角色" :visible.sync="insertDialog" width="30%">
        <el-form :rules="insertRule" ref="ruleForm" :model="insertForm">
          <el-form-item label="用户名:" :label-width="formLabelWidth" prop="role_name">
            <el-input v-model="insertForm.username" autocomplete="off" class="sBox"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码:" :label-width="formLabelWidth" prop="role_name">
            <el-input v-model="insertForm.password" autocomplete="off" class="sBox"
                      placeholder="请输密码"></el-input>
          </el-form-item>
          <el-form-item label="昵称:" :label-width="formLabelWidth" prop="role_name">
            <el-input v-model="insertForm.nick_name" autocomplete="off" class="sBox"
                      placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="角色:" :label-width="formLabelWidth" prop="role_name">
            <el-select v-model="insertForm.role" placeholder="请选择角色" class="sBox">
              <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :label="item.nick"
                  :value="item.id"
                  :value-key="item.nick">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位:" :label-width="formLabelWidth" prop="role_name">
            <el-select v-model="insertForm.department" placeholder="请选择岗位" class="sBox">
              <el-option
                  v-for="item in departments"
                  :key="item.id"
                  :label="item.nick"
                  :value="item.nick">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insertDialog = false">取消</el-button>
          <el-button type="primary" @click="insert">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog
          title="修改员工" :visible.sync="updateDialog" width="30%">
        <el-form :rules="updateRule" ref="ruleForm" :model="insertForm">
          <el-form-item label="用户id:" :label-width="formLabelWidth" prop="role_name">
            <el-input :readonly="true" v-model="updateForm.id" autocomplete="off" class="sBox"
                      placeholder="id"></el-input>
          </el-form-item>
          <el-form-item label="用户名:" :label-width="formLabelWidth" prop="role_name">
            <el-input v-model="updateForm.username" autocomplete="off" class="sBox"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称:" :label-width="formLabelWidth" prop="role_name">
            <el-input v-model="updateForm.nick_name" autocomplete="off" class="sBox"
                      placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="角色:" :label-width="formLabelWidth" prop="role_name">
            <el-select v-model="updateForm.role" placeholder="请选择角色" class="sBox">
              <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :label="item.nick"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位:" :label-width="formLabelWidth" prop="role_name">
            <el-select v-model="updateForm.department" placeholder="请选择岗位" class="sBox">
              <el-option
                  v-for="item in departments"
                  :key="item.id"
                  :label="item.nick"
                  :value="item.nick">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取消</el-button>
          <el-button type="primary" @click="update">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import service from "@/service";

export default {
  name: "user",
  mounted() {
    this.loadData();
  },
  data() {
    return {
      select: true,
      total: 0,
      page: 0,
      ss: '',
      tableData: [],
      table_loading: false,
      multipleSelection: [],
      insertDialog: false,
      formLabelWidth: '120px',
      insertRule: {},
      insertForm: {
        username: '',
        password: '',
        role: 1,
        department: '员工',
        nick_name: ''
      },
      departments: [],
      roles: [],
      updateDialog: false,
      updateRule: {},
      updateForm: {
        id: 0,
        username: '',
        role: '',
        department: '',
        nick_name: '',
        used: false
      },
      role_id_change: 0
    }
  },
  methods: {
    loadData() {
      this.table_loading = true
      setTimeout(() => {
        service.GET("/user/user_query?search=" + this.ss + "&page=" + this.page, resp => {
          console.log(resp)
          this.tableData = resp.data.data.limit_data
          this.total = resp.data.data.count
          this.table_loading = false
          if (this.tableData.length === 0 && this.page - 1 !== 0) {
            this.page -= 1
            this.loadData()
          }
        })
        this.loadDepartment()
        this.loadRoleData()
      }, 200)
    },
    loadRoleData() {
      service.GET("/role/all", resp => {
        this.roles = resp.data.data
      })
    },
    loadDepartment() {
      service.GET("/dep/all_department", resp => {
        this.departments = resp.data.data
      })
    },
    insert() {
      service.POST("/auth/register", this.insertForm, resp => {
        console.log(resp)
        this.insertDialog = false
        this.$message.success("添加成功")
        this.loadData()
      })
    },
    edit(index, row) {
      this.updateDialog = true
      this.updateForm.username = row.username
      this.updateForm.nick_name = row.nick_name
      this.updateForm.role = this.getRole_id(row.role)
      this.updateForm.department = row.department
      this.updateForm.id = row.id
      this.updateForm.used = row.used
      console.log(row)
    },
    getRole_id(role_name) {
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].nick === role_name) {
          return this.roles[i].id
        }
      }
    },
    update() {
      service.POST("/user/user_update", this.updateForm, resp => {
        console.log("resp")
        this.updateDialog = false
        this.loadData()
        this.$message.success("修改成功")
      })
    },
    toDelete(index, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.GET("/user/user_delete/" + row.id, resp => {
          this.$message({
            type: 'success',
            message: resp.data
          });
          this.loadData()
        })

      }).catch(() => {

      });
    },
    search() {
      this.loadData()
    },
    changeStatue1(v) {
      this.$confirm('此操作将停用该账户, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          service.GET("/user/user_update_statue/" + this.role_id_change + "?statue=" + v, resp => {
            this.loadData()
            console.log(resp)
            this.$message.success("状态切换成功")
          })
        }, 10)

      }).catch(() => {
        this.loadData()
      });


    },
    export_excel() {
      service.download("/user/user_export_excel", "用户表")
    },
    batch_Delete() {
      service.POST("/user/batch_Delete", this.multipleSelection, resp => {
        this.loadData()
        this.multipleSelection = []
      })
    },
    cell_style() {
      return "height:2vh";
    },
    header_cell_style() {
      return "background:#f8f8f9";
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
    cellclick(row, column, cell, event) {
      this.role_id_change = row.id
    },
    changePage(i) {
      this.loadData()
    }
  }

}
</script>

<style lang="less">
@import "@/assets/css/department.less";
</style>