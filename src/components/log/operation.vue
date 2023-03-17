<template>
  <!--    <h1>操作日志</h1>-->
  <div class="container">
    <div class="post-main">
      <div class="up">
        <el-button :disabled="select" type="danger" @click="batch_Delete" icon="el-icon-close" plain
                   size="small">批量删除
        </el-button>
        <el-button type="primary" @click="exportExcel" icon="el-icon-download" plain
                   size="small">导出Excel
        </el-button>
        <el-button type="info" @click="clear" icon="el-icon-delete" plain
                   size="small">清空日志
        </el-button>
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
                prop="module"
                label="操作模块"
            >
            </el-table-column>
            <el-table-column
                prop="type"
                label="操作接口"
            >
            </el-table-column>
            <el-table-column
                prop="request_type"
                label="请求方式"
            >
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作地址"
            >
            </el-table-column>
            <el-table-column
                prop="date"
                label="操作日期"
            >
            </el-table-column>
            <el-table-column
                prop="user"
                label="操作人员"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot="header" slot-scope="scope">
                <el-input
                    v-model="ss"
                    size="mini"
                    placeholder="输入操作类型名称搜索"
                    @change="search"/>
              </template>
            </el-table-column>

          </el-table>
        </div>
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

    </div>
  </div>
</template>

<script>
import service from "@/service";

export default {
  name: 'operation',
  data() {
    return {
      total: 0,
      select: true, page: 1,
      loading: false,
      ss: '',
      tableData: [], multipleSelection: [],
    }
  },
  mounted() {
    this.loadData(1)
  },
  methods: {
    changePage(p) {
      this.loadData(p)
    },
    loadData(page) {
      this.loading = true
      setTimeout(() => {
        service.GET("/log/getLogs?module=" + this.ss + "&page=" + page, resp => {
          console.log(resp)
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
    cell_style() {
      return "height:2vh";
    },
    header_cell_style() {
      return "background:#f8f8f9";
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length !== 0) {
        this.select = false
      } else {
        this.select = true
      }
    },
    search() {//查询方法
      service.get("/log/getLogs?module=" + this.ss + "&page=" + this.page, resp => {
        console.log(resp)
        this.tableData = resp.data.data.limit_data
      })

    },
    batch_Delete() {
      service.POST("/log/del", this.multipleSelection, resp => {
        this.$message.success("删除成功")
        this.loadData(this.page)
      })
    },
    exportExcel(){
      service.download("/log/export_excel","log")
    },
    clear(){
      service.GET("/log/clear",resp=>{
        console.log(resp)
        this.loadData(1)
      })
    }
  }
}
</script>
<style lang="less">
@import "@/assets/css/department.less";
</style>
