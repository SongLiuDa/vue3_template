<template>
  <div class="tabbar-wrapper">
    <div class="bar-menu flex">
      <div
        v-for="item in tabbarConfig"
        :key="item.path"
        class="tabbar-item"
      >
        <RouterLink
          :to="item.path"
          class="router-link e-active"
          :class="{
            'active-link':activeMenu === item.path,
          }"
        >
          <SvgIcon
            class="icon"
            :icon-class="getIcon(item)"
          />
          <span class="tabbar-text f24 w500">{{ item.title }}</span>
        </RouterLink>
      </div>
    </div>
    <div class="safe-area-inset-bottom" />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { tabbarConfig } from './config'
import { useRoute } from 'vue-router'
import useStore from '@/store'
const { app } = useStore()
const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
function getIcon(item) {
  return activeMenu.value === item.path ? `active-${item.iconClass}` : item.iconClass
}
watch(() => route, (val, oldVal) => {
  app.addCachedView(val)
}, {
  immediate: true
})
</script>

<script>
export default { name: 'AppTabbar' }
</script>

<style lang='scss' scoped>
.tabbar-wrapper{
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 7.5rem;
  background: #fff;
  box-shadow: 0px -4px 8px 0px rgba(153,153,153,0.08);
  z-index: 999;
  .bar-menu{
    height: .98rem;
  }
  .safe-area-inset-bottom{
    height: env(safe-area-inset-bottom);
  }
  .tabbar-item{
    flex: 1;
  }
  .router-link{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $colorCc;
    transition: color .2s ease-in;
    &.active-link{
      color: $blue;
    }
    .icon{
      font-size: .44rem;
    }
    .tabbar-text{
      margin-top: .10rem;
      line-height: .24rem;
    }
  }
}
</style>
