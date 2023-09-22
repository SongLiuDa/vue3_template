<template>
  <div class="succ">
    <AppHeader />
    <div class="img_box mb40">
      <van-icon name="completed" class="icon" />
    </div>
    <div class="t w600 mb40">
      提交成功
    </div>
    <div class="tips">
      <p>请耐心等待，您提交/驳回的实地核实信息正在审核中...</p>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/header'
</script>

<script>
export default { name: 'SuccPage' }
</script>

<style scoped lang='scss'>
.succ{
  min-height: 100vh;
  text-align: center;
  background: #fff;
}
.t{
  font-size: 24px;
  font-weight: bold;
  color: $color33;
}
.icon{
  margin-top: 1rem;
  font-size: 2rem;
  color: #07c160;
}
.tips{
  padding: 0 $basePadding;
  font-size: 16px;
  line-height: 26px;
  color: $color66;
  margin-bottom: 1rem;
}
</style>
