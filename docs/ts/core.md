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

- 如果函数没有返回值，定义函数类型时返回值类型为 `void`
```typescript
const say = (): void => {
  console.log('hi')
}
```

- 如果函数没有返回值，且没有定义函数返回值类型的时候，默认是 `void`
```typescript
const say = () => {
  console.log('hi')
}
```

注意：
- 在 `JS` 中如果没有返回值，默认返回的是 `undefined` 
- 但是 `void` 和 `undefined` 在 `TypeScript` 中并不是一回事
- 如果指定返回值类型是 `undefined` 那返回值必须是 `undefined` 
```typescript
const add = (): undefined => {
  return undefined
}
```

### 可选参数
> 掌握： 使用 `?` 将参数标记为可选

- 如果函数的参数，可以传也可以不传，这种情况就可以使用 `可选参数` 语法，参数后加 `?` 即可
```typescript
const fn = (n?: number) => {
  // ..
}
fn()
fn(10)
```

- 练习，模拟 `slice` 函数，定义函数参数类型
```typescript 
const mySlice = (start?: number, end?: number) => {
  console.log('起始Index:', start, '结束Index:', end);
};
mySlice()
mySlice(1)
mySlice(1, 2)
```

:::tip 注意：
- 必选参数不能位于可选参数后 `(start?: number, end: number)` 这样是不行的
:::



## 对象类型

### 基本使用

> 掌握：对象类型语法

- TS 的对象类型，其实就是描述对象中的 `属性` `方法` 的类型为，对象是由属性和方法组成的。

```typescript
// 空对象
let person: {} = {}

// 有属性的对象
let person: { name: string } = {
  name: '同学'
}

// 有属性和方法，一行书写多个属性 ; 分隔
let person: { name: string; sayHi(): void } = {
  name: 'jack',
  sayHi() {},
};

// 换行写可以省略 ; 符号
let person: { 
  name: string
  sayHi(): void 
} = {
  name: 'jack',
  sayHi() {},
};
```
小结：
- 使用声明描述对象结构？`{}`
- 属性怎么写类型？`属性名: 类型`
- 方法怎么写类型? `方法名(): 返回值类型`


### 扩展用法

> 掌握：对象类型中，函数使用箭头函数类型，属性设置可选，使用类型别名。


- 函数使用箭头函数类型
```typescript{3}
let person: { 
  name: string
  sayHi: () => void
} = {
  name: 'jack',
  sayHi() {},
};
```

- 对象属性可选
```typescript
// 例如：axios({url,method}) 如果是 get 请求 method 可以省略
const axios = (config: { url: string; method?: string }) => {};
```

- 使用类型别名
```typescript
// {} 会降低代码可阅读性，建议对象使用类型别名
// const axios = (config: { url: string; method?: string }) => {};
type Config = {
  url: string
  method?: string
}
const axios = (config: Config) => {};
```

小结：
- 对象的方法使用箭头函数类型怎么写？`{sayHi:()=>void}`
- 对象的可选参数怎么设置？`{name?: string}`
- 对象类型会使用 `{}` 如何提供可阅读性？`类型别名`

:::warning 作业
创建一个学生对象，该对象中具有以下属性和方法：
- 属性：必选属性：姓名、性别、成绩，可选属性：身高
- 方法：学习、打游戏（可选）
:::


## 接口类型



### 基本使用

> 掌握：使用 interface 声明对象类型

- 接口声明是命名对象类型的另一种方式
```typescript
// 通过interface定义对象类型
interface Person {
  name: string;
  age: number;
  sayHi: () => void;
}
// 使用类型
let person: Person = {
  name: 'jack',
  age: 19,
  sayHi() {},
};
```
小结：
- `interface` 后面是接口名称，和类型别名的意思一样。
- 指定 `接口名称` 作为变量的类型使用。
- 接口的每一行只能有 `一个` 属性或方法，每一行不需要加分号。


### interface 继承

> 掌握：使用 extends 实现接口继承，达到类型复用

思考：
- 有两个接口，有相同的属性或者函数，如何提高代码复用？
```typescript
interface Point2D { x: number; y: number }
interface Point3D { x: number; y: number; z: number }
```

继承：
- 相同的属性或展示可以抽离出来，然后使用 `extends` 实现继承复用
```typescript
interface Point2D { x: number; y: number }
// 继承 Point2D
interface Point3D extends Point2D {
  z: number
}
// 继承后 Point3D 的结构：{ x: number; y: number; z: number }
```
小结：
- 接口继承的语法：`interface 接口A extends 接口B {}`
- 继承后 `接口A` 拥有 `接口B` 的所有属性和函数的类型声明


### type 交叉类型
> 掌握：使用 `交叉类型` 实现接口的继承效果

- 实现 `Point2D` 与 `{z: number}` 类型合并得到 `Ponit3D` 类型

```typescript
// 使用 type 来定义 Point2D 和 Point3D
type Point2D = {
  x: number
  y: number
}

// 使用 交叉类型 来实现接口继承的功能：
// 使用 交叉类型 后，Point3D === { x: number; y: number; z: number }
type Point3D = Point2D & {
  z: number
}

let o: Point3D = {
  x: 1,
  y: 2,
  z: 3
}
```
小结：
- 使用 `&` 可以合并连接的对象类型，也叫：`交叉类型`


### interface vs type
> 了解：interface 和 type 的相同点和区别

- 类型别名和接口非常相似，在许多情况下，您可以在它们之间`自由选择`。
- 接口的几乎所有特性都以类型的形式可用，关键的区别在于不能重新打开类型以添加新属性，而接口总是`可扩展`的。

| interface | type |
| ---- | ---- |
| 支持：对象类型 | 支持：对象类型，其他类型 |
| 复用：可以继承 | 复用：交叉类型 |

不同的点：

- type 不可重复定义
```typescript
type Person = {
  name: string
}
// 标识符“Person”重复  Error
type Person = {
  age: number
}
```
- interface 重复定义会合并
```typescript
interface Person {
  name: string
}
interface Person {
  age: number
}
// 类型会合并，注意：属性和方法不同重复定义
const p: Person = {
  name: 'jack',
  age: 18
}
```

小结：
- 它们都可以定义对象类型
- 它们都可以复用，interface 使用 `extends` , type 使用 `&`
- type 不能重复定义，interface 可以重复会合并





## 元组类型

## 字面量类型

## 枚举类型

### 基本使用

### 数字枚举

### 字符串枚举

### 枚举原理

## any 类型

## 类型断言
