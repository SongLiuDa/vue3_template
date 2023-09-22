<template>
  <van-field
    ref="input"
    :model-value="modelValue"
    :type="type"
    v-bind="$attrs"
    :rules="defaultBlur"
    class="password-input"
    @update:model-value="emitInput"
  >
    <template #right-icon>
      <button type="button" @click="toggle">
        <svg-icon class="icon" :icon-class="type === 'password' ? 'eye' : 'eye-open'" />
      </button>
    </template>
  </van-field>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { defaultBlur } from '@/utils/rules'

defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])
function emitInput (val) {
  emit('update:modelValue', val)
}
const type = ref('password')
const input = ref(null)
function toggle() {
  type.value = type.value === 'password' ? '' : 'password'
  nextTick(() => {
    input.value.focus()
  })
}
</script>

<script>
export default { name: 'AppPasswordInput' }
</script>

<style lang='scss'>
.password-input{
  .van-field__right-icon{
    margin-right: 0;
    padding: 0;
    display: flex;
    align-items: center;
    button{
      background: #fff;
      padding: 0 .3rem;
      font-size: .4rem;
    }
  }
}
</style>
