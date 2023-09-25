<template>
  <div class="login">
    <AppHeader />
    <van-dialog
      v-model:show="show"
      :show-confirm-button="false"
    >
      <div class="content">
        <van-form
          class="app-form"
          show-error
          :submit-on-enter="false"
          @submit="onSubmit"
        >
          <div class="form-content">
            <div class="title">
              访问密码
            </div>
            <div class="form-item">
              <AppPasswordInput v-model="dataForm.viewPassword" placeholder="请输入访问密码" />
            </div>
          </div>
          <div class="submit">
            <van-button
              plain
              hairline
              type="primary"
              native-type="submit"
              :loading="sLoading"
            >
              确定
            </van-button>
          </div>
        </van-form>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import AppHeader from '@/components/header'
import { computed, reactive, ref } from 'vue'
import { useUser } from '@/store'
import { useRoute, useRouter } from 'vue-router'
const userStore = useUser()
const router = useRouter()
const route = useRoute()

const sign = computed(() => route.query.sign)
const show = ref(true)
const dataForm = reactive({
  viewPassword: undefined,
  urlSign: sign.value
})

const sLoading = ref(false)
async function onSubmit() {
  sLoading.value = true
  try {
    await userStore.login(dataForm)
    sLoading.value = false
    show.value = false
    router.push({
      path: '/',
      query: {
        sign: sign.value
      }
    })
  } catch {
    sLoading.value = false
  }
}

</script>

<script>
export default { name: 'Login' }
</script>

<style scoped lang='scss'>
.form-content{
  padding: 0 .4rem .4rem;
}
.title{
  font-size: .3rem;
  color: $color33;
  text-align: center;
  font-weight: 500;
  margin-bottom: .3rem;
}
.content{
  padding-top: .4rem;
}
</style>
<style lang="scss">
.login{
  .van-cell{
    padding: 0;
  }
  .submit{
    .van-button{
      width: 100%;
      border-left: none;
      border-right: none;
      border-bottom: none;
      border-color: $colorEf;
    }
  }
}
</style>
