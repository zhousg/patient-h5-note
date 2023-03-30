# TypeScript 应用

## ① TypeScript与Vue{#ts-vue}
:::tip
typescript 配合 Vue3 composition-api 使用

https://staging-cn.vuejs.org/guide/typescript/composition-api.html
:::

前提：script 加上 `lang="ts"` 才能写ts代码
```vue
<script setup lang="ts"></script>
```


## defineProps的TS写法{#ts-define-props}

1. defineProps 的基本使用：

```ts
const props = defineProps({
  money: {
    type: Number,
    required: true
  },
  car: {
    type: String,
    required: false,
    default: '宝马车'
  }
})
console.log(props.money) // number
console.log(props.car) // string | undefined
```

2. defineProps 通过泛型参数来定义 props 的类型通常更直接：

```ts
const props = defineProps<{
  money: number
  car?: string
}>()
```

3. 如果需要给 props 设置默认值，需要使用 `withDefaults` 函数：

```ts
const props = withDefaults(defineProps<{
  money: number;
  car?: string;
}>(),{
  car: '宝马车'
})
```

4. 上面写法太笨拙，可以使用 [响应式语法糖](https://cn.vuejs.org/guide/extras/reactivity-transform.html#reactive-props-destructure) 解构 + defineProps 就行：

```ts
const { money, car = "宝马车" } = defineProps<{
  money: number
  car?: string
}>();
```
注意：目前需要 [显式地选择开启](https://cn.vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in) ，因为它还是一个实验性特性。

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
});
```
:::tip
[响应式语法糖](https://cn.vuejs.org/guide/extras/reactivity-transform.html#reactive-props-destructure) 即将移除，建议使用 withDefaults 过度
:::

## defineEmits的TS写法{#ts-define-emits}

1. defineEmits 的基本用法：

```ts
const emit = defineEmits(['changeMoney', 'changeCar'])
```

2. defineEmits 通过泛型参数来定义，可以实现更细粒度的校验：

```ts
const emit = defineEmits<{
  (e: 'changeMoney', money: number): void
  (e: 'changeCar', car: string): void
}>()
```

了解：扩展TS语法 [调用签名](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures)


## ref的TS写法{#ts-ref}

`ref()` 会隐式的依据数据推导类型

1. 如果是简单类型，推荐使用类型推导：

```ts
// const money = ref<number>(10)

const money = ref(10)
```

2. 如果是复杂类型，推荐指定泛型：

```ts
type Todo = {
  id: number
  name: string
  done: boolean
}
const list = ref<Todo[]>([])

setTimeout(() => {
  list.value = [
    { id: 1, name: '吃饭', done: false },
    { id: 2, name: '睡觉', done: true }
  ]
}, 1000)
```
复杂数据一般是后台返回数据，默认值是空，无法进行类型推导。


## reactive的TS写法{#ts-reactive}

`reactive()` 也会隐式的依据数据推导类型

1. 默认值属性是固定的，推荐使用类型推导：

```ts
// 推导得到的类型：{ title: string }
const book = reactive({ title: 'Vue3 在线医疗' })  
```

2. 根据默认值推导不出我们需要的类型，推荐使用接口或者类型别名给变量指定类型：

```ts
// 我们想要的类型：{ title: string, year?: number }
type Book = {
  title: string
  year?: number
}
const book: Book = reactive({ title: 'Vue3 在线医疗' })
book.year = 2022
```

- 官方：不推荐使用 `reactive()` 的泛型参数，因为底层和 `ref()` 实现不一样。



## computed和TS{#ts-computed}

1. `computed()` 会从其计算函数的返回值上推导出类型：

```ts
import { ref, computed } from 'vue'

