<template>
  <div class="container" v-loading="loading">
    <div id="resource-main">
      <div id="resource-top-title">
        <div id="resource-top-title-item">
          <span>资源概览</span>
        </div>
      </div>
      <div id="resource-top-container">
        <div class="resource-top-container-item">
          <div class="resource-top-container-item-title">
            <span class="resource-top-container-item-title-text">
              <span>&nbsp;&nbsp; CPU</span>
            </span>
          </div>
          <div class="resource-top-container-item-box">
            <el-table
                :data="CPUTable"
                style="width: 95%;height: 100%"
                :header-row-style="{height:'40px'}" :header-cell-style="{background:'#ffffff',padding:'0px'}"
                :row-style="{height:'40px'}" :cell-style="{padding:'0px'}"
            >
              <el-table-column
                  prop="prop"
                  label="属性"
              >
              </el-table-column>
              <el-table-column
                  prop="value"
                  label="值"
              >
              </el-table-column>
            </el-table>
          </div>

        </div>
        <div class="resource-top-container-item">
          <div class="resource-top-container-item-title">
            <span class="resource-top-container-item-title-text">
              <span>&nbsp;&nbsp; MEM</span>
            </span>
          </div>

          <div class="resource-top-container-item-box">
            <el-table
                :data="MemTable"
                style="width: 95%;height: 100%"
                :header-row-style="{height:'40px'}" :header-cell-style="{background:'#ffffff',padding:'0px'}"
                :row-style="{height:'40px'}" :cell-style="{padding:'0px'}"
            >
              <el-table-column
                  prop="prop"
                  label="属性"
              >
              </el-table-column>
              <el-table-column
                  prop="value"
                  label="值"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>
      <div id="resource-middle">
        <div id="resource-middle-title-item">
          <span>历史调用</span>
        </div>
      </div>
      <!--            折线图-->

      <div id="resource-echarts">
        <BasicChart class="resource-echarts-item" :data_field="fileid_data" :title="'接口调用次数'" :id="'test1'" :name="'interface'" :chart-style="'width: 50%; height: 400px;'" :line_data="line_data" :api="'/api/count'"></BasicChart>
        <BasicChart class="resource-echarts-item" :data_field="fileid_data" :title="'登录次数'" :id="'test2'" :name="'login'" :chart-style="'width: 50%; height: 400px;'" :line_data="['0','0','0','0','0','0']" :api="'/api/count'"></BasicChart>
      </div>
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
  name: "resource",
  mounted() {
    this.loading = true
    newAxios.get("/system/cpu").then((resp) => {
      this.CPUTable = resp.data
      this.loading = false
    })
    newAxios.get("/system/mem").then((resp) => {
      this.MemTable = resp.data

    })
    newAxios.get("/api/count").then((resp)=>{
      this.line_data = resp.data
    })
    setInterval(() => {
      this.loadSystemInformation()
    }, 5000)
    this.getFileidData()
  },
  data() {
    return {
      CPUTable: [],
      MemTable: [],
      loading: false,
      line_data: [],
      fileid_data: []
    }
  },
  methods: {
    getFileidData(){
      let minute = 30;
      for (let i = 0; i < 15; i++) {
        this.fileid_data[i] = minute+"min"
        minute-=2;
      }
      console.log(this.fileid_data)

    },
    header_cell_style() {
      return "height: 10%";
    },
    cell_style() {
      return "height:";
    },
    loadSystemInformation() {
      newAxios.get("/system/cpu").then((resp) => {
        this.CPUTable = resp.data
      })
      newAxios.get("/system/mem").then((resp) => {
        this.MemTable = resp.data
      })
    }
  }
}
</script>

<style lang="less">
@import "@/assets/css/resource.less";
</style>