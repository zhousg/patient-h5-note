# 用户模块



## 布局容器{#layout}

![image-20220808185458747](./images/image-20220808185458747.png)

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



## 个人中心{#user}

![image-20220808185103327](./images/image-20220808185103327.png)

## 个人中心-用户信息类型{#user-types}

> 掌握：Pick 与 Omit 从现有类型中得到可复用类型

场景：
- 有 `User` 对象类型，现在需要 `UserInfo` 类型，字段多一些
- 使用 交叉类型  可以复用 `User` 类型，但是不需要 token 属性

Pick 与 Omit TS内置类型

- Pick 可以从一个对象类型中 取出某些属性
```ts
type Person = {
  name: string
  age: number
}
type PickPerson = Pick<Person, 'age'>
// PickPerson === { age: string }
```
- Omit 可以从一个对象类型中 排出某些属性
```ts
type Person = {
  name: string
  age: number
}
type OmitPerson = Omit<Person, 'age'>
// OmitPerson === { name: string }
```


落地代码：
```ts{13-26}
// 用户信息
export type User = {
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
}

// 短信验证码类型
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

// 个人信息
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}
```
小结：
- `Pick` 作用？
  - 从类型对象中取出指定的属性类型
- `Omit` 作用？
  - 从类型对象中排出指定的属性类型，得到剩余的




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
```ts
import type { CodeType, User, UserInfo } from '@/types/user'

// ... 省略 ...

// 获取个人信息
export const getUserInfo = () => reuqest<UserInfo>('/patient/myUser')
```


3）获取数据进行渲染

```ts
import { getUserInfo } from '@/services/user'
import type { UserInfo } from '@/types/user'
import { onMounted, ref } from 'vue'

const user = ref<UserInfo>()
onMounted(async () => {
  const res = await getUserInfo()
  user.value = res.data
})
```

```diff
+<div class="user-page" v-if="user">
    <div class="user-page-head">
      <div class="top">
+        <van-image round fit="cover" :src="user.avatar" />
        <div class="name">
+          <p>{{ user.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
+          <p>{{ user.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
+          <p>{{ user.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
+          <p>{{ user.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
+          <p>{{ user.couponNumber }}</p>
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
+          <van-badge :content="user.orderInfo.paidNumber || ''">
            <cp-icon name="user-paid" />
+          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
+          <van-badge :content="user.orderInfo.shippedNumber || ''">
            <cp-icon name="user-shipped" />
+          </van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
+          <van-badge :content="user.orderInfo.receivedNumber || ''">
            <cp-icon name="user-received" />
+          </van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6">
+          <van-badge :content="user.orderInfo.finishedNumber || ''">
            <cp-icon name="user-finished" />
+          </van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
  </div>
```



## 个人中心-快捷工具{#user-tools}
> 实现：快捷工具栏目渲染

步骤：
- 准备初始化结构
- 准备初始化数据
- 遍历

代码：
1）准备初始化结构
```html
    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell title="标题" is-link :border="false" >
        <template #icon><cp-icon name="user-tool-01" /></template>
      </van-cell>
      <van-cell title="标题" is-link :border="false" >
        <template #icon><cp-icon name="user-tool-01" /></template>
      </van-cell>
    </div>
```
```scss
  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h3 {
      padding-left: 16px;
      line-height: 44px;
    }
    .van-cell {
      align-items: center;
    }
    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
```

2）准备初始化数据

```ts
const tools = [
  { label: '我的问诊', path: '/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]
```

3）遍历

```html
    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell
        :title="item.label"
        is-link
        :to="item.path"
        :border="false"
        v-for="(item, i) in tools"
        :key="i"
      >
        <template #icon><cp-icon :name="`user-tool-0${i + 1}`" /></template>
      </van-cell>
    </div>
```

## 个人中心-退出登录{#user-logout}
> 实现：退出功能

步骤：
- 准备按钮
- 实现退出
  - 确认框
  - 清除token
  - 跳转登录

代码：

1）准备按钮
```html
<a class="logout" href="javascript:;">退出登录</a>
```
```scss
  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--cp-price);
  }
```

2）实现退出

```ts
import { useUserStore } from '@/stores/index'

// ... 胜省略 ...

const store = useUserStore()
const router = useRouter()
const logout = async () => {
  await Dialog.confirm({
    title: '温馨提示',
    message: '您确认要退出优医问诊吗？',
    cancelButtonText: '取消',
    confirmButtonText: '确认'
  })
  store.delUser()
  router.push('/login')
}
```



## 家庭档案{#patient}

![image-20220808184827626](./images/image-20220808184827626.png)

## 家庭档案-路由与组件{#patient-html}



> 实现：路由的配置与组件基础布局

- 路由 `router/index.ts`
```ts
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    }
```
注意是一级路由

- 组件
```vue
<script setup lang="ts"></script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案" />
    <div class="patient-list">
      <div class="patient-item">
        <div class="info">
          <span class="name">李富贵</span>
          <span class="id">321***********6164</span>
          <span>男</span>
          <span>32岁</span>
        </div>
        <div class="icon"><cp-icon name="user-edit" /></div>
        <div class="tag">默认</div>
      </div>
      <div class="patient-item">
        <div class="info">
          <span class="name">李富贵</span>
          <span class="id">321***********6164</span>
          <span>男</span>
          <span>32岁</span>
        </div>
        <div class="icon"><cp-icon name="user-edit" /></div>
      </div>
      <div class="patient-add">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
      }
      &.id {
        color: var(--cp-text2);
        width: 200px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
</style>
```



