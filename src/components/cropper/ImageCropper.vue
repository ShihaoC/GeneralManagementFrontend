<template>
  <div class="cropper" style="width: 500px;height: 500px">
    <input type="file" @change="tirggerFile($event)">
    <vue-cropper @change="change" ref="cropper" :img="image" :output-size="option.size" :output-type="option.outputType"
                 :info="true" :full="option.full" :fixed="true"
                 :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
                 :original="option.original"
                 :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
                 :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"
                 mode="cover"></vue-cropper>
      <button @click="test">test</button>

  </div>

</template>

<script>
export default {
  name: "ImageCropper",
  data() {
    return {
      option: {
        img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 160,
        autoCropHeight: 150,
        centerBox: false,
        high: true,
        max: 99999
      },
      image: null,
      imagee: null
    }
  },
  methods:{
    tirggerFile(event){
      var file = event.target.files[0]
      var reader = new FileReader();
      reader.onload = (e) =>{
        let data;
        if(typeof e.target.result === 'object'){
          data = window.URL.createObjectURL(new Blob([e.target.result]))

        }
      }
      console.log(reader.readAsArrayBuffer(file));
      console.log(event.target.files);
      this.option.img = event.target.files[0]
    },
    change(){
      this.$refs.cropper.getCropBlob((data)=>{
        this.image = data
        console.log(this.image)
      })
    },
    test(){
      this.$refs.cropper.getCropBlob((data)=>{
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>

</style>