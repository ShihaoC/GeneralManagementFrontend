<template>
  <div id="navMenu">
    <label v-for="item in items">
      <el-menu-item :index="item.data.path" v-if="item.children.length === 0">
        <i :class="item.data.icon"></i>
        <span slot="title">{{ item.data.name }}</span>
      </el-menu-item>
      <el-submenu :index="item.data.path" v-else>
        <template slot="title">
          <i :class="item.data.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        <navbar :items="item.children"></navbar>
      </el-submenu>
    </label>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: ["items"]
}
</script>

<style scoped>

</style>