<template>
  <div class="home">
    <AppHeader />
    <van-notice-bar
      wrapable
      :scrollable="false"
    >
      <div class="title w500 flex-c">
        <van-icon
          name="warning"
          size=".36rem"
          class="mr10"
        />
        <span>驳回原因：</span>
      </div>
      <p class="notice-tips">驳回原因.....</p>
    </van-notice-bar>
    <div class="content">
      <van-cell-group>
        <van-cell title="客户代码" :value="userStore._profile.custId" />
        <van-cell title="客户名称" :value="userStore._profile.realName" />
        <van-cell title="开通方式" :value="openMethodEnum[userStore._profile.openMethod]" />
      </van-cell-group>
      <AppForm
        :form-config="formConfig"
        :data-form="dataForm"
        submit-text="提交"
        :disabled="formIsDisabled"
        :s-loading="sLoading"
        @submit="onSubmit"
      >
        <!-- 企业外出拍照打卡 -->
        <template #goOutSlot>
          <p class="tips">需能显示面访地点的地址信息、办公环境为外贸企业的办公场所</p>
        </template>
        <!-- 客户办公场所室内拍照 -->
        <template #officeSlot>
          <p class="tips">如客户办公场所具备外贸经营历史要素，如宣传手册、文化墙、企业经营历史描述、包装箱标签、商品样本等（需呈现与企业主体相关联的信息），至少3张，最多9张</p>
        </template>
        <!-- 店铺环境照片 -->
        <template #storeSlot>
          <p class="tips">店铺环境至少3张，最多9张</p>
        </template>
      </AppForm>
    </div>
  </div>
</template>
<script setup>
import AppHeader from '@/components/header'
import { Dialog } from 'vant'
import { formConfig, openMethodEnum } from './config'
import { computed, onMounted, reactive, ref } from 'vue'
import { useUser } from '@/store'
import { useRouter } from 'vue-router'
const userStore = useUser()
const router = useRouter()

const formIsDisabled = computed(() => false)

const dataForm = reactive({
  methods: undefined,
  a3: [],
  a5: [],
  vipChannelType: '1', // 绿色通道类型
  vipChannel: 'N' // 是否绿色渠道[Y:是 N:否]
})

const sLoading = ref(false)
function beforeClose(action) {
  return new Promise((resolve) => {
    if (action === 'confirm') {
      setTimeout(() => {
        router.push('/succ')
        resolve(true)
      }, 1000)
    } else {
      resolve(true)
    }
  })
}
function onSubmit() {
  Dialog.alert({
    title: '提示',
    message: '您确定要提交实地核实照片？',
    showCancelButton: true,
    confirmButtonColor: '#00A6FD',
    beforeClose
  }).catch(() => {
    return true
  })
}
onMounted(() => {
  // 绿色通道类型
  if (dataForm.vipChannelType === 'WholesaleMarket') {
    dataForm.methods = 'Y'
  }
})

</script>

<script>
export default { name: 'Home' }
</script>
<style scoped lang="scss">
.notice-tips{
  margin-left: .46rem;
}
.tips{
  padding: 0 16px;
  color: $color99;
  font-size: 12px;
  line-height: 20px;
  background: #fff;
}
</style>
