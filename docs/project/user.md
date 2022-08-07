# 用户模块


## 布局容器-组件路由{#layout-routes}
> 实现：首页，健康百科，消息通知，我的，布局容器的搭建

- 基础组件

`Home/index.vue`
```vue
<script setup lang="ts"></script>

<template>
  <div class="home-page">home</div>
</template>

<style lang="scss" scoped></style>
```
`Article/index.vue`
```vue
<script setup lang="ts"></script>

<template>
  <div class="article-page">home</div>
</template>

<style lang="scss" scoped></style>
```
`Notify/index.vue`
```vue
<script setup lang="ts"></script>

<template>
  <div class="notify-page">home</div>
</template>

<style lang="scss" scoped></style>
```
`User/index.vue`
```vue
<script setup lang="ts"></script>

<template>
  <div class="user-page">home</div>
</template>

<style lang="scss" scoped></style>
```
- 布局容器

```vue
<script setup lang="ts"></script>

<template>
  <div class="layout-page">
    <router-view></router-view>
    layout
  </div>
</template>

<style lang="scss" scoped></style>
```

- 路由配置

```ts
  routes: [
    { path: '/login', component: () => import('@/views/Login/index.vue') },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/Home/index.vue') },
        { path: '/article', component: () => import('@/views/Article/index.vue') },
        { path: '/notify', component: () => import('@/views/Notify/index.vue') },
        { path: '/user', component: () => import('@/views/User/index.vue') }
      ]
    }
  ]
```


## 布局容器-底部tab栏{#layout-tab}
> 实现：底部tab的切换

步骤：
- 使用 `tab-bar` 实现路由切换功能
- 给 `tab-bar` 加上自定义图标

代码：

- 路由切换功能
```html
    <van-tabbar route>
      <van-tabbar-item to="/home">首页</van-tabbar-item>
      <van-tabbar-item to="/article">健康百科</van-tabbar-item>
      <van-tabbar-item to="/notify">消息中心</van-tabbar-item>
      <van-tabbar-item to="/user">我的</van-tabbar-item>
    </van-tabbar>
```
- 自定义图标
```vue
<script setup lang="ts"></script>

<template>
  <div class="layout-page">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home">
        首页
        <template #icon="{ active }">
          <cp-icon :name="`home-index-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">
        健康百科
        <template #icon="{ active }">
          <cp-icon :name="`home-article-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/notify">
        消息中心
        <template #icon="{ active }">
          <cp-icon :name="`home-notice-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        我的
        <template #icon="{ active }">
          <cp-icon :name="`home-mine-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.layout-page {
  ::v-deep() {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }
      &__text {
        font-size: 11px;
      }
    }
  }
}
</style>
```

## 个人中心-头部布局
> 


## 个人中心-快捷工具


## 个人中心-信息展示


