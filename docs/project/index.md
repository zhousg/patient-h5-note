# 在线问诊-起步

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
- 建议安装了 `Prettier` 插件的可以先 `禁用`，避免和项目的 `Eslint` 风格冲突。
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

小结：
- 如果公司中会有自己的代码风格规则，大家只需遵守即可


## 项目结构调整

## 路由代码解析

## 约定路由规则

## 用户状态仓库


## 状态仓库统一暴露

## 请求工具函数


## 测试请求工具


## 状态持久化


## vant组件库


## 移动端适配


## 自动按需加载



## css变量主题定制