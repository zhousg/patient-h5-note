# 其他扩展
[TOC]

## 第三方登录

### 登录流程

### 跳转QQ后回跳

- 本地host配置

- 路由组件准备


### 登录回跳-已绑定
`inde.html`
```vue
<script
  type="text/javascript"
  charset="utf-8"
  src="http://connect.qq.com/qc_jssdk.js"
  data-appid="102015968"
  data-redirecturi="http://consult-patients.itheima.net:8080/login/callback"
></script>
```
`qc.d.ts`
```ts
type QcType = {
  Login: {
    check: () => boolean
    getMe: (cb: (openId: string) => void) => void
  }
}
declare let QC: QcType
```
`/Login/LoginCallback.vue`
```vue
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
```
### 登录回跳-未绑定


### 验证码hook封装


### 区分环境


## 真机调试

## mock接口数据

## tailwindcss


## 项目上线


### 项目打包


### pm2部署


### 云自动部署


### gitlab部署