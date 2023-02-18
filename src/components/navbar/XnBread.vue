<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <template v-for="item in list">
      <el-breadcrumb-item v-if="item.path" :to="{path:item.path}" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else :to="{path:'/'}" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "XnBread",
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
  computed: {
    list() {
      return this.$route.matched;
    },
  }
}
</script>

<style scoped>

</style>