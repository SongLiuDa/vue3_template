<template>
  <div class="app">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss" scoped>
.app{
  max-width: 7.5rem;
  margin: 0 auto;
}
</style>
