# 优医问诊-项目起步

## 项目介绍
> 知道：整体项目概况，并且知道课程中会实现哪些功能

- [产品原型](https://app.mockplus.cn/s/Y-U4_XHGRx)
- [产品设计](https://app.mockplus.cn/s/S77krW4rKh)

## 能学到什么
> 了解：在项目中会使用到哪些技术方案

1. 基于vue3.0+typescript中大型项目开发解决方案
2. 基于vant组件库快速构建H5界面解决方案
3. 基于vue-router的前端路由解决方案
4. 基于vite的create-vue构建vue3.0项目解决方案
5. 基于pinia的状态管理解决方案
6. 基于pinia-plugin-persistedstate状态持久化解决方案
7. 基于@vuecore/use的组合API工具库解决方案
7. 基于id-validator的身份证信息校验解决方案
8. 基于postcss-px-to-viewport移动端适配解决方案
9.  基于vite-plugin-svg-icons的svg图标组件解决方案
10. 基于tailwindcss的原子化类名现代解决方案
11. 基于socket.io的即时通讯问诊室解决方案
12. 基于eruda 的移动端调试解决方案
13. 第三方登录解决方案
14. 第三方支付解决方案
15. 自动部署方案
16. pnpm包管理方案
17. css变量主题定制方案


## pnpm介绍&安装
> 掌握：pnpm 的安装和使用

本质上他是一个包管理工具，和npm/yarn没有区别，主要优势在于
- 包安装速度极快
- 磁盘空间利用效率高

安装：
```sh
npm i pnpm -g
```

使用：

|npm命令	| pnpm等效|
| ---- | ---- |
|npm install	| pnpm install |
|npm i axios	| pnpm add axios |
|npm i webpack -D	| pnpm add webpack -D |
|npm run dev | pnpm dev |


小结：
- pnpm 是一个高效的包管理工具，使用和npm和yarn基本相同

## 项目创建

> 使用 create-vue 脚手架创建项目

create-vue参考地址：https://github.com/vuejs/create-vue

步骤：
1. 执行创建命令
```bash
pnpm create vue
# or
npm init vue@latest
# or
yarn create vue
```

2. 选择项目依赖内容

```bash
✔ Project name: … patients-h5-100
✔ Add TypeScript? … No / `Yes`
✔ Add JSX Support? … `No` / Yes
✔ Add Vue Router for Single Page Application development? … No / `Yes`
✔ Add Pinia for state management? … No / `Yes`
✔ Add Vitest for Unit Testing? … `No` / Yes
✔ Add Cypress for both Unit and End-to-End testing? … `No` / Yes
✔ Add ESLint for code quality? … No / `Yes`
✔ Add Prettier for code formatting? … No / `Yes`

Scaffolding project in /Users/zhousg/Desktop/patient-h5-100...

Done. Now run:

  cd patient-h5-100
  pnpm install
  pnpm lint
  pnpm dev
```


## vscode插件安装

> 安装：项目开发需要的一些插件

必装：
- `Vue Language Features (Volar)` vue3语法支持
- `TypeScript Vue Plugin (Volar)` vue3项目ts支持
- `Eslint` 代码风格校验

:::tip 提示
- vscode 安装了 `Prettier` 插件的可以先 `禁用`，避免和项目的 `Eslint` 风格冲突。
:::


可选：
- `Tailwind CSS IntelliSense` 现代css框架的提示
- `gitLens` 代码git提交记录提示
- `json2ts` json自动转ts类型


提示：
- 如果在大型ts项目中建议开启 [TS托管模式](https://staging-cn.vuejs.org/guide/typescript/overview.html#takeover-mode) , 现在我们的项目不开启也不影响。



## eslint 预制配置

> 使用：eslint的预制配置，且了解配置作用

```ts
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        printWidth: 100,
        trailingComma: 'none',
        'zh-hans': true
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index']
      }
    ],
    'vue/no-setup-props-destructure': ['off']
  }
```

- 格式：单引号，没有分号，行宽度100字符，没有对象数组最后一个逗号，允许中文标点符号
- vue 组件需要大驼峰命名，除去 index 之外，App 是默认支持的
- 允许对 props 进行解构，我们会开启解构保持响应式的语法糖

vscode 开启 eslint  自动修复
```json
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
    },
```

小结：
- 如果公司中会有自己的代码风格规则，大家只需遵守即可
- https://prettier.io/docs/en/options.html 常见规则


## 项目结构调整

> 了解：每一个目录结构的作用

```bash
./src
├── assets        `静态资源，图片...`
├── components    `通用组件`
├── composable    `组合功能通用函数`
├── icons         `svg图标`
├── router        `路由`
│   └── index.ts
├── services      `接口服务API`
├── stores        `状态仓库`
├── styles        `样式`
│   └── main.scss
├── types         `TS类型`
├── utils         `工具函数`
├── views         `页面`
├── main.ts       `入口文件`
└──App.vue       `根组件`
```


项目使用sass预处理器，安装sass，即可支持scss语法：
```bash
pnpm add sass -D
```


## 路由代码解析

> 知道：默认生成的路由代码的含义


```ts
import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建络实例，===> new VueRouter()
// history 是路由模式，hash模式，history模式
// createWebHistory() 是开启history模块   http://xxx/user
// createWebHashHistory() 是开启hash模式    http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path
// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router

```

小结：
- 如何创建实例的方式？
  - `createRouter()`

- 如何设置路由模式？
  - `createWebHistory()`  或者  `createWebHashHistory()`

- `import.meta.env.BASE_URL` 值来自哪里？
  - `vite.config.ts` 的 `base` 属性的值

- `base` 作用是什么?
  - 项目的基础路径前缀，默认是 `/`


## 约定路由规则

> 知道：约定项目的映射规则



|  路由路径    |   路由级别   |  组件功能    |
| ---- | ---- | ---- |
|   /register   |   1   |   注册   |
|   /login   |   1  |   登录   |
|   /login/mobile   |   1   |   手机登录   |
|   /login/callback   |   1   |   QQ登录回跳   |
|   /   |   1    |  布局容器    |
|   /user   |   ②    |   个人中心   |
|   /user/patient   |   1   |   家庭档案   |
|   /user/address   |   1   |   地址管理   |
|   /user/profile   |   1   |   个人资料   |
|   /home   |   ②   |   首页   |
|   /fast   |   1   |   快速问诊   |
|   /fast/dep   |   1   |   选择科室   |
|   /fast/illness   |   1   |   病情描述   |
|   /consult/pay   |   1   |   问诊支付   |
|   /consult/room   |   1   |   问诊室   |
|   /consult   |   1   |   我的问诊   |
|   /order/pay   |   1   |   药品订单支付   |
|   /order/pay/result   |   1   |   药品订单支付结果   |
|   /order   |   1   |   药品订单列表   |
|   /order/:id   |   1   |   药品订单详情   |
|   /order/logistics/:id   |   1   |   药品订单物流   |
|   /article   |   ②    |   健康百科   |
|   /notify   |   ②    |   消息通知   |

小结：
- `/` 是布局容器，是一级路由  `/home` `/article`  `/notify`  `/user` 是二级路由
- 他们的配置需要嵌套，其他的页面路由都是一级路由


## 用户状态仓库

> 完成：用户信息仓库创建，提供用户信息，修改用信息，删除用户信息的方法

- 请求工具需要携带token，访问权限控制需要token，所以用户信息仓库先完成

需求：
- 用户信息仓库创建
- 提供用户信息
- 修改用信息的方法
- 删除用信息的方法

代码：

```ts
import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('cp-user', () => {
  // 用户信息
  const user = ref<User>()
  // 设置用户，登录后使用
  const setUser = (u: User) => {
    user.value = u
  }
  // 清空用户，退出后使用
  const delUser = () => {
    user.value = undefined
  }
  return { user, setUser, delUser }
})
```

小结：
- pinia存储这个数据的意义？
  - 数据共享，提供给项目中任何位置使用

- 如果存储了数据，刷新页面后数据还在吗？
  - 不在，现在仅仅是js内存中，需要进行本地存储（持久化）

## 数据持久化

> 掌握：使用 `pinia-plugin-persistedstate` 实现pinia仓库状态持久化，且完成测试

[参考文档](https://www.npmjs.com/package/pinia-plugin-persistedstate)

![image-20220730222310940](./images/image-20220730222310940.png)

- 安装
```bash
pnpm i pinia-plugin-persistedstate
# or
npm i pinia-plugin-persistedstate
# or
arn add pinia-plugin-persistedstate
```
- 使用 `main.ts`
```ts{1,4}
import persist from 'pinia-plugin-persistedstate'
const app = createApp(App)

app.use(createPinia().use(persist))
```

- 配置 `stores/user.ts`
```ts{20-22}
import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 用户信息
    const user = ref<User>()
    // 设置用户，登录后使用
    const setUser = (u: User) => {
      user.value = u
    }
    // 清空用户，退出后使用
    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)

```

- 测试 `App.vue`

```vue
<script setup lang="ts">
import { useUserStore } from './stores/user'

const store = useUserStore()
</script>

<template>
  <p>{{ store.user }}</p>
  <button @click="store.setUser({ id: '1', mobile: '1', account: '1', avatar: '1', token: '1' })">
    登录
  </button>
  <button @click="store.delUser()">退出</button>
</template>
```



## stores及types统一导出
> 实现：仓库的导出统一从 `./stores`  类型的导出统一走 `./types` 代码简洁，职能单一


types 统一导出

`types/index.d.ts`
```ts
// 通用的类型
// ------------
// 导入user的所有成员，从当前文件导出
export * from './user'
// 导入order的所有成员，从当前文件导出
// ...等等
```
`stores/user.ts`
```diff
-import type { User } from '@/types/user'
+import type { User } from '@/types'
```

stores 统一导出

`stores/index`
```ts
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建pinia实例
const pinia = createPinia()
// 使用pinia插件
pinia.use(persist)
// 导出pinia实例，给main使用
export default pinia

export * from './user'
```
`main.ts`
```ts{3,9}
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import './styles/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
```
`App.vue`
```diff
-import { useUserStore } from './stores/user'
+import { useUserStore } from './stores'
```

小结：
- 统一导出是什么意思？
  - 一个模块下的所有资源通过index导出
- 这么做的意义是？
  - 使用时候代码简洁，模块职能汇集统一


## 请求工具函数


## 测试请求工具


## vant组件库


## 移动端适配


## 自动按需加载



## css变量主题定制