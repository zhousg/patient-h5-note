# 开药门诊模块

## 开药门诊-需求分析

> 理解开药门诊阶段流程分析

![开药门诊流程](./images/image-20231010175804736.png)

## 开药门诊-路由搭建

步骤

1. 基础结构代码
2. 路由配置
3. 首页跳转
4. cv静态结构

基础结构代码`views/Consult/ConsultMedicine.vue`

```jsx
<script setup lang="ts"></script>

<template>
  <div class="consult-medicine-page">
    <h1>consult-medicine</h1>
  </div>
</template>

<style scoped lang="scss"></style>

```

路由配置`router/index.ts`

```ts
{
    path: '/consult/medicine',
    component: () => import('@/views/Consult/ConsultMedicine.vue'),
    meta: { title: '开药门诊' }
}
```

首页跳转`Home/index.vue`

```jsx
<router-link
    to="/consult/medicine"
    class="nav"
    @click="store.setType(ConsultType.Medication)"
>
    <cp-icon name="home-prescribe"></cp-icon>
    <p class="title">开药门诊</p>
    <p class="desc">线上买药更方便</p>
</router-link>
```

cv静态结构`ConsultMedicine.vue`

```jsx
<script setup lang="ts"></script>

<template>
  <div class="consult-medicine-page">
    <cp-nav-bar
      title="开药门诊"
      right-text="问诊记录"
      @click-right="$router.push('/user/consult')"
    ></cp-nav-bar>
    <van-notice-bar text="请如实填写资料以便医生了解您的病情和用药需求" />
    <div class="illness-form">
      <div class="adm-list-header">症状描述</div>
      <van-field
        type="textarea"
        rows="3"
        placeholder="请输入所患疾病名称"
      ></van-field>
      <div class="adm-list-header">用药人身体情况</div>
      <div class="item">
        <p>肝功能</p>
      </div>
      <div class="item">
        <p>肾功能</p>
      </div>
      <div class="item">
        <p>过敏史</p>
      </div>
      <div class="item">
        <p>生育状态及计划</p>
      </div>
      <div class="adm-list-header">补充病例信息</div>
      <!-- 上传组件 -->
      <div class="illness-img"></div>
      <!-- 下一步 -->
      <!-- <van-button type="primary" block round> 下一步 </van-button> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.consult-medicine-page {
  padding-top: 46px;
  .van-button {
    font-size: 16px;
    margin-bottom: 30px;
    &.disabled {
      opacity: 1;
      background: #fafafa;
      color: #d9dbde;
      border: #fafafa;
    }
  }
  .illness-form {
    padding: 0 15px 15px 15px;
    .adm-list-header {
      padding-bottom: 5px;
      font-size: 16px;
      font-weight: 500;
      color: #121826;
      border-bottom: none;
      margin-top: 30px;
    }
    .van-field {
      padding: 0;
      &::after {
        border-bottom: none;
      }
    }
    .item {
      > p {
        color: var(--cp-text3);
        padding: 15px 0;
      }
    }
  }
}
</style>

```
