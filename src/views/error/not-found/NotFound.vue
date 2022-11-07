<script lang="ts" setup>
import imgWelcome from '@/assets/images/error/welcome.png'
</script>

<template>
  <div class="not-found">
    <div>
      <img :src="imgWelcome" alt="" />
      <div class="f20">欢迎使用</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.not-found {
  height: 100%;
  background-color: #fff;
  text-align: center;

  .flex-center;
}
</style>
