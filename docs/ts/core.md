# TypeScript 核心

## 类型注解{#annotate}

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

## 原始类型{#base}

> 知道：ts 有哪些类型，掌握：原始类型使用

TS 常用类型：

- JS 已有类型
  - 简单类型，`number` `string` `boolean` `null` `undefined`
  - 复杂类型，对象 数组 函数
- TS 新增类型
  - 联合类型、自定义类型(类型别名)、接口、元组、字面量类型、枚举、void、any、泛型 等

原始类型：

- 使用简单，完全按照 JS 的类型来书写即可

```typescript
let age: number = 18;
let myName: string = '黑马程序员';
let isLoading: boolean = false;
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

## 数组类型{#array}

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

## 联合类型{#union}

> 掌握：通过联合类型将多个类型合并为一个类型

需求：数组中有 `number` 和 `string` 类型，这个数组的类型如何书写？

```typescript
let arr: (number | string)[] = [1, 'a', 3, 'b'];
```

定义：

- 类型与类型之间使用 `|` 连接，代表类型可以是它们当中的其中一种，这种类型叫：`联合类型`

---

练习：给一个定时器 ID 加类型

```typescript
let timer: number | null = null;
timer = setInterval(() => {}, 1000);
```

思考：

```typescript
let arr: number | string[];
// 这是什么类型？
```

## 类型别名{#alias}

> 掌握：使用类型别名语法给类型取别字

示例代码：

```typescript
// let arr: ( number | string )[] = [ 1, 'a', 4]
// 类型别名: type 类型别名 = 具体类型
type CustomArr = (number | string)[];
let arr: CustomArr = [1, 'a', 4];
```

类型别名:

- `type 类型别名 = 具体类型` 基本语法
- 定义类型别名，遵循大驼峰命名规范，类似于变量
- 使用类型别名，与类型注解的写法一样即可

使用场景：

- 当同一类型（复杂）被多次使用时，可以通过类型别名，`简化` 该类型的使用

```typescript
type CustomArr = (number | string)[];
let arr: CustomArr = [1, 'a', 4];
let arr2: CustomArr = [2, 'b', 8];
```

## 函数类型{#fn}

### 基本使用{#fn-base}

> 掌握：给函数指定类型

- 给函数指定类型，其实是给 `参数` 和 `返回值` 指定类型。
- 两种写法：
  - 在函数基础上 `分别指定` 参数和返回值类型
  - 使用类型别名 `同时指定` 参数和返回值类型

示例代码 1：分别指定

```typescript
// 函数声明
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// 箭头函数
const add = (num1: number, num2: number): number => {
  return num1 + num2;
};
```

示例代码 2：同时指定

```typescript
type AddFn = (num1: number, num2: number) => number;

const add: AddFn = (num1, num2) => {
  return num1 + num2;
};
```

::: tip 注意：
通过类似箭头函数形式的语法来为函数添加类型，只适用于 `函数表达式`
:::

### void 类型{#fn-void}

> 掌握：void 函数返回值类型

- 如果函数没有返回值，定义函数类型时返回值类型为 `void`

```typescript
const say = (): void => {
  console.log('hi');
};
```

- 如果函数没有返回值，且没有定义函数返回值类型的时候，默认是 `void`

```typescript
const say = () => {
  console.log('hi');
};
```

注意：

- 在 `JS` 中如果没有返回值，默认返回的是 `undefined`
- 但是 `void` 和 `undefined` 在 `TypeScript` 中并不是一回事
- 如果指定返回值类型是 `undefined` 那返回值必须是 `undefined`(在[TS5.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html)版本可以不返回undefined)

```typescript
const add = (): undefined => {
  return undefined;
};
```

### 可选参数{#fn-params}

> 掌握： 使用 `?` 将参数标记为可选

- 如果函数的参数，可以传也可以不传，这种情况就可以使用 `可选参数` 语法，参数后加 `?` 即可

```typescript
const fn = (n?: number) => {
  // ..
};
fn();
fn(10);
```

- 练习，模拟 `slice` 函数，定义函数参数类型

```typescript
const mySlice = (start?: number, end?: number) => {
  console.log('起始Index:', start, '结束Index:', end);
};
mySlice();
mySlice(1);
mySlice(1, 2);
```

:::tip 注意：

- 必选参数不能位于可选参数后 `(start?: number, end: number)` 这样是不行的
  :::

## 对象类型{#object}

### 基本使用{#obj-base}

> 掌握：对象类型语法

- TS 的对象类型，其实就是描述对象中的 `属性` `方法` 的类型，因为对象是由属性和方法组成的。

```typescript
// 空对象
let person: {} = {};

