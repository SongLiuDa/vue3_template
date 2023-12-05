<template>
  <van-field
    :rules="rules"
    class="custom-field my-checkbox"
  >
    <template #input>
      <van-checkbox-group
        :model-value="modelValue"
        direction="horizontal"
        :disabled="disabled"
        @update:model-value="handleChange"
      >
        <van-checkbox
          v-for="item in path"
          :key="item.value"
          shape="square"
          :name="item.value"
        >{{ item.label }}</van-checkbox>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script setup>
import { defaultChange } from '@/utils/rules'
import { toRefs } from 'vue'
const porps = defineProps({
  rules: {
    type: Array,
    default: () => defaultChange
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  path: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:model-value'])
const { modelValue } = toRefs(porps)

function handleChange (e) {
  emit('update:model-value', e)
}
</script>

<script>
export default { name: 'AppCheckbox' }
</script>
