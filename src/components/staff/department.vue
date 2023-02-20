<!--岗位页面-->
<template>
  <div class="container">
    <div id="post-main">
      <div class="up">
        <el-button type="success" icon="el-icon-edit"  plain size="small"> 添加</el-button>
        <span>&nbsp;&nbsp;</span>
        <el-upload
            style="display: inline-block"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"

            :limit="3"
        >
          <el-button type="warning" icon="el-icon-upload2" plain size="small">导入</el-button>
        </el-upload>

        <span>&nbsp;&nbsp;</span>
        <el-button type="info"  icon="el-icon-download" plain size="small">导出</el-button>
      </div>
      <div class="block">
        <el-table
            ref="multipleTable"
            v-loading="false"
            :data="tableData"
            style="width: 100%;"
            :header-cell-style="header_cell_style"
            :cell-style="cell_style"
            @selection-change="handleSelectionChange">
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
      <el-dialog title="创建员工" :visible.sync="dialogadd">
        <el-form :rules="insertRule" ref="ruleForm" :inline="true" :model="addform">
          <el-form-item label="员工名称:" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addform.name" autocomplete="off" class="sBox" placeholder="请输入员工名称"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogadd = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Global from "@/views/Global.vue";

let newAxios = axios.create({
  baseURL: Global.baseUrl
})

export default {
  name: 'department',
  data(){
    return{
      total: 0,
      tableData: [],
      multipleSelection: [],
      ss: '',
      page: 1,
      dialogadd: true,
      addform:{
        name: ''
      },
      insertRule:{},
      formLabelWidth: '120px'

    }
  },
  mounted() {
    this.loadData(1)
  },
  methods:{
    cell_style() {
      return "height:2vh";
    },
    header_cell_style() {
      return "background:#f8f8f9";
    },
    loadData(page){
      newAxios.get("/dep/all_department_page?page="+page).then((resp)=>{
        console.log(resp)
        this.tableData = resp.data.data.limit_data

      })
    },
    search(){

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    edit(){

    },
    toDelete(){

    },
    changePage(){

    }

  }
};
</script>
<style lang="less">
@import "@/assets/css/department.less";

</style>
