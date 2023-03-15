<template>
  <div class="container" v-loading="ld">
    <div id="menu-main">
      <div class="up">
        <el-button type="primary" @click="openInsert" icon="el-icon-edit" size="mini" plain>
          添加菜单
        </el-button>

        <span>&nbsp;&nbsp;</span>
        <el-button type="info" @click="open" icon="el-icon-sort" size="mini" plain>
          展开/折叠
        </el-button>
      </div>
      <div class="block">
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            height="800"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            v-loading="loading"
            :header-cell-style="header_cell_style"
            :cell-style="cell_style"
            ref="listTable">
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
              prop="data.value"
              label="权限标识">
          </el-table-column>
          <el-table-column
              prop="data.path"
              label="地址">
          </el-table-column>
          <el-table-column
              prop="data.exclusions"
              label="地址">
            <template slot-scope="scope">
              <el-tag v-if="!scope.row.data.exclusions">未排除</el-tag>
              <el-tag v-else type="danger">排除</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300%">
            <template slot-scope="scope">
              <el-button
                  v-show="scope.row.data.type === '1'"
                  size="mini"
                  type="info"
                  plain
                  :disabled="scope.row.label === '首页'"
                  @click="handInsert(scope.$index, scope.row)">添加
              </el-button>
              <el-button
                  size="mini"
                  plain
                  :disabled="scope.row.label === '首页'"
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  v-show="scope.row.data.type === '1'"
                  size="mini"
                  plain
                  :disabled="scope.row.label === '首页'"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="form">
        <el-dialog title="添加菜单" :visible.sync="insertFormVisible" width="30%">
          <el-row :gutter="15">
            <el-form ref="form" :model="insertFormData" label-width="100px">
              <el-col :span="24">
                <el-form-item label="上级目录">
                  <el-select ref="selectName" clearable placeholder="请选择父级节点" :label="insertFormData.PName"
                             v-model="insertFormData.level"
                             @clear="handleClear" style="width: 100%">
                    <!-- option标签上写hidden隐藏 -->
                    <el-option hidden key="id" :value="insertFormData.level" :label="insertFormData.PName"
                               style="height: auto"></el-option>
                    <el-tree :data="parents" :props="DefaultProps" ref="tree" :expand-on-click-node="false"
                             :check-on-click-node="true" accordion
                             @node-click="nodeClick"></el-tree>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="菜单名称">
                  <el-input v-model="insertFormData.name" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="菜单图标">
                  <el-select v-model="insertFormData.icon" placeholder="请选择" style="width: 100%">
                    <el-option
                        v-for="item in icons"
                        :label="item.class"
                        :value="item.class">
                      <span style="float: left"> <i :class="item.class"></i> </span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.class }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="路由地址">
                  <el-input v-model="insertFormData.path" placeholder="请输入路由地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="权限标识">
                  <el-input v-model="insertFormData.value" placeholder="请输入权限标识"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否启用">
                  <el-radio v-model="insertFormData.menable" label="true">是</el-radio>
                  <el-radio v-model="insertFormData.menable" label="false">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否排除">
                  <el-radio v-model="insertFormData.Exclusions" label="true">是</el-radio>
                  <el-radio v-model="insertFormData.Exclusions" label="false">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否外链">
                  <el-radio v-model="insertFormData.isInternet" label="true">是</el-radio>
                  <el-radio v-model="insertFormData.isInternet" label="false">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否为权限">
                  <el-radio v-model="insertFormData.isRole" label="true">是</el-radio>
                  <el-radio v-model="insertFormData.isRole" label="false">否</el-radio>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="insertMenu()">保存</el-button>
            <el-button type="primary" @click="insertFormVisible = false">取消</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="update">
        <el-dialog title="修改菜单" :visible.sync="updateFormVisible" width="30%">
          <el-row :gutter="15">
            <el-form ref="form" :model="updateFormData" label-width="80px">
              <el-col :span="24">
                <el-form-item label="ID">
                  <el-input v-model="updateFormData.id" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="上级目录">
                  <el-select ref="selectName" clearable placeholder="请选择父级节点" :label="updateFormData.PName"
                             v-model="updateFormData.level"
                             @clear="handleClear" style="width: 100%">
                    <!-- option标签上写hidden隐藏 -->
                    <el-option hidden key="id" :value="updateFormData.level" :label="updateFormData.PName"
                               style="height: auto"></el-option>
                    <el-tree :data="parents" :props="DefaultProps" :expand-on-click-node="false"
                             :check-on-click-node="true" accordion
                             @node-click="nodeClick"></el-tree>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="菜单名称">
                  <el-input v-model="updateFormData.name" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="菜单图标">
                  <el-select v-model="updateFormData.icon" placeholder="请选择" style="width: 100%">
                    <el-option
                        v-for="item in icons"
                        :label="item.class"
                        :value="item.class">
                      <span style="float: left"> <i :class="item.class"></i> </span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.class }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="路由地址">
                  <el-input v-model="updateFormData.path" placeholder="请输入路由地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="权限标识">
                  <el-input v-model="updateFormData.value" placeholder="请输入权限标识"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否启用">
                  <el-radio v-model="updateFormData.menable" label="true">是</el-radio>
                  <el-radio v-model="updateFormData.menable" label="false">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否排除">
                  <el-radio v-model="updateFormData.Exclusions" label="true">是</el-radio>
                  <el-radio v-model="updateFormData.Exclusions" label="false">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否外链">
                  <el-radio v-model="updateFormData.isInternet" label="true">是</el-radio>
                  <el-radio v-model="updateFormData.isInternet" label="false">否</el-radio>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveChange()">保存</el-button>
            <el-button type="primary" @click="updateFormVisible = false">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/service";
