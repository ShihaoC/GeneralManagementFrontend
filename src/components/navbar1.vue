<template>
  <div>
    <!-- 根据实际情况做修改 -->
    <el-menu-item
        v-for="(item,index) in navlist"
        :key="item.data.sindex"
        v-if="item.children.length == 0"
        :index="item.path"
    >
      <i class="iconfont zhzyyuandianxiao"></i>
      <span>{{item.label}} {{index}}</span>
    </el-menu-item>
    <el-submenu
        v-for="(item,index) in navlist"
        :key="item.data.sindex"

        v-if="item.children.length != 0"
        :index="item.path"
    >
      <template slot="title">
        <i class="iconfont zhzyyuandianxiao"></i>
        <span>{{item.label}}</span>
      </template>
      <NavMenu :navlist="item.children"></NavMenu>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: ["navlist"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='scss' >
//如果没有此样式的话  折叠有子级菜单的父菜单文字是不会隐藏的
.el-menu--collapse .el-menu-item span,
.el-menu--collapse .el-submenu .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
// .el-menu{
//   width: 200px;
//    .el-submenu__icon-arrow{
//     opacity: 1;
//   }
// }
// .el-menu--collapse{
//   width: 60px!important;
//   .el-submenu__icon-arrow{
//     opacity: 0;
//   }
// }
</style>
