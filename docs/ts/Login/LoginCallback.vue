<script setup lang="ts">
/*global QC*/
import { onMounted } from 'vue'

onMounted(() => {
  if (QC.Login.check()) {
    QC.Login.getMe((openId) => {
      // 获取openId用于登录
      // 1. 登录成功，跳转来源页或者个人中心
      console.log(openId)
      // 2. 登录失败，展示绑定手机表单，进行手机号绑定操作
    })
  }
})
</script>

<template>
  <div class="login-callback-page">login-callback</div>
</template>

<style lang="scss" scoped></style>