import Icons from "@/assets/icon/icons";
export default {
  name: "menu-manage",
  data() {
    return {
      tableData: [],
      loading: false,
      opend: false,
      insertFormVisible: false,
      insertFormData: {
        level: null,
        PName: '',
        value: '',
        path: '',
        menable: 'true',
        Exclusions: 'true',
        isInternet: 'true',
        name: '',
        isRole: 'false'
      },
      parents: [],
      DefaultProps: {
        children: 'children',
        label: 'label',
      },
      formLabelWidth: '120px',
      icons:[],
      ld: false,
      updateFormVisible: false,
      updateFormData:{
        level: null,
        PName: '',
        value: '',
        path: '',
        menable: 'false',
        Exclusions: 'false',
        isInternet: 'false',
        name: '',
        id: 0
      },
      lv: 0
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize(search) {
      this.loading = true;
      service.GET("/menu/allMenus", resp => {
        this.tableData = resp.data.data
        this.loading = false;
      })
      service.GET("/menu/allParentNodes", resp => {
        this.parents = resp.data.data
      })
      this.icons = Icons
    },
    cell_style() {
      return "height:2vh";
    },
    header_cell_style() {
      return "background:#f8f8f9";
    },
    forTableData(arr, isExpand) {
      arr.forEach(i => {
        this.$refs.listTable.toggleRowExpansion(i, isExpand);
        if (i.children) {
          this.forTableData(i.children, isExpand)
        }
      })
    },
    open() {
      if (this.opend) {
        this.forTableData(this.tableData, false)
        this.opend = false
      } else {
        this.forTableData(this.tableData, true)
        this.opend = true;
      }
    },
    handleClear() {
      this.name = ''
      this.insertFormData.parentId = ''
    },
    //树节点点击事件
    nodeClick(data) {
      // 树形组件点击节点后，设置选择器的值
      this.name = data.name
      this.insertFormData.level = data.id
      this.insertFormData.PName = data.label
      this.updateFormData.level = data.id
      this.updateFormData.PName = data.label
      // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
      this.$refs.selectName.blur()
    },
    openInsert() {
      this.insertFormVisible = true;
    },
    insertMenu() {
      this.ld = true
      this.insertFormVisible = false
      service.POST("/menu/insert/"+this.insertFormData.Exclusions,this.insertFormData,resp=>{
        this.initialize()
        this.ld = false
      })
    },
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.GET("/menu/del/"+row.id,resp=>{
          this.initialize()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message.info("差点出事儿")
      });

    },
    handleEdit(index,row){
      this.updateFormData = row.data
      this.updateFormData.level = row.parentId
      this.updateFormVisible = true
      this.updateFormData.Exclusions = "false"
      this.updateFormData.isInternet = "false"
      this.updateFormData.menable = "false"
      this.lv = row.parentId
      console.log(row)
    },
    handInsert(index,row){
      this.insertFormData = row.data
      this.insertFormData.PName = row.label
      this.insertFormData.name = "";
      this.insertFormData.Exclusions = "false"
      this.insertFormData.isInternet = "false"
      this.insertFormData.menable = "false"
      this.insertFormVisible = true
    },
    saveChange(){
      console.log()
      var level = this.lv;
      if(level !== 0){
        if(this.updateFormData.level === 0 || this.updateFormData.level === undefined || this.updateFormData.level === null || this.updateFormData.level == ''){
          this.$message.warning("上级不能为空")
          return
        }
      }
      if(this.updateFormData.level == this.updateFormData.id){
        this.$message.warning("父级不能是节点本身")
        return;
      }
      service.POST("/menu/update",this.updateFormData,resp=>{

      })

    },

  }
}
</script>

<style lang="less">
@import "@/assets/css/department.less";
</style>