<template>
  <div class="home">
    <!-- 非初始化 -->
    <van-notice-bar
      v-if="userStore._profile.status !== 'CREATED'"
      wrapable
      :scrollable="false"
    >
      <!-- 审核中 -->
      <template v-if="userStore._profile.status === 'AUDITING'">
        <div class="title w500 flex-c">
          <van-icon
            name="warning"
            size=".36rem"
            class="mr10"
          />
          <span>提交成功</span>
        </div>
        <p class="notice-tips">请耐心等待，您提交的实地核实信息正在审核中...</p>
      </template>
      <!-- 通过 -->
      <template v-if="userStore._profile.status === 'PASS'">
        <div class="title w500 flex-c">
          <van-icon
            name="checked"
            size=".36rem"
            class="mr10"
          />
          <span>审核通过</span>
        </div>
        <p class="notice-tips">您提交的实地核实信息已审核通过，无需再进行操作</p>
      </template>
      <!-- 驳回 -->
      <template v-if="userStore._profile.status === 'REFUSE'">
        <div class="title w500 flex-c">
          <van-icon
            name="warning"
            size=".36rem"
            class="mr10"
          />
          <span>驳回原因：</span>
        </div>
        <p class="notice-tips">{{ userStore._profile.authRemark }}</p>
      </template>
    </van-notice-bar>
    <AppHeader />
    <van-loading
      v-if="loading"
      class="loading"
      size="24px"
      vertical
    >加载中...</van-loading>
    <div v-else class="content">
      <van-cell-group>
        <van-cell title="客户代码" :value="userStore._profile.custId" />
        <van-cell title="客户名称" :value="userStore._profile.realName" />
        <van-cell
          v-if="userStore._profile.bizActualAddress"
          title="实际经营地址"
          :value="userStore._profile.bizActualAddress"
        />
        <van-cell title="开通方式" :value="openMethodEnum[userStore._profile.openMethod]" />
      </van-cell-group>
      <AppForm
        :form-config="formConfig"
        :data-form="dataForm"
        submit-text="提交"
        :s-disabled="formIsDisabled"
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
import { getPasswod } from '@/utils/auth'
import { formConfig, openMethodEnum } from './config'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useUser } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { getSiteVerify, siteVerify } from '@api/home'
const userStore = useUser()
const router = useRouter()
const route = useRoute()

const formIsDisabled = computed(() => userStore._profile.status === 'PASS' || userStore._profile.status === 'AUDITING')
const sign = computed(() => route.query.sign)

const dataForm = reactive({
  goSiteVerify: undefined, // Y:上门 N：放弃上门
  envFile: [], // 实地环境圈「普客：办公场所室内照、批发市场：店铺环境照】
  groupPhotoFile: [], // 合照图片【普客：与1og0合影、批发市场：与店铺老板合照】
  positionFile: [], // 位置照片【普客：外出打卡照，批发市场：门头照】
  remarks: undefined,
  openMethods: userStore._profile.openMethod // 业务开通方式【WholesaleMarket:绿通-批发市场、Standard:普通客户】
})

watch(() => dataForm, (val) => {
  if (userStore._profile.status === 'REFUSE') return
  localStorage.setItem(userStore._profile.custId, JSON.stringify(val))
}, {
  deep: true
})

const sLoading = ref(false)
function beforeClose(action) {
  return new Promise((resolve) => {
    if (action === 'confirm') {
      sLoading.value = true
      const params = {
        urlSign: sign.value,
        ...dataForm
      }
      siteVerify(params).then(async res => {
        // console.log('提交', res)
        const data = {
          viewPassword: getPasswod(),
          urlSign: sign.value
        }
        localStorage.removeItem(userStore._profile.custId)
        await userStore.login(data)
        router.push({
          path: '/succ',
          query: {
            sign: sign.value
          }
        })
        Dialog.close()
        sLoading.value = false
      }).catch(() => {
        resolve(true)
        sLoading.value = false
      })
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
const loading = ref(false)
function siteVerifyDetail() {
  loading.value = true
  const params = {
    urlSign: sign.value
  }
  getSiteVerify(params).then(res => {
    // console.log('详情', res)
    const { envFile, groupPhotoFile, positionFile, remarks } = res.sitePic
    dataForm.goSiteVerify = res.goSiteVerify
    dataForm.envFile = envFile || []
    dataForm.groupPhotoFile = groupPhotoFile || []
    dataForm.positionFile = positionFile || []
    dataForm.remarks = remarks
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

onMounted(() => {
  // 绿色通道类型
  if (dataForm.openMethods === 'WholesaleMarket') {
    dataForm.goSiteVerify = 'Y'
  }
  if (userStore._profile.status !== 'CREATED') {
    siteVerifyDetail()
  } else {
    const data = JSON.parse(localStorage.getItem(userStore._profile.custId))
    if (data) {
      const { envFile, groupPhotoFile, positionFile, remarks, goSiteVerify } = data
      dataForm.goSiteVerify = goSiteVerify
      dataForm.envFile = envFile || []
      dataForm.groupPhotoFile = groupPhotoFile || []
      dataForm.positionFile = positionFile || []
      dataForm.remarks = remarks
    }
  }
})

</script>

<script>
export default { name: 'Home' }
</script>
<style scoped lang="scss">
.loading{
  margin-top: 2rem;
}
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
