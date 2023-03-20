<!--岗位页面-->
<template>
  <div class="container">
    <div id="post-main">
      <div class="up">
        <el-button type="success" icon="el-icon-edit" plain size="small" @click="dialogadd = true"> 添加</el-button>
<!--        <el-upload-->
<!--            style="display: inline-block"-->
<!--            class="upload-demo"-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->

<!--            :limit="3"-->
<!--        >-->
<!--          <el-button type="warning" icon="el-icon-upload2" plain size="small">导入</el-button>-->
<!--        </el-upload>-->
        <span>&nbsp;&nbsp;</span>
        <el-button type="info" icon="el-icon-download" plain size="small">导出</el-button>
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
              width="100"
              type="selection">
          </el-table-column>
          <el-table-column
              prop="id"
              label="ID">
          </el-table-column>
          <el-table-column
              prop="department"
              label="岗位代号"
          >
          </el-table-column>
          <el-table-column
              prop="nick"
              label="岗位名称"
          >
          </el-table-column>
          <el-table-column label="是否停用" prop="quit">
            <template slot-scope="scope">
              <el-tag type="success" v-if="!scope.row.online">正常</el-tag>
              <el-tag type="warning" v-else>停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="date"
              label="创建日期"
          >
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
      <el-dialog title="新增岗位" :visible.sync="dialogadd" width = "30%">
        <el-form :rules="insertRule" ref="ruleForm"  :model="addform">
          <el-form-item label="岗位代号:" :label-width="formLabelWidth" prop="department">
            <el-input v-model="addform.department" autocomplete="off" class="sBox"
                      placeholder="请输入岗位代号"></el-input>
          </el-form-item>
          <el-form-item label="岗位名称:" :label-width="formLabelWidth" prop="nick">
            <el-input v-model="addform.nick" autocomplete="off" class="sBox"
                      placeholder="请输入岗位名称"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogadd = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <!--            :rules="insertRule" ref="ruleForm"-->
      <el-dialog title="岗位编辑" :visible.sync="dialogFormVisible">
        <el-form :inline="true" :model="upfrom">
          <el-form-item label="ID:" :label-width="formLabelWidth" prop="department">
            <el-input v-model="upfrom.id" autocomplete="off" class="sBox" disabled></el-input>
          </el-form-item>
          <el-form-item label="岗位代号:" :label-width="formLabelWidth" prop="department">
            <el-input v-model="upfrom.department" autocomplete="off" class="sBox"></el-input>
          </el-form-item>
          <el-form-item label="岗位名称:" :label-width="formLabelWidth" prop="nick">
            <el-input v-model="upfrom.nick" autocomplete="off" class="sBox"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modify">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import service from "@/service";


export default {
  name: 'department',
  data() {
    return {
      total: 0,
      tableData: [],
      multipleSelection: [],
      ss: '',
      page: 1,
      dialogFormVisible: false,
      dialogadd: false,
      addform: {
        nick: '',//岗位名称
        department: '',//岗位代号
      },
      upfrom: {
        id: '',
        nick: '',
        department: '',
      },
      loading: false,
      insertRule: {},
      formLabelWidth: '120px',
      select: true,

    }
  },
  mounted() {
    this.loadData(1)
  },
  methods: {
    cell_style() {
      return "height:2vh";
    },
    header_cell_style() {
      return "background:#f8f8f9";
    },
    loadData(page) {
      this.loading = true
      setTimeout(() => {
        service.GET("/dep/all_department_page?page=" + page, resp => {
          this.tableData = resp.data.data.limit_data
          this.loading = false
          this.total = resp.data.data.count
          if (this.tableData.length === 0 && this.page - 1 !== 0) {
            this.loaddata(this.page - 1)
          }
          console.log(this.total)
        })
      }, 100)
    },
    search() {//查询方法
      service.GET("/dep/somedepartment?query=" + this.ss + "&page=" + this.page, resp => {
        console.log(resp)
        this.tableData = resp.data.data.limit_data
      })

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length !== 0) {
        this.select = false
      } else {
        this.select = true
      }
    },
    edit(i, r) {//修改显示
      this.dialogFormVisible = true
      this.upfrom.id = r.id
      this.upfrom.nick = r.nick
      this.upfrom.department = r.department
    },
    toDelete(i, r) {//删除方法
          service.GET("/dep/delete_department?id=" + r.id,resp => {
          console.log(resp)
          console.log(r.id)
        })
        this.$message.error("删除成功")
        this.loadData(this.page);

    },
    changePage() {

    },
    add() {//添加方法
        if (this.addform.nick && this.addform.department) {
            service.POST("/dep/insert_department", this.addform,resp => {
            console.log(resp)
            this.$message.success("添加成功")
          })
          this.dialogadd = false
          this.loadData(this.page);
        } else {
          this.$message.warning("请检查表单内容，不能为空")
          return
        }
      this.dialogadd = false
    },
    modify() {//修改
      service.POST("/dep/update_department", this.upfrom, resp => {
        console.log(resp)
        if (resp.data.code === 200) {
          this.$message.success("修改成功")
        }
      })
      this.dialogFormVisible = false
      this.loadData(this.page);
      this.dialogFormVisible = false

    },
    batch_Delete() {//批量删除
      service.POST("/dep/batch_Delete", this.multipleSelection, resp => {
        this.$message.error("删除成功")
        this.loadData(this.page)
      })
    },

  }
};
</script>
<style lang="less">
@import "@/assets/css/department.less";

</style>
