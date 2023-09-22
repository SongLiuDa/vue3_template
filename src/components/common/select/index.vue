<template>
  <van-field
    :model-value="modelValue"
    is-link
    readonly
    v-bind="$attrs"
    class="app-select"
    :class="{'is-select':showPicker }"
    @click="showPicker = true"
  />
  <van-popup
    v-model:show="showPicker"
    round
    position="bottom"
  >
    <van-picker
      :columns="columns"
      :title="title"
      confirm-button-text="Choice"
      cancel-button-text="Cancel"
      item-height=".76rem"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  title: String,
  columns: {
    type: Array,
    defaule: () => {}
  }
})
const emit = defineEmits(['update:modelValue'])
const showPicker = ref(false)
function onConfirm (val) {
  emit('update:modelValue', val)
  showPicker.value = false
}
</script>

<script>
export default {
  name: 'AppSelect',
  inheritAttrs: false
}
</script>

<style lang='scss'>
.app-select{
  &::after{
    display: none;
  }
  .van-badge__wrapper{
    position: absolute;
    right: .42rem;
    top: .42rem;
    transform: translateY(-50%);
    transition: all .2s ease-in;
  }
  &.is-select{
    .van-badge__wrapper{
      transform: translateY(-50%) rotate(90deg);
    }
  }
}
</style>
