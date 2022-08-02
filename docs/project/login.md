# 登录模块

## 路由与组件{#router-and-component}
> 完成：路由规则的配置，基础组件结构，app组件路由出口

- 基础组件结构 `views/Login/index.vue`
```vue
<script setup lang="ts">
import { Button as VanButton, Checkbox as VanCheckbox } from 'vant'
</script>

<template>
  <div class="login-page">
    <van-button type="primary">按钮</van-button>
    <van-checkbox :checked="true">复选框</van-checkbox>
  </div>
</template>

<style lang="scss" scoped></style>
```

- 路由规则的配置 `router/index.ts`
```ts
  routes: [{ path: '/login', component: () => import('@/views/Login/index.vue') }]
```

- app组件路由出口 `App.vue`
```vue
<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>
```

疑问：
- vueps 生成组件基础结构？
  - 使用vscode代码片段，或插件
- vant 的主题色和项目的不一致？
  - css变量定制主题
- 每次这样导入 vant 的组件非常麻烦？
  - 可以使用自动导入vite插件

## 组件代码片段{#code-snippet}
> 配置：一个vue3页面的基础代码片段

1. 打开代码片段设置界面：
- windows：ctrl + shift + p 
- mac：cmmmand + shift + p 

2. 新建全局代码片段文件

3. 拷贝一下代码，保存即可，输入vueps
```json
{
  "vuets页面": {
		"scope": "vue,markdown",
		"prefix": "vueps",
		"body": [
			"<script setup lang=\"ts\"></script>",
			"",
			"<template>",
			"  <div class=\"$1-page\">$1</div>",
			"</template>",
			"",
			"<style lang=\"scss\" scoped></style>",
			""
		],
		"description": "Log output to console"
	}
}  
```

或者安装：Vue 3 Snippets 插件，快捷键看插件文档。

## css变量主题定制{#css-var}

> 实现：使用css变量定制项目主题，和修改vant主题


- 如果定义 css 变量使用 css 变量
```css
:root {
  --main: #999;
}
a {
  color: var(--main)
}
```

- 定义项目的颜色风格，覆盖vant的主题色  [官方文档](https://vant-contrib.gitee.io/vant/#/zh-CN/config-provider#ji-chu-bian-liang)

`styles/main.scss`
```scss
:root {
  // 问诊患者：色板
  --cp-primary: #16C2A3;
  --cp-plain: #EAF8F6;
  --cp-orange: #FCA21C;
  --cp-text1: #121826;
  --cp-text2: #3C3E42;
  --cp-text3: #6F6F6F;
  --cp-tag: #848484;
  --cp-dark: #979797;
  --cp-tip: #C3C3C5;
  --cp-disable: #D9DBDE;
  --cp-line: #EDEDED;
  --cp-bg: #F6F7F9;
  // 覆盖vant主体色
  --van-primary-color: var(--cp-primary);
}
```

`App.vue`
```vue
<script setup lang="ts"></script>

<template>
  <!-- 验证vant颜色被覆盖 -->
  <van-button type="primary">按钮</van-button>
  <a href="#">123</a>
</template>

<style scoped lang="scss">
// 使用 css 变量
a {
  color: var(--cp-primary);
}
</style>
```

## 自动按需加载{#auto-import}

> 实现：实现自动按需加载，和自动导入

[官方文档](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#an-xu-yin-ru-zu-jian-tui-jian)


手动按需使用组件比较麻烦，需要先导入。配置函数自动按需导入后直接使用即可。


- 安装：

```bash
# 通过 npm 安装
npm i unplugin-vue-components -D
# 通过 yarn 安装
yarn add unplugin-vue-components -D
# 通过 pnpm 安装
pnpm add unplugin-vue-components -D
```

- 配置：
```ts{5,6,13-18}
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 解析单文件组件的插件
    vue(),
    // 自动导入的插件，解析器可以是 vant element and-vue 
    Components({
      dts: false,
      // vant已经内置了组件类型，不需要自动生成
      resolvers: [VantResolver({ importStyle: false })]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```

- 解释：
  - `@` 是vite配置的，基于node提供的API，得到 `src` 的绝对路径


## 组件布局



## 表单校验



## 进行登录