// 有属性的对象
let person: { name: string } = {
  name: '同学',
};

// 有属性和方法，一行书写多个属性 ; 分隔
let person: { name: string; sayHi(): void } = {
  name: 'jack',
  sayHi() {},
};

// 换行写可以省略 ; 符号
let person: {
  name: string;
  sayHi(): void;
} = {
  name: 'jack',
  sayHi() {},
};
```

小结：

- 使用声明描述对象结构？`{}`
- 属性怎么写类型？`属性名: 类型`
- 方法怎么写类型? `方法名(): 返回值类型`

### 扩展用法{#obj-ext}

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
  url: string;
  method?: string;
};
const axios = (config: Config) => {};
```

小结：

- 对象的方法使用箭头函数类型怎么写？`{sayHi:()=>void}`
- 对象的可选参数怎么设置？`{name?: string}`
- 对象类型会使用 `{}` 如何提供可阅读性？`类型别名`

:::warning 练习
创建一个学生对象，该对象中具有以下属性和方法：

- 属性：必选属性：姓名、性别、成绩，可选属性：身高
- 方法：学习、打游戏（可选）
  :::

## 接口 interface{#interface}

### 基本使用{#interface-base}

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

### interface 继承{#interface-extends}

> 掌握：使用 extends 实现接口继承，达到类型复用

思考：

- 有两个接口，有相同的属性或者函数，如何提高代码复用？

```typescript
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}
```

继承：

- 相同的属性或展示可以抽离出来，然后使用 `extends` 实现继承复用

```typescript
interface Point2D {
  x: number;
  y: number;
}
// 继承 Point2D
interface Point3D extends Point2D {
  z: number;
}
// 继承后 Point3D 的结构：{ x: number; y: number; z: number }
```

小结：

- 接口继承的语法：`interface 接口A extends 接口B {}`
- 继承后 `接口A` 拥有 `接口B` 的所有属性和函数的类型声明

### type 交叉类型{#type}

> 掌握：使用 `交叉类型` 实现接口的继承效果

- 实现 `Point2D` 与 `{z: number}` 类型合并得到 `Ponit3D` 类型

```typescript
// 使用 type 来定义 Point2D 和 Point3D
type Point2D = {
  x: number;
  y: number;
};

// 使用 交叉类型 来实现接口继承的功能：
// 使用 交叉类型 后，Point3D === { x: number; y: number; z: number }
type Point3D = Point2D & {
  z: number;
};

let o: Point3D = {
  x: 1,
  y: 2,
  z: 3,
};
```

小结：

- 使用 `&` 可以合并连接的对象类型，也叫：`交叉类型`

### interface vs type{#interface-type}

> 了解：interface 和 type 的相同点和区别

- 类型别名和接口非常相似，在许多情况下，可以在它们之间`自由选择`。
- 接口的几乎所有特性都以类型的形式可用，关键的区别在于不能重新打开类型以添加新属性，而接口总是`可扩展`的。

| interface      | type                     |
| -------------- | ------------------------ |
| 支持：对象类型 | 支持：对象类型，其他类型 |
| 复用：可以继承 | 复用：交叉类型           |

不同的点：

- type 不可重复定义

```typescript
type Person = {
  name: string;
};
// 标识符“Person”重复  Error
type Person = {
  age: number;
};
```

- interface 重复定义会合并

```typescript
interface Person {
  name: string;
}
interface Person {
  age: number;
}
// 类型会合并，注意：属性类型和方法类型不能重复定义
const p: Person = {
  name: 'jack',
  age: 18,
};
```

小结：

- 它们都可以定义对象类型
- 它们都可以复用，interface 使用 `extends` , type 使用 `&`
- type 不能重复定义，interface 可以重复会合并

## 类型推断{#type-infer}

> 知道：TS 的的类型推断机制作用

- 在 TS 中存在类型推断机制，在没有指定类型的情况下，TS 也会给变量提供类型。

发生类型推断的几个场景场景：

- 声明变量并初始化时

```typescript
// 变量 age 的类型被自动推断为：number
let age = 18;
```

- 决定函数返回值时

```typescript
// 函数返回值的类型被自动推断为：number
const add = (num1: number, num2: number) => {
  return num1 + num2;
};
```