const count = ref(100);
const doubleCount = computed(() => count.value * 2);
```

2. 可以通过泛型参数显式指定类型：

```ts
const doubleMoney = computed<string>(() => (count.value * 2).toFixed(2));
```


## 事件处理与TS{#ts-event}

1. 不加类型，event默认是any，类型不安全：
```vue
<script setup lang="ts">
// 提示：参数“event”隐式具有“any”类型。  
const handleChange = (event) => {
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

2. 处理类型：

```ts
// `event` 隐式地标注为 `any` 类型，如何指定：event 类型?
// 1. @change="handleChange($event)"" 查看$event类型
// 2. 鼠标摸一下事件 @change 查看类型
const handleChange = (event: Event) => {
  // `event.target` 是 `EventTarget | null` 类型，如何指定具体类型？
  // document.querySelector('input') 查看返回值类型
  console.log((event.target as HTMLInputElement).value)
}
```

## Template Ref与TS{#ts-ref-attr}

模板 `ref` 需要通过一个显式指定的泛型参数，建议默认值 `null`

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement| null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

- 注意为了严格的类型安全，有必要在访问 `el.value` 时使用可选链或类型守卫。
- 这是因为直到组件被挂载前，这个 `ref` 的值都是初始的 `null`，并且在由于 `v-if` 的行为将引用的元素卸载时也可以被设置为 `null`。


## 非空断言{#ts-non-null}

处理类型可能是 null 或 undefined 的值，下面的属性或函数的访问赋值：

1. 可选链

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';


const input = ref< HTMLInputElement | null >(null)

onMounted(()=>{
  // 只能访问
  console.log(input.value?.value);
})

</script>

<template>
  <div>App组件</div>
  <input type="text" ref="input" value="abc">
</template>
```

2. 逻辑判断

```ts
  if (input.value) {
    console.log(input.value.value)
    input.value.value = '123'
  }
```

3. 非空断言

```ts
  // 一定要确定不为空！！！
  console.log(input.value!.value)
  input.value!.value = '123'
```


## ② TypeScript类型声明文件{#ts-declare}
:::tip
typescript 类型声明文件相关知识
:::

## 基本介绍{#ts-declare-intro}
> 知道：TS类型声明文件是什么以及作用

项目中安装的第三方库里面都是打包后的JS代码，但是我们使用的时候却有对应的TS类型提示，这是为什么呢？
- 在第三方库中的JS代码都有对应的 `TS类型声明文件`


什么是类型什么文件？
- 通俗地来讲，在 TypeScript 中以 .d.ts 为后缀的文件，我们称之为 TypeScript 类型声明文件。它的主要作用是描述 JavaScript 模块内所有导出成员的类型信息。


TS 中有两种文件类型：`.ts` 文件 `.d.ts` 文件作用是啥？
- .ts 文件:
  1. `既包含类型信息又可执行代码`
  2. 可以被编译为 .js 文件，然后，执行代码
  3. 用途：编写程序代码的地方
- .d.ts 文件:
  1. `只包含类型信息`的类型声明文件
  2. 不会生成 .js 文件，仅用于提供类型信息,在.d.ts文件中不允许出现可执行的代码，只用于提供类型
  3. 用途：为 JS 提供类型信息

小结：
- .ts 是 `implementation` 代码实现文件
- .d.ts 是  `declaration` 类型声明文件
- 如果要为 JS 库或者模块提供类型，就需要类型声明文件


## 内置类型声明文件{#ts-declare-file}

> 知道：什么是内置的类型什么文件


- 发现，在使用数组时，数组所有方法都会有相应的代码提示以及类型信息:

```ts
const strs = ['a', 'b', 'c']
// 鼠标放在 forEach 上查看类型
strs.forEach
```

TypeScript 给 JS 运行时可用的所有标准化内置 API 都提供了声明文件，这个声明文件就是 `内置类型声明文件`

- 可以通过 Ctrl + 鼠标左键(Mac：Command + 鼠标左键)来查看内置类型声明文件内容
  - 查看 forEach 的类型声明，在 VSCode 中会自动跳转到 `lib.es5.d.ts` 类型声明文件中
  - 像 window、document 等 BOM、DOM API 也都有相应的类型声明文件 `lib.dom.d.ts`

## 第三方库类型声明文件{#ts-declare-3th}

> 掌握：给第三方库添加对应的类型声明文件

首先，常用的第三方库都有相应的类型声明文件，只是使用的方式不同而已。

情况1：库本身自带类型声明文件
- 比如：axios，安装后可查看 `node_modules/axios` 可发现对应的类型声明文件。
- 导入 axios 后就会加载对应的类型文件，提供该库的类型声明。

情况2：由 DefinitelyTyped 提供
- 比如：jquery，安装后导入，提示：需要安装 `@types/jquery` 类型声明包
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/) 是一个 github 仓库，用来提供高质量 TypeScript 类型声明
- 当安装 `@types/*` 类型声明包后，TS 也会自动加载该类声明包，以提供该库的类型声明

https://www.typescriptlang.org/dt/search  可以搜索是否有对应的 `@types/*`


## 自定义类型声明文件{#ts-declare-custom}

### 共享类型(重要)
> 掌握：使用类型声明文件提供需要共享的TS类型

- 如果多个 `.ts` 文件中都用到同一个类型，此时可以创建 `.d.ts` 文件提供该类型，实现类型共享。
- 操作步骤:
  1. 创建 `index.d.ts` 类型声明文件。
  2. 创建需要共享的类型，并使用 `export` 导出(TS 中的类型也可以使用 `import/export` 实现模块化功能)。
  3. 在需要使用共享类型的 `.ts` 文件中，通过 `import` 导入即可(`.d.ts` 后缀导入时，直接省略)。

`src/types/data.d.ts`
```ts
export type Person = {
  id: number;
  name: string;
  age: number;
};
```
`App.vue`
```vue
<script lang="ts" setup>
import { Person } from './types/data'
const p: Person = {
  id: 100,
  name: 'jack',
  age: 19
}
</script>
```


### 给JS文件提供类型
> 了解：使用类型声明文件给JS文件添加类型

- 在导入 .js 文件时，TS 会自动加载与 .js 同名的 .d.ts 文件，以提供类型声明。
- declare 关键字：
  - 用于类型声明，为其他地方(比如，.js 文件)已存在的变量声明类型，而不是创建一个新的变量。
  1. 对于 `type` `interface` 等这些明确就是 TS 类型的(只能在 TS 中使用的)，可以`省略` declare 关键字。
  2. 其他 JS 变量，应该使用 `declare` 关键字，明确指定此处用于类型声明。

`add/index.js`
```js
const add = (a, b) => {
  return a + b;
};

const point = (p) => {
  console.log('坐标：', p.x, p.y);
};

export { add, point }
```
`add/index.d.ts`
```ts
declare const add: (a: number, b: number) => number;

type Position = {
  x: number;
  y: number;
};

declare const point: (p: Position) => void;

export { add , point};
```
`main.ts`
```ts
import { add , point} from './add';

add(3, 10)

point({x: 100, y: 200})
```