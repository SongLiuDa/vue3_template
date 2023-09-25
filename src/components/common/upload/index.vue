<template>
  <van-field
    :rules="rules"
    class="custom-field app-upload"
  >
    <template #input>
      <van-uploader
        v-model="fileList"
        v-bind="$attrs"
        :multiple="maxCount > 1"
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
import { ref, watchEffect } from 'vue'
import { uploadRules } from '@/utils/rules'
import { Notify } from 'vant'
import { phoneFileType } from './config'
import { useUser } from '@/store'
import { upload, getUpload } from '@api/base'
const userStore = useUser()

const props = defineProps({
  modelValue: Array,
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
  emit('update:modelValue', val)
}
const fileList = ref([])

function fn(id) {
  const params = {
    cust_id: userStore._profile.custId,
    file_id: id
  }
  return getUpload(params)
}

function getFile() {
  const fnList = props.modelValue.map(id => fn(id))
  Promise.all(fnList).then(res => {
    // console.log('res', res)
    fileList.value = res.map(item => ({
      url: item.file_url,
      name: item.file_name,
      fileId: item.file_id,
      status: 'done'
    }))
  })
}

watchEffect(() => {
  if (props.modelValue.length) {
    getFile()
  }
})
// 上传前处理
function handleAfter(data) {
  const sizeList = []
  const typeList = []
  if (Array.isArray(data)) {
    data.forEach(item => {
      sizeList.push(item.file.size)
      typeList.push(item.file.type)
    })
  } else {
    sizeList.push(data.file.size)
    typeList.push(data.file.type)
  }
  const sizeLimit = sizeList.some(size => size > props.maxSize)
  if (sizeLimit) {
    Notify('图片上传不能超过10M')
    return false
  }
  const typeLimit = typeList.some(type => props.fileType.includes(type))

  if (!typeLimit) {
    Notify('你上传的图片格式不正确，请上传JPG/JPEG/PNG格式的图片')
    return false
  }
  const imgFile = new FormData()
  data.status = 'uploading'
  data.message = '上传中...'
  imgFile.append('file', data.file)
  imgFile.append('cust_id', userStore._profile.custId)
  upload(imgFile).then(res => {
    // console.log('文件上传回调', res)
    const { file_id } = res
    const list = [...props.modelValue, file_id]
    emitInput(list)
  }).catch(() => {
    data.status = 'failed'
    data.message = '上传失败'
  })
}
// 删除
function handleDelete(file) {
  const { fileId } = file
  const list = [...props.modelValue]
  const index = list.findIndex(v => v === fileId)
  list.splice(index, 1)
  emitInput(list)
}
</script>

<script>
export default { name: 'AppUpload' }
</script>

<style lang='scss' scoped>

</style>
