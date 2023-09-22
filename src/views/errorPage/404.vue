<template>
  <div class="error-page">
    <div class="img-box img-contain">
      <img src="./img/404.png" alt="">
    </div>
    <p class="tips f28 lh36">
      Oops! The Page Not F
    </p>
    <AppButton type="primary" @click="$router.replace('/')">Back</AppButton>
  </div>
</template>

<script setup>

</script>

<script>
export default { name: 'ErrorPage' }
</script>

<style lang='scss' scoped>
.error-page{
  min-height: calc(100vh - .98rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: .4rem $basePadding;
  .img-box{
    margin-top: 1rem;
    width: 2rem;
    height: 2rem;
  }
  .tips{
    color: $colorCc;
    margin: .2rem 0 .4rem;
  }
}
</style>
