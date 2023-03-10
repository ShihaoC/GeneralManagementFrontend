<template>
  <div class="container">
    <div id="menu-main">
      <div class="up">
        <span>&nbsp;&nbsp;</span>
      </div>
      <div class="block">
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
              prop="label"
              label="名称"
              sortable
              >
          </el-table-column>
          <el-table-column
              prop="data.id"
              label="ID"
              sortable
              >
          </el-table-column>
          <el-table-column
              prop="data.icon"
              label="图标"
              sortable
              >
          </el-table-column>
          <el-table-column
              prop="data.path"
              label="地址">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/service";
export default {
  name: "menu-manage",
  data(){
    return{
      tableData: []
    }
  },
  mounted() {
    service.GET("/menu/allMenus",resp=>{
      console.log(resp.data.data)
      this.tableData = resp.data.data
    })
  }
}
</script>

<style lang="less">
@import "@/assets/css/department.less";

</style>