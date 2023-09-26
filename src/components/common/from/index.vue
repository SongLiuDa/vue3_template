<template>
  <van-form
    class="AppForm"
    scroll-to-error
    show-error
    v-bind="$attrs"
    :submit-on-enter="false"
    @submit="onSubmit"
  >
    <div class="form-inner">
      <van-row gutter="20" :align="rowAlign">
        <template v-for="item in _formItems" :key="item.prop">
          <van-col
            v-if="item._ifRender"
            :span="item.span || 24"
            :class="{
              'mt20':item.itemAttrs.mt,
              'mb20':item.itemAttrs.mb,
            }"
          >
            <div class="form-item">
              <div v-if="item.itemAttrs.label" class="label">
                <label>
                  {{ item.itemAttrs.label }}
                  <span v-if="item.itemAttrs.optional" class="label-optional">(选填)</span>
                </label>
              </div>
              <slot :name="item.itemAttrs.labelTipsSlot" />
              <slot
                :name="item.propKey? `${item.propKey}_${item.prop}` : item.prop"
              >
                <component
                  :is="item.tag"
                  v-if="item.propKey"
                  v-model="dataForm[item.propKey][item.prop]"
                  :name="`${item.propKey}_${item.prop}`"
                  v-bind="item.attrs"
                />
                <component
                  :is="item.tag"
                  v-else
                  v-model="dataForm[item.prop]"
                  :name="item.prop"
                  v-bind="item.attrs"
                />
              </slot>
            </div>
          </van-col>
        </template>
      </van-row>
    </div>
    <slot name="submit">
      <div class="button-group">
        <AppButton v-if="cancelText" @click="handleCancel">
          {{ cancelText }}
        </AppButton>
        <AppButton
          v-if="submitText"
          :disabled="sDisabled"
          type="primary"
          native-type="submit"
          :loading="sLoading"
        >
          {{ submitText }}
        </AppButton>
      </div>
    </slot>
  </van-form>
</template>

<script setup>
import { basic } from './config'
import { computed, toRefs } from 'vue'

const props = defineProps({
  formConfig: {
    type: Object,
    default: () => {}
  },
  dataForm: {
    type: Object,
    default: () => {}
  },
  cancelText: {
    type: String,
    default: ''
  },
  submitText: {
    type: String,
    default: ''
  },
  rowAlign: {
    type: String,
    default: 'bottom'
  },
  sLoading: {
    type: Boolean,
    default: false
  },
  sDisabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['handleCancel', 'submit'])
const { dataForm } = toRefs(props)
const _formItems = computed(() => props.formConfig.map(item => computeFormItem(item, props.dataForm)))
/**
 * @description: 计算form-item
 * @param {Object} formItem
 * @param {Object} dataForm
 * @return {Object}
 */
function computeFormItem(formItem, dataForm) {
  const item = { ...formItem }
  // 表单控件的类型
  const tag = item.tag || 'input'
  // 对应到组件映射表
  const basicItem = basic[tag]
  item.tag = basicItem.component
  // 继承基类的itemAttrs属性
  item.itemAttrs = Object.assign({}, basicItem.itemAttrs, item.itemAttrs)
  // 继承基类的attrs属性
  item.attrs = Object.assign({}, basicItem.attrs, item.attrs)
  // 获取动态 itemAttrs
  if (item.getItemAttrs) {
    item.itemAttrs = Object.assign(
      item.itemAttrs,
      item.getItemAttrs(dataForm)
    )
  }
  // 获取动态 attrs
  if (item.getAttrs) {
    item.attrs = Object.assign(item.attrs, item.getAttrs(dataForm))
  }
  // 获取动态 表单验证
  if (item.itemAttrs.optional || item.attrs.optional) {
    item.attrs.rules = [{ required: false }]
  }
  // 条件渲染
  item._ifRender = item.ifRender ? item.ifRender(dataForm) : true
  // form-item 配置
  return item
}
function handleCancel() {
  emit('handleCancel')
}
function onSubmit(values) {
  emit('submit', values)
}
</script>

<script>
export default { name: 'AppForm' }
</script>

<style lang='scss' scoped>
.button-group{
  display: flex;
  padding: .6rem $basePadding;
  .van-button + .van-button{
    margin-left: .2rem;
  }
}
.label{
  background: #fff;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  padding: 10px 16px 0;
  .label-optional{
    color: $color99;
  }
}
</style>
