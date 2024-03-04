<template>
  <div class="copyright">
    <p class="mb10 flex-c-c">&copy; {{ year }}&nbsp;
      <a
        target="_blank"
        href="https://www.skyee360.com/"
        class="link"
      >www.skyee360.com</a>
      .&nbsp;All Rights Reserved.
    </p>
    <p class="flex-c-c">
      <a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备16092379号-1</a>&nbsp;
      <img src="@/assets/police.png" alt>
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44011502000123"
        target="_blank"
      >&nbsp;粤公网安备 44011502000123号</a>
    </p>
  </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<script>
export default { name: 'AppFooter' }
</script>

<style scoped lang='scss'>
.copyright{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: $color99;
  padding: .1rem .2rem 0;
  font-size: .22rem;
  line-height: .32rem;
  height: $footerHeight;
  img{
    width: .36rem;
    height: .4rem;
    object-fit: contain;
  }
}
</style>
