<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ name: 'SvgIcon' })

const props = defineProps({
  iconClass: String
})
const iconName = computed(() => `#icon-${props.iconClass}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
