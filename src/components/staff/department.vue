<template>
    <div class="container">
        <div class="aa"></div>
        <div>
            <div class="up">
                <!--            el-icon-search-->
                <span style="font-weight: bold" >员工名称:</span>
                <span>&nbsp;&nbsp;</span>
                <el-input class="sBox" v-model= "input" placeholder="请输入员工名称"></el-input>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style="font-weight: bold">员工手机号:</span>
                <span>&nbsp;&nbsp;</span>
                <el-input  class="sBox" v-model= "input" placeholder="请输入员工手机号"></el-input>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <div class="bb">

                <el-button type="success" icon="el-icon-edit" > 修改</el-button>
                <el-button type="danger" icon="el-icon-delete" >删除</el-button>
                <el-button type="warning" icon="el-icon-upload2" >导入</el-button>
                <el-button type="info" icon="el-icon-download" >导出</el-button>
            </div>
            <div class="block">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="data"
                            label="入职日期">
                    </el-table-column>
                    <el-table-column
                            prop="post"
                            label="职位">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="是否打卡(今日)">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="此工程数">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="是否离职">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="工程名称">
                    </el-table-column>
                </el-table>
                <!--            <span class="demonstration">页数较少时的效果</span>-->
                <el-pagination
                        layout="prev, pager, next"
                        :total="50">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                input: ''
            }
        }
    }
</script>
<style lang="less">
    .sBox{
      width: 15vw;
      //width: 10vw;
      //position: relative;
      ////left: 20px;
      ////right: 20px;
      //text-align: center;
    }
    .block{
      //position: relative;
      width: 87vw;
      text-align: center;
    }
    .container{
      margin: 1vw 0vw 1vw 1vw;
    }
    .aa{
      width:0vw;
      height: 14vh;
      float: left;
    }
    .bb{
        margin: 1vw 0vw 0vw  0vw ;
    }

</style>
