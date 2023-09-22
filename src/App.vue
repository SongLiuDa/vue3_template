<template>
  <div class="app">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>

<script setup>
// import { computed } from 'vue'
// import { getToken } from '@/utils/auth'
// import { useRoute } from 'vue-router'
// const route = useRoute()
// const urlSign = computed(() => route.query.urlSign)
// if ( urlSign !== getToken() ){

// }
</script>
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
