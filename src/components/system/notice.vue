<template>
  <div class="container" v-loading="false">
    <div id="notice-main">
      <div class="up">
        <el-button type="primary" @click="toInsert" icon="el-icon-edit" size="mini" plain>
          发布通知
        </el-button>

        <span>&nbsp;&nbsp;</span>
        <el-button :disabled="select" type="danger" @click="bench_delete" icon="el-icon-close" size="mini" plain>
          批量删除
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
              prop="context"
              label="内容">
          </el-table-column>
          <el-table-column
              prop="timeout"
              label="超时时间">
            <template slot-scope="scope">
              {{ scope.row.timeout }} s
            </template>
          </el-table-column>
          <el-table-column
              prop="type"
              label="类型">
          </el-table-column>



          <el-table-column label="操作">
            <template slot="header" slot-scope="scope">
              <el-input
                  v-model="ss"
                  size="mini"
                  placeholder="输入关键字搜索"
                  @change="loadData()"/>
            </template>
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="about(scope.$index, scope.row)">详情
              </el-button>
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
      </div>
      <div>
        <el-dialog
            title="发布公告"
            :visible.sync="insertVisible"
            width="60%"
            :before-close="handleCloseInsert">
          <el-form ref="form" :model="inputForm" label-width="80px">
            <el-form-item label="内容"><div id="editor" ></div></el-form-item>
            <el-form-item label="过期时间"><el-input v-model="inputForm.Timeout"></el-input></el-form-item>

          </el-form>

          <span slot="footer" class="dialog-footer">
    <el-button @click="insertVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
        </el-dialog>
      </div>
      <div>
        <el-dialog
            title="修改公告"
            :visible.sync="updateVisible"
            width="60%"
            :before-close="handleCloseUpdate">
          <el-form ref="form" :model="updateForm" label-width="80px">
            <el-form-item label="内容"><div id="editor1" ></div></el-form-item>
            <el-form-item label="过期时间"><el-input v-model="updateForm.timeout"></el-input></el-form-item>

          </el-form>

          <span slot="footer" class="dialog-footer">
    <el-button @click="updateVisible = false">取 消</el-button>
    <el-button type="primary" @click="update">确 定</el-button>
  </span>
        </el-dialog>
      </div>
      <div>
        <el-dialog
            title="预览公告"
            :visible.sync="aboutVisible"
            width="30%"
            :before-close="handleCloseInsert">
          <div class="ql-editor" v-html="abouthtml"></div>

        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill';
import service from "@/service";

let quill = null;
let quill1 = null;

let count = 0;
let count1 = 0;
export default {
  name: "notice1",
  created() {

  },
  mounted() {
    this.loadData()

    setInterval(() => {
      this.loadData()
    }, 2000)

  },
  data() {
    return {
      updateVisible: false,
      tableData: [],
      loading: false,
      ss: '',
      insertVisible: false,
      timeout: -1,
      context: '',
      inputForm:{
        context: '',
        Timeout: -1
      },
      notices: [],
      aboutVisible: false,
      abouthtml: '',
      select: true,
      updateForm: {

      },
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length !== 0) {
        this.select = false
      } else {
        this.select = true
      }
    },
    cell_style() {
      return "height:2vh";
    },
    header_cell_style() {
      return "background:#f8f8f9";
    },
    loadData() {
      service.GET("/Notice/getAllNotice",resp=>{
        this.tableData = resp.data.data
        this.notices = resp.data.data
      })
    },
    bench_delete(){
      service.POST("/Notice/bench_delete",this.multipleSelection,resp=>{
        this.loadData()
      })
    },
    edit(index,row) {
      setTimeout(()=>{
        if(count1 !== 1 && count1 === 0){
          var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            [{'direction': 'rtl'}],                         // text direction

            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            [{'color': []}, {'background': []}],          // dropdown with defaults from theme
            [{'font': []}],
            [{'align': []}],

          ];

          quill1 = new Quill('#editor1', {
            modules: {
              toolbar: toolbarOptions
            },
            theme: 'snow'
          });
          count1 ++;
        }
        quill1.container.firstChild.innerHTML = row.context
      },20)
      this.updateForm = row
      this.updateVisible = true
    },
    toDelete(index,row) {
      service.GET("/Notice/delete?id="+row.id,resp=>{
        this.loadData()
      })
    },
    handleCloseInsert() {
      this.insertVisible = false
      this.aboutVisible = false
    },
    handleCloseUpdate(){
      this.updateVisible = false
      quill1.disable()
    },
    about(index,row){
      this.abouthtml = row.context
      this.aboutVisible = true
    },
    update(){
      this.updateForm.context = quill1.container.firstChild.innerHTML
      service.POST("/Notice/update",this.updateForm,resp=>{
        console.log(resp)
        this.updateVisible = false
        this.loadData()
      })
    },
    loadQuill() {
      if(count !== 1 && count === 0){
        this.insertVisible = true
        var toolbarOptions = [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

          [{'header': 1}, {'header': 2}],               // custom button values
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
          [{'direction': 'rtl'}],                         // text direction

          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
          [{'header': [1, 2, 3, 4, 5, 6, false]}],

          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          [{'font': []}],
          [{'align': []}],

        ];

        quill = new Quill('#editor', {
          modules: {
            toolbar: toolbarOptions
          },
          theme: 'snow'
        });
        count ++;
      }
    },
    toInsert(){
      setTimeout(()=>{
        this.loadQuill()
      },0)
      this.insertVisible = true
    },
    submit(){
      this.insertVisible = false
      this.inputForm.context = quill.container.firstChild.innerHTML
      service.POST("/Notice/insert/"+this.inputForm.Timeout,this.inputForm,resp=>{
        this.loadData()
      })
    }
  }
}
</script>

<style>
@import "@/assets/css/department.less";
@import 'quill/dist/quill.snow.css';
@import "quill/dist/quill.core.css";
</style>