:::tip 建议：
- 将来在开发项目的时候，能省略类型注解的地方就省略，`充分利用TS推断` 的能力，提高开发效率。
- 在你还没有熟悉 ts 类型的时候建议都加上类型，比如今天第一次写 ts 最好都写上
- 如果你不知道类型怎么写，可以把鼠标放至变量上，可以通过 `Vscode` 提示看到类型
:::

## 字面量类型{#literal}

### 字面量类型介绍{#literal-intro}

> 知道：什么是字面量类型

- js 字面量如：`18` `'jack'` `['a']` `{age: 10}` 等等。
- 使用 `js字面量` 作为变量类型，这种类型就是字面量类型。

```typescript
// : 'jack' 是字面量类型
let name: 'jack' = 'jack';
// : 18 是字面量类型
let age: 18 = 18;

// 报错：不能将类型“19”分配给类型“18”
age = 19;
```

思考：这两个变量的类型是什么？

```typescript
let str1 = 'Hello TS';
const str2 = 'Hello TS';
```

- 通过类型推断发现，str1 类型是 `string` ， str2 类型是 `Hello TS`
- 原因：`str2` 是 `const` 声明的，值只能是 `Hello TS`，所以类型只能是 `Hello TS`

### 字面量类型应用{#literal-use}

> 知道：字面量类型的应用场景

例如：性别只能是 男 和 女，不会出现其他值。

```ts
// let gender = '男'
// gender = '女'
// ------------------------
type Gender = '男' | '女'
let gender: Gender = '男'
gender = '女'
```
小结：
- 字面量类型配合联合类型来使用，表示：一组明确的可选的值

例子：
```ts
// 使用自定义类型:
type Direction = 'up' | 'down' | 'left' | 'right'

function changeDirection(direction: Direction) {
  console.log(direction)
}

// 调用函数时，会有类型提示：
changeDirection('up')
```
- 解释：参数 `direction` 的值只能是 `up/down/left/right` 中的任意一个
- 优势：相比于 `string` 类型，使用字面量类型更加精确、严谨



## any 类型{#any}

> 知道：any 类型的作用是逃避 TS 的类型检查

- 显式any情况：当变量的类型指定为 any 的时候，不会有任何错误，也不会有代码提示，TS会忽略类型检查

```ts
let obj: any = { age: 18 }
obj.bar = 100
obj()
const n: number = obj
```
以上的代码虽然没有报错提示，但是将来是可能出现错误的。

- 隐式any的情况：声明变量不给类型或初始值，函数参数不给类型或初始值
```ts
// 声明变量不给类型或初始值
let a;
// 函数参数不给类型或初始值
const fn = (n) => {}
```

小结：
- `any` 的使用越多，程序可能出现的漏洞越多，因此**不推荐**使用 `any` 类型，尽量避免使用。



## 类型断言{#type-assert}

有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型。 比如，

```ts
// aLink 的类型 HTMLElement，该类型只包含所有标签公共的属性或方法
// 这个类型太宽泛，没包含 a 元素特有的属性或方法，如 href
const aLink = document.getElementById('link')
```
- 但是我们明确知道获取的是一个 `A` 元素，可以通过 `类型断言` 给它指定一个更具体的类型。
  
```ts
const aLink = document.getElementById('link') as HTMLAnchorElement
```
- 解释:
  1. 使用 `as` 关键字实现类型断言
  2. 关键字 `as` 后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）
  3. 通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了

例如：
```ts
const img = document.getElementById('img') as HTMLImageElement
// 如果不知道标签的类型：document.querySelector('div') 鼠标摸上去就可以看见
```

## 泛型{#generic}
:::tip
- 软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑**可重用性**。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。 
- 在TypeScript中，泛型是一种创建**可复用**代码组件的工具。这种组件不只能被一种类型使用，而是能被多种类型复用。类似于参数的作用，泛型是一种用以**增强类型（types）、接口（interfaces）、函数类型等**能力的非常可靠的手段。   
:::

### 泛型别名{#generic-alias}
> 掌握：泛型别名基本使用，实现类型复用

```ts
// 对后台返回的数据进行类型定义
type User = {
  name: string;
  age: number;
}

type Goods = {
  id: number;
  goodsName: string;
}

type Data<T> = {
  msg: string;
  code: number;
  data: T
}

// 使用类型
type UserData = Data<User>
type GoodsData = Data<Goods>
```

