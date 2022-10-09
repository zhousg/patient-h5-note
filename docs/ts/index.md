# TypeScript 起步



## TypeScript 介绍{#intro}

> 知道：TS是带类型语法的JS


官方网站：https://www.typescriptlang.org/

~~中文官网：~~ https://www.tslang.cn/

![image-20220706182727310](./images/image-20220706182727310.png)

`TypeScript` 是一种带有 `类型语法` 的 JavaScript 语言，在任何使用 JavaScript 的开发场景中都可以使用。

JavaScript 代码

```js
// 没有明确的类型
let age = 18
```

TypeScript 代码

```typescript
// 有明确的类型，可以指定age是number类型(数值类型)
let age: number = 18
```


注意：TS 需要编译才能在浏览器运行。

总结：TS 是 JS 的超集，支持了JS 语法和扩展了类型语法。



## TypeScript 作用{#effect}

> 知道：TS作用是在编译时进行类型检查提示错误

发现：
- 在程序运行的时候 `Uncaught TypeError` 这个错误挺常见的
- 这些错误导致在开发项目的时候，需要花挺多的时间去定位和处理 BUG
```js
const num = 18;
num.toLowerCase() 
// Uncaught TypeError: num.toLowerCase is not a function
```

原因：
- JS 是动态类型的编程语言，动态类型最大的特点就是它只能在 `代码执行` 期间做类型的相关检查，所以往往你发现问题的时候，已经晚了。

方案：
- TS 是静态类型的编程语言，代码会先进行编译然后去执行，在 `代码编译` 期间做类型的相关检查，如果有问题编译是不通过的，也就暴露出了问题。
- 配合 VSCode 等开发工具，TS 可以提前到在 `编写代码` 的时候就能发现问题，更准确更快的处理错误。

TS 优势：
- 更早发现错误，提高开发效率
- 随时随地提示，增强开发体验
- 强大类型系统，代码可维护性更好，重构代码更容易
- 类型推断机制，减少不必要类型注解，让编码更简单
- 最后：Vue3源码TS重写，React和TS完美配合，Angular默认支持TS，大中型前端项目首选。

`Vue3 + TS` 最新的开发技术栈，你还在等什么？

## TypeScript 编译{#compile}

> 知道：如何使用 tsc 编译 ts 代码

全局安装：
```bash
# npm 安装
npm i -g typescript
# yarn 安装
yarn global add typescript
# 部分mac电脑安装需要sudo权限
# sudo npm i -g typescript
# sudo yarn global add typescript
```
查看版本：
```bash
tsc -v
```
编译 TS：
- 新建 `hello.ts` 文件
- 当前目录打开命令行窗口，执行 `tsc hello.ts` 命令，同级目录生成 `hello.js` 文件
- 执行 `node hello.js` 验证一下

思考：
- 以后我们写 ts 都是手动的编译执行吗？
  - 在开发中：一般使用 `webpack` `vite` 等工具自动构建编译。


## 创建 vue-ts 项目{#vue-ts}

> 创建一个基于 ts 的 vue 项目，来学习 ts 语法

```bash
# npm 6.x
npm create vite@latest my-vue-ts-app --template vue-ts

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-ts-app -- --template vue-ts

# yarn
yarn create vite my-vue-ts-app --template vue-ts

# pnpm
pnpm create vite my-vue-ts-app --template vue-ts
```

在基于 vite 的项目中可以直接验证 ts 代码结果，因为已经配置好了 ts 环境。

