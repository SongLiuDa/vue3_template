<template>
  <van-field
    class="my-input"
    :model-value="modelValue"
    v-bind="$attrs"
    :label="fieldLabel"
    @update:model-value="handleChange"
  >
    <template #label>
      <span>{{ fieldLabel }}</span>
      <span v-if="$attrs.optional" class="optional">（选填）</span>
    </template>
  </van-field>
</template>

<script setup>
import { toRefs } from 'vue'
const porps = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  fieldLabel: String
})
const emit = defineEmits(['update:model-value'])
const { modelValue } = toRefs(porps)
function handleChange (e) {
  emit('update:model-value', e)
}

</script>

<script>
export default { name: 'AppInput' }
</script>

<style scoped lang='scss'>
.optional{
  color: $color99;
}
</style>