小结：
- 泛型：定义类型别名后加上`<类型参数>` 就是泛型语法， 使用的时候传入具体的类型即可
- `<T>` 是一个变量，可以随意命名，建议遵循大驼峰即可。
- 和类型别名配合，在类型别名后加上泛型语法，然后类型别名内就可以使用这个类型参数
- 泛型可以提高类型的`复用性`和`灵活性`



### 泛型接口{#generic-interface}
> 掌握：泛型接口基本使用，实现类型复用，了解内置泛型接口

```ts
// 对象，获取单个ID函数，获取所有ID函数，ID的类型肯定是一致的，但是可能是数字可能是字符串
interface IdFn<T> {
  id: () => T;
  ids: () => T[];
}

const idObj: IdFn<number> = {
  id() { return 1 },
  ids() { return [1, 2] },
};
```
- 在接口名称的后面添加 `<类型变量>`，那么，这个接口就变成了泛型接口，接口中所有成员都可以使用类型变量。

内置的泛型接口：
```ts
const arr = [1, 2, 3];
// TS有自动类型推断，其实可以看做：const arr: Array<number> = [1, 2, 3]
arr.push(4);
arr.forEach((item) => console.log(item));
```
- 可以通过 Ctrl + 鼠标左键(Mac：Command + 鼠标左键) 去查看内置的泛型接口



### 泛型函数{#generic-fn}

> 掌握：泛型函数基本使用，保证函数内类型复用，且保证类型安全

```ts
// 函数的参数是什么类型，返回值就是什么类型
function getId<T>(id: T): T {
  return id
}

let id1 = getId<number>(1)
let id2 = getId('2')
// TS会进行类型推断，参数的类型作为泛型的类型 getId<string>('2')
```

小结
- 泛型函数语法？
  - 函数名称后加上 `<T>` ， `T`是类型参数，是个类型变量，命名建议遵循大驼峰即可。
- `T` 什么时候确定？
  - 当你调用函数的时候，传入具体的类型，T 或捕获到这个类型，函数任何位置均可使用。
- 泛型函数好处？
  - 让函数可以支持不同类型（复用），且保证类型是安全的。
- 调用函数，什么时候可以省略泛型？
  - 传入的数据可以推断出你想要的类型，就可以省略。
```ts
// 我需要的类型 { name: string, age?: number } 但是推断出来是 { name: string}
let id2 = getId({name:'jack'})
```


## 综合案例{#case}

> 使用 TS 实现访问历史记录功能 

![image-20220906171234724](./images/image-20220906171234724.png)

需求：

- 刷新页面后，展示访问历史记录，记录包含：次数和时间。

步骤：
- 封装格式化时间函数，支持 Date 和 string 格式的时间，可选参数，转换成功 `10:10:10` 时分秒
- 定义访问记录单项 对象 类型，定义访问记录 列表 类型，需要存储在本地的 key 字面量类型
- 封装获取访问历史记录函数，返回类型是  记录列表
- 封装修改访问历史记录函数
- 封装一个展示访问历史记录函数，且调用

代码：

```ts
export {};


// 1. 封装格式化时间函数，支持 Date 和 string 格式的时间，转换成功 `10:10:10` 时分秒
const formatTime = (date?: Date | string): string => {
  if (!date) date = new Date()
  if (typeof date === 'string') date = new Date(date)
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${h}:${m}:${s}`;
};

// 2. 定义访问记录单项 对象 类型，定义访问记录 列表 类型，需要存储在本地的 key 字面量类型
type Data = {
  count: number;
  time: string;
};

type List = Array<Data>

const KEY = "ts-demo-data";


// 3. 封装获取访问历史记录函数，返回类型是  记录列表
const getData = () => {
  const str = localStorage.getItem(KEY);
  return JSON.parse(str || "[]") as List;
};

// 4. 封装修改访问历史记录函数
const updateData = () => {
  const list = getData()
  const lastItem = list[list.length - 1];
  list.push({
    count: lastItem ? lastItem.count + 1 : 1,
    time: formatTime(),
  });
  localStorage.setItem(KEY, JSON.stringify(list));
};

// 5. 封装一个展示访问历史记录函数，且调用
const render = () => {
  updateData();
  
  const data = getData()
  const app = document.querySelector("#app") as HTMLDivElement;
  app.innerHTML = data
    .map((item) => `次数：${item.count}，时间：${item.time}`)
    .join("<br/>");
};

render();
```

