<template>
  <div class="app-wrapper">
    <AppMain />
    <AppTabbar />
  </div>
</template>

<script setup>
import AppMain from './main.vue'
import AppTabbar from './tabbar.vue'

</script>

<script>
export default { name: 'Layout' }
</script>
