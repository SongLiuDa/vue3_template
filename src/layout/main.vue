<template>
  <main class="app-main">
    <RouterView v-slot="{ Component }">
      <KeepAlive :include="app._cachedViews">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
</template>

<script setup>
import useStore from '@/store'
const { app } = useStore()
</script>

<script>
export default { name: 'AppMain' }
</script>

<style lang='scss' scoped>
.app-main{
  // tabbar 高度
  padding-bottom: calc(.98rem + env(safe-area-inset-bottom));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
