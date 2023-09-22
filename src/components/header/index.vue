<template>
  <div class="header">
    <div class="img_box img-contain">
      <img src="@/assets/logo.png" alt="">
    </div>
  </div>
</template>

<script setup>

</script>

<script>
export default { name: 'AppHeader' }
</script>

<style scoped lang='scss'>
.header{
  padding: .4rem $basePadding .2rem;
  text-align: center;
  line-height: 1;
  background: #fff;
}
.img_box{
  display: inline-block;
  height: .56rem;
}
</style>
