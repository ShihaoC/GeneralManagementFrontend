<template>
  <div :id="name" v-html="text" class="ql-editor">
  </div>
</template>

<script>
import Quill from "quill";

export default {
  name: "notice-item",
  props: ["text","name"],
  mounted() {
    let docu = document.getElementById(name)
  }
}
</script>

<style>
@import 'quill/dist/quill.snow.css';
@import "quill/dist/quill.core.css";
</style>