<template>
  <Notice :notices="notices"></Notice>
</template>
<script>
export default {
  data(){
    return{
      notices:[
        {
          context: '<p><strong><em><s><u>12</u></s></em></strong></p>',
          id: '1'
        },
        {
          context: '<p><strong><em><s><u>123</u></s></em></strong></p>',
          id: '2'
        },
        {
          context: '<p><strong><em><s><u>1231</u></s></em></strong></p>',
          id: '3'
        },
        {
          context: '<p><strong><em><s><u>12312</u></s></em></strong></p>',
          id: '4'
        }
      ]
    }
  }
}

</script>
<style>
</style>
