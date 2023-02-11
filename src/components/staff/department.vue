<template>
    <h1>员工部门</h1>
    <div class="container">
        <div class="table">
            <!--        <el-pagination-->
            <!--                background-->
            <!--                layout="prev, pager, next"-->
            <!--                :total="1000">-->
            <!--        </el-pagination>-->

            <el-pagination
                    layout="prev, pager, next"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pagesize"
                    :total="count"
                    @prev-click="prev"
                    @current-change="change"
                    @next-click="next"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>

</script>
<style>
</style>
