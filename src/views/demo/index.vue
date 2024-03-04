<template>
  <div>
    <div>
      <div>a1</div>
      <input v-model="dataForm.info.a1">
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'Demo' })

const dataForm = defineModel({
  type: Object
})

</script>

<style scoped lang='scss'>
</style>
