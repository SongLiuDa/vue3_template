<template>
  <van-field
    :model-value="maxCount > 1 ? modelValue.join() : modelValue"
    :rules="rules"
    class="custom-field app-upload"
  >
    <template #input>
      <van-uploader
        v-model="fileList"
        v-bind="$attrs"
        :max-size="maxSize"
        :max-count="maxCount"
        :preview-full-image="false"
        :after-read="handleAfter"
        @delete="handleDelete"
      />
    </template>
  </van-field>
</template>

<script setup>
import { ref, computed, toRefs, watchEffect } from 'vue'
import { uploadRules } from '@/utils/rules'
import { Notify } from 'vant'
import { phoneFileType } from './config'
import { upload, getUpload } from '@api/base'

const props = defineProps({
  modelValue: [String, Array],
  rules: {
    type: Array,
    default: () => uploadRules
  },
  maxSize: { // 10M
    type: Number,
    default: 10 * 1024 * 1024
  },
  maxCount: {
    type: Number,
    default: 1
  },
  fileType: {
    type: Array,
    default: () => phoneFileType
  }
})
const emit = defineEmits(['update:modelValue'])
function emitInput (val) {
  console.log(val)
  emit('update:modelValue', val)
}
const fileList = ref([])
function getFile() {
  const params = {
    fileId: props.modelValue
  }
  getUpload(params).then(res => {
    // console.log('获取文件', res)
    const { content } = res
    fileList.value = content.map(item => ({
      url: item.fileUrl,
      name: item.fileName,
      fileId: item.fileId,
      status: 'done'
    }))
  }).catch(() => {

  })
}

const haveUrl = computed(() => (props.maxCount > 1 && props.modelValue.length) || (+props.maxCount === 1 && props.modelValue))
const { modelValue } = toRefs(props)
watchEffect(() => {
  if (haveUrl.value) {
    getFile()
  }
})
// 上传前处理
function handleAfter(data) {
  const { size, type } = data.file
  if (size > props.maxSize) {
    Notify('图片上传不能超过10M')
    return false
  }
  const allowType = props.fileType.some(item => item.type === type)
  if (!allowType) {
    Notify('你上传的图片格式不正确，请上传JPG/JPEG/PNG格式的图片')
    return false
  }
  const imgFile = new FormData()
  data.status = 'uploading'
  data.message = '上传中...'
  imgFile.append('file', data.file)
  upload(imgFile).then(res => {
    // console.log('文件上传回调', res)
    const { fileId } = res
    if (props.maxCount > 1) {
      const list = [...props.modelValue, fileId]
      emitInput(list)
    } else {
      emitInput(fileId)
    }
  }).catch(() => {
    data.status = 'failed'
    data.message = '上传失败'
  })
}
// 删除
function handleDelete(file) {
  if (props.maxCount > 1) {
    const { fileId } = file
    const list = [...props.modelValue]
    const index = list.findIndex(v => v === fileId)
    list.splice(index, 1)
    emitInput(list)
  } else {
    emitInput()
  }
}
</script>

<script>
export default { name: 'AppUpload' }
</script>

<style lang='scss' scoped>

</style>
