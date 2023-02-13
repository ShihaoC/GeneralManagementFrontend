<template>
    <div class="container">
        <div class="up">
<!--            el-icon-search-->
            <span>员工名称</span>
            <el-input v-model= "input" placeholder="请输入员工名称"></el-input>
            <span>员工手机号</span>
            <el-input v-model= "input" placeholder="请输入员工手机号"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary">新增</el-button>
            <el-button type="success">修改</el-button>
            <el-button type="danger">删除</el-button>
        </div>
        <div class="block">
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>
            <span class="demonstration">页数较少时的效果</span>
            <el-pagination
                    layout="prev, pager, next"
                    :total="50">
            </el-pagination>
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
<style>

</style>
