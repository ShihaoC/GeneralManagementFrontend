<!--用户权限页面-->
<template>
  <div class="container">
    <div id="power-main">
      <div class="up">
        <el-button type="success" icon="el-icon-edit" plain size="small" @click="dialogadd = true"> 添加</el-button>
        <span>&nbsp;&nbsp;</span>
        <el-button type="info" @click="daochu" icon="el-icon-download" plain size="small">导出</el-button>
        <el-button :disabled="select" type="danger" @click="batch_Delete" icon="el-icon-close" plain size="small">删除
        </el-button>
      </div>
      <div class="block">
        <el-table
            ref="multipleTable"
            v-loading="table_loading"
            :data="tableData"
            style="width: 100%;"
            :header-cell-style="header_cell_style"
            :cell-style="cell_style"
            @selection-change="handleSelectionChange"
            @cell-click="cellclick">
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
            <template v-slot="scope">
              <el-switch
                  :disabled="scope.row.role_name === 'admin'"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeStatue"
                  v-model="scope.row.enable">
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
                  :disabled="scope.row.role_name === 'admin'">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="toDelete(scope.$index, scope.row)"
                  :disabled="scope.row.role_name === 'admin'">删除
              </el-button>
              <el-button
                  @click="Authority_Update(scope.row)"
                  size="mini"
                  type=""
              >修改权限
                <!--                  :disabled="scope.row.role_name === 'admin'"-->
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
      <el-dialog title="修改角色信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="角色ID:" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off" class="sBox" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色代号:" :label-width="formLabelWidth">
            <el-input v-model="form.role_name" class="sBox"></el-input>
          </el-form-item>
          <el-form-item label="角色名称:" :label-width="formLabelWidth">
            <el-input v-model="form.nick" autocomplete="off" class="sBox"></el-input>
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
          title="创建角色" :visible.sync="dialogadd" width="30%">
        <el-form :rules="insertRule" ref="ruleForm" :model="addform">

          <el-form-item label="角色代号:" :label-width="formLabelWidth" prop="role_name">
            <el-input v-model="addform.role_name" autocomplete="off" class="sBox"
                      placeholder="请输入角色代号"></el-input>
          </el-form-item>
          <el-form-item label="角色名称:" :label-width="formLabelWidth" prop="nick">
            <el-input v-model="addform.nick" autocomplete="off" class="sBox"
                      placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth" prop="mark">
            <el-input v-model="addform.mark" autocomplete="off" class="sBox"
                      placeholder="请输入权限">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogadd = false">取消</el-button>
          <el-button type="primary" @click="insert">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="Authority_Dialog" :title="'修改权限'" @close="clearNode" width="30%">
        <el-tree
            v-loading="Authority_loading"
            :data="TreeData"
            show-checkbox
            node-key="id"
            :default-checked-keys="checked"
            @check="checking"
            ref="tree">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="uploadAuthority()">保存</el-button>
          <el-button type="primary" @click="Authority_Dialog = false">取消</el-button>
        </div>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import global from "@/views/Global.vue";
import $ from 'jquery'
import Post from "@/components/system/department.vue";
import service from "@/service";
import {enable} from "core-js/internals/internal-metadata";

