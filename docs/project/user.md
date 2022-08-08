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


## 布局容器-访问权限控制{#layout-auth}

> 实现：需要登录的页面，需要判断是否有`token`

- vue-router 导航守卫[文档](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)
  + `return '/login'` 跳转指定地址
  + 不返回，或者 `return true` 就是放行
  + 可以不是 `next` 函数了 

- 访问权限控制 `router/index.ts`

```ts
// 访问权限控制
router.beforeEach((to) => {
  // 用户仓库
  const store = useUserStore()
  // 不需要登录的页面，白名单
  const wihteList = ['/login']
  // 如果没有登录且不在白名单内，去登录
  if (!store.user?.token && !wihteList.includes(to.path)) return '/login'
  // 否则不做任何处理
})
```

提问：
- 如果 `/register` 也不需要登录，写哪里？
  - `const wihteList = ['/login', 'register']`


## 布局容器-页面标题{#layout-title}
> 实现：切换页面切换标题，扩展 `vue-router` 的类型

- 给每一个路由添加 [元信息](https://router.vuejs.org/zh/guide/advanced/meta.html#%E8%B7%AF%E7%94%B1%E5%85%83%E4%BF%A1%E6%81%AF) 数据

`router/index.ts`

```ts
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/Login/index.vue'), meta: { title: '登录' } },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    }
  ]
})
```

- 切换路由设置标题

`router/index.ts`
```diff
// 访问权限控制
router.beforeEach((to) => {
  // 处理标题
+  document.title = `优医问诊-${to.meta.title || ''}`
  // 用户仓库
  const store = useUserStore()
```

- 扩展元信息类型 `types/vue-router.d.ts`
```ts
import 'vue-router'

declare module 'vue-router' {
  // 扩展 元信息类型
  interface RouteMeta {
    // 标题
    title?: string
  }
}
```

## 个人中心-用户信息类型定义{#user-types}

## 个人中心-头部展示{#user-head-render}
> 实现：头部个人信息展示与订单卡片布局

步骤：
- 熟悉基础结构
- 定义API函数
- 获取数据进行渲染

代码：

1）熟悉基础结构

```vue
<script setup lang="ts"></script>

<template>
  <div class="user-page">
    <div class="user-page-head">
      <div class="top">
        <van-image
          round
          fit="cover"
          src="https://yanxuan-item.nosdn.127.net/ef302fbf967ea8f439209bd747738aba.png"
        />
        <div class="name">
          <p>用户907456</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>150</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>23</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>270</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>3</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/order">全部订单 <van-icon name="arrow" /></router-link>
      </div>
      <van-row>
        <van-col span="6">
          <cp-icon name="user-paid" />
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <cp-icon name="user-shipped" />
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <cp-icon name="user-received" />
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <cp-icon name="user-finished" />
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;
  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;
    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;
      .van-image {
        width: 70px;
        height: 70px;
      }
      .name {
        padding-left: 10px;
        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
    }
    .van-row {
      margin: 0 -15px;
      padding-top: 15px;
      p {
        text-align: center;
        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }
        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
      a {
        color: var(--cp-tip);
      }
    }
    .van-col {
      text-align: center;
      .cp-icon {
        font-size: 28px;
      }
      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }
}
</style>
```

2）定义API函数



3）获取数据进行渲染



## 个人中心-快捷工具{#user-tools}
> 实现：快捷工具栏目渲染


## 个人中心-退出登录{#user-logout}
> 实现：退出功能


