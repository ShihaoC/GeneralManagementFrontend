<template>
  <div>
    <div id="editor">
    </div>
    <div>
      <el-button @click="submit">默认按钮</el-button>
    </div>

    <div id="editor1" v-html="text" class="ql-editor">

    </div>
  </div>

</template>

<script>
import Quill from 'quill';
let quill = null;
export default {
  name: "Quill",
  mounted() {
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

    ];

    quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });

    new Quill("#editor1",{
      modules: {
        toolbar: false
      },
      theme: 'snow',
      readOnly: true
    })
  },
  data(){
    return{
      text: ''
    }
  },
  methods:{
    submit(){
      this.text = quill.container.firstChild.innerHTML
      console.log(quill.container.firstChild.innerHTML)
    }
  }
}
</script>

<style>
@import 'quill/dist/quill.snow.css';
@import "quill/dist/quill.core.css";

#editor {
}
</style>