let newAxios = global.newAxios
export default {
  components: {Post},
  mounted() {
    this.loaddata(1, '');
    this.role_id = this.$route.query.role_id;
    service.GET("/auth/getAuthority?role_id=1", (resp) => {
      console.log(resp)
      this.TreeData = resp.data.data
    });
    service.GET("/auth/default_check?role_id=1", resp => {
      console.log(resp)
      this.checked = resp.data.data
    })

  },
  data() {
    return {
      role_id_change: 0,
      table_loading: false,
      Authority_loading: true,
      TreeData: [],
      checked: [],
      role_id: 1,
      input: '',
      tableData: [],
      dialogFormVisible: false,
      dialogadd: false,
      form: {
        id: '',
        role_name: '',
        nick: '',
        mark: '',
        type: [],
        value1: null,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      },
      addform: {
        role_name: '',
        nick: '',
        mark: '',
      },
      insertRule: {
        role_name: [
          {required: true, message: '角色代号不能为空', trigger: 'change'}
        ],
        nick: [
          {required: true, message: '角色名称不能为空', trigger: 'change'}
        ],
        mark: [
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
      fullscreen: false,
      Authority_Dialog: false,
      isChange: false
    }
  },
  methods: {
    test(){
      console.log(this.checked)
    },
    clearNode() {
      this.$refs.tree.setCheckedKeys([])
    },
    changeStatue(a) {
      console.log(a)
      this.$confirm('您要修改状态吗,拥有此权限的所有用户都要重新分配角色', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.GET("/role/update_statue/" + this.role_id_change + "?statue=" + a, resp => {
          console.log(resp)
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.loaddata(this.page, '')

        })
      }).catch(() => {
        this.loaddata(this.page, '')
      });
    },
    uploadAuthority() {
      if(!this.isChange){
        this.$message.warning("权限没有更改")
        this.Authority_Dialog = false
        this.Authority_loading = false
        this.isChange = false
        return
      }
      console.log(this.checked)
      this.Authority_loading = true
      service.POST("/auth/update?role_id=" + this.role_id, this.checked, resp => {
        console.log(resp)
        this.Authority_Dialog = false
        this.Authority_loading = false
      })
    },
    Authority_Update(row) {
      this.isChange = false
      this.role_id = row.id
      console.log(row)
      this.Authority_Dialog = true
      this.loadDefaultChecked();
      console.log(this.checked)
    },
    loadDefaultChecked() {
      this.Authority_loading = true
      service.GET("/auth/default_check?role_id=" + this.role_id, resp => {
        this.checked = resp.data.data
        this.$refs.tree.setCheckedKeys(this.checked);
        this.Authority_loading = false
      })
    },
    search() {
      this.loaddata(this.page, this.ss)
    },
    cellclick(row, column, cell, event) {
      this.role_id_change = row.id
    },
    checking(a, b, c) {
      this.isChange = true;
      console.log(a, b, c)
      this.checked = b.checkedKeys
      console.log(this.checked)
    },
    enable,
    edit(i, r) {
      console.log(r)
      this.dialogFormVisible = true
      this.form.id = r.id
      this.form.role_name = r.role_name
      this.form.nick = r.nick
      this.form.mark = r.mark
    },
    insert() {
      if (this.addform.role_name && this.addform.nick && this.addform.mark) {
        service.POST("/role/insert", this.addform, resp => {
          this.dialogadd = false
          this.loaddata(this.page, '')
        })
      } else {
        this.$message.warning("请检查表单内容，不能为空")
        return
      }
    },
    loaddata(page, search) {
      this.table_loading = true
      setTimeout(() => {
        service.GET("/role/list?page=" + this.page + "&search=" + search, resp => {
          console.log(resp)
          this.tableData = resp.data.data.limit_data
          this.table_loading = false
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
      this.checkAuth(() => {
        service.POST("/role/update", this.form, resp => {
          console.log(resp)
          this.loaddata(this.page, '');
        })
        this.dialogFormVisible = false

        this.dialogFormVisible = false
      })
    },
    changePage(index) {
      this.page = index
      this.loaddata(index)
    },
    toDelete(i, r) {
      this.$confirm('您要删除吗', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.GET("/role/delete/" + r.id, resp => {
          console.log(resp)
          this.loaddata(this.page, '')
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })

      }).catch(() => {
        this.loaddata(this.page, '')
      });
      console.log(r)

    },
    batch_Delete() {
      service.POST("/role/batch_Delete", this.multipleSelection, resp => {
        this.loaddata(this.page, '')
      })

    },

    daochu() {
      service.download("/role/export_excel", "角色表")
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
