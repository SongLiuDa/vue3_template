<template>
  <van-button v-bind="$attrs" class="app-button">
    <slot />
  </van-button>
</template>

<script setup>

</script>

<script>
export default { name: 'AppButton' }
</script>

<style lang='scss'>
.app-button{
  width: 100%;
  height: .84rem;
  line-height: .84rem;
  font-size: .3rem;
  font-family: 'Arial-Mdm';
  border-radius: 42px;
  &.van-button--default{
    background: #fff;
    border-color: $blue;
    color: $blue;
    &:hover,
    &:active{
      border-color: $hoverBlue;
      color: $hoverBlue;
      background: #fff;
    }
  }
  &.van-button--primary{
    background: $blue;
    border-color: $blue;
    color: #fff;
    &:hover,
    &:active{
      background: $hoverBlue;
      border-color: $hoverBlue;
    }
  }
  & + .el-button{
    margin-left: 0;
  }
}
</style>
