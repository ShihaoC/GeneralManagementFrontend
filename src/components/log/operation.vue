<template>
    <!--    <h1>操作日志</h1>-->
    <div class="container">
        <div class="post-main">
            <div class="up">
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
                            prop="Otype"
                            label="操作类型"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="ip"
                            label="操作地址"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="操作日期"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="Operator"
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
                total:0,
                page: 1,
                loading: false,
                ss:'',
                tableData:[],
            }
        },
        mounted() {
        },
        methods:{
            changePage(){

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

            },
        }
    }
</script>
<style lang="less">
    @import "@/assets/css/department.less";
</style>
