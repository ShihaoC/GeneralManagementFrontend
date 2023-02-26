<template>
  <div id="Role_Auth_main">
    <el-tree
        :data="TreeData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checked"
        @check="checking"
        ref="tree">
    </el-tree>
    <el-button type="primary" @click="upload">提交</el-button>
    <el-button type="primary" @click="loadDefaultChecked">重置</el-button>
    <input type="text" v-model:value="role_id"><input type="button" value="测试" @click="test">
  </div>
</template>

<script>
import service from "@/service";

export default {
  name: "Role_Authority",
  data(){
    return{
      TreeData: [],
      checked: [],
      role_id: 1
    }
  },
  mounted() {

    this.role_id = this.$route.query.role_id;
    service.get("/auth/getAuthority?role_id=1",(resp)=>{
      this.TreeData = resp.data.data
    });
    service.get("/auth/default_check?role_id=1",resp=>{
      this.checked = resp.data.data
    })

  },
  methods:{
    loadDefaultChecked(){
      service.get("/auth/default_check?role_id="+this.role_id,resp=>{
        this.checked = resp.data.data
      })
    },
    upload(){
      service.post("/auth/update?role_id="+this.role_id,this.checked,resp=>{
        console.log(resp)
      })
    },
    checking(a,b,c){
      console.log(a,b,c)
      this.checked = b.checkedKeys
      console.log(this.checked)
    },
    test(){
      this.loadDefaultChecked()
      setTimeout(()=>{this.$refs.tree.setCheckedKeys(this.checked)},200)

    }
  }
}
</script>

<style>

</style>