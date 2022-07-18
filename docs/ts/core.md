# TypeScript 核心

## 类型注解

> 知道：TypeScript 类型注解

示例代码：

```typescript
// 约定变量 age 的类型为 number 类型
let age: number = 18;
age = 19;
```

- `: number` 就是类型注解，它为变量提供类型约束。
- 约定了什么类型，就只能给该变量赋值什么类型的值，否则报错。
- 而且：约定类型之后，代码的提示也会非常清晰。

错误演示：

```typescript
let age: number = 18;
// 报错：不能将类型“string”分配给类型“number”
age = '19';
```

小结：

- 什么是类型注解？
  - 变量后面约定类型的语法，就是类型注解
- 类型注解作用？
  - 约定类型，明确提示

## 原始类型

> 知道：ts 有哪些类型，掌握：原始类型使用

TS 常用类型：

- JS 已有类型
  - 原始类型，简单类型，`number` `string` `boolean` `null` `undefined`
  - 复杂类型，对象 数组 函数
- TS 新增类型
  - 联合类型、自定义类型(类型别名)、接口、元组、字面量类型、枚举、void、any 等

原始类型：

- 使用简单，完全按照 JS 的类型来书写即可

```typescript
let age: number = 18;
let myName: string = '黑马程序员';
let isLoading: boolean = false;
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

## 数组类型

> 掌握：数组类型的两种写法

- 写法 1

```typescript
let numbers: number[] = [1, 3, 5];
```

- 写法 2

```typescript
let strings: Array<string> = ['a', 'b', 'c'];
```

推荐使用：

- `number[]` 写法

思考：

- 如果数组需要存储多种类型数据呢？

## 联合类型

> 掌握：通过联合类型将多个类型合并为一个类型

需求：数组中有 `number` 和 `string` 类型，这个数组的类型如何书写？

```typescript
  let arr: (number | string)[] = [1, 'a', 3, 'b'];
```

定义：
- 类型与类型之间使用 `|` 连接，代表类型可以是它们当中的其中一种，这种类型叫：`联合类型`

----
练习：给一个定时器ID加类型
```typescript
  let timer: number | null = null
  timer = setInterval(() => {}, 1000)
```

思考：
```typescript
  let arr: number | string[]
  // 这是什么类型？
```

## 类型别名

> 掌握：使用类型别名语法给类型取别字

示例代码：
```typescript
// let arr: ( number | string )[] = [ 1, 'a', 4] 
// 类型别名: type 类型别名 = 具体类型
type CustomArr = ( number | string )[]
let arr: CustomArr = [ 1, 'a', 4] 
```
类型别名: 
- `type 类型别名 = 具体类型` 基本语法
- 定义类型别名，遵循大驼峰命名规范，类似于变量
- 使用类型别名，与类型注解的写法一样即可

使用场景：
- 当同一类型（复杂）被多次使用时，可以通过类型别名，`简化` 该类型的使用

```typescript
type CustomArr = ( number | string )[]
let arr: CustomArr = [ 1, 'a', 4] 
let arr2: CustomArr = [ 2, 'b', 8] 
```



## 函数类型

### 基本使用
> 掌握：给函数指定类型

- 给函数指定类型，其实是给 `参数` 和 `返回值` 指定类型。
- 两种写法：
  - 在函数基础上 `分别指定` 参数和返回值类型
  - 使用类型别名 `同时指定` 参数和返回值类型

示例代码1：分别指定
```typescript
// 函数声明
function add(num1: number, num2: number): number {
  return num1 + num2
}

// 箭头函数
const add = (num1: number, num2: number): number => {
  return num1 + num2
}
```

示例代码2：同时指定
```typescript
type AddFn = (num1: number, num2: number) => number

const add: AddFn = (num1, num2) => {
  return num1 + num2
}
```

::: tip 注意：
通过类似箭头函数形式的语法来为函数添加类型，只使用与 `函数表达`
:::


### void 类型
> 掌握：void 函数返回值类型




### 可选参数

## 对象类型

### 基本使用

### 箭头函数类型

### 对象可选属性

### 使用类型别名

## 接口类型

### 基本使用

### interface vs type

### 接口继承

### type 交叉类型

## 元组类型

## 字面量类型

## 枚举类型

### 基本使用

### 数字枚举

### 字符串枚举

### 枚举原理

## any 类型

## 类型断言
