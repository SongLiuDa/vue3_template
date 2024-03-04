<template>
  <div>
    <div>home</div>
    {{ dataForm }}
    <Demo v-model="dataForm" />
    <AppFooter />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Demo from '../demo'
defineOptions({ name: 'Home' })

const dataForm = reactive({
  info: {
    a1: undefined
  }
})

</script>

<style scoped lang='scss'>
</style>
