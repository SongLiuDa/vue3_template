<template>
  <van-field
    :rules="rules"
    :label="fieldLabel"
    class="custom-field my-radio"
    :class="{'is-max': isMax}"
  >
    <template #input>
      <van-radio-group
        :model-value="modelValue"
        :direction="direction"
        :disabled="disabled"
        @update:model-value="handleChange"
      >
        <template v-for="item in columns">
          <van-radio
            v-if="!item.hide"
            :key="item.value"
            :name="item.value"
          >{{ item.label }}</van-radio>
        </template>
      </van-radio-group>
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
  direction: {
    type: String,
    default: 'horizontal'
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  columns: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fieldLabel: String,
  isMax: {
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
export default { name: 'AppRadio' }
</script>
<style lang="scss">
.my-radio{
  &.is-max{
    padding-bottom: 8px;
    .van-radio{
      margin-bottom: 8px;
    }
  }
}
</style>
