# TypeScript 应用

## ① TypeScript与Vue
:::tip
typescript 配合 Vue3 composition-api 使用

https://staging-cn.vuejs.org/guide/typescript/composition-api.html
:::

## defineProps与Typescript
> 掌握：ts中defineProps的使用

1. defineProps的运行时写法

```ts
// 运行时声明
defineProps({
  money: {
    type: Number,
    required: true
  },
  car: {
    type: String,
    required: true
  }
})
```

2. defineProps配合ts的泛型定义props类型校验，这样更直接

```ts
// 使用ts的泛型指令props类型
defineProps<{
  money: number
  car?: string
}>()
```

3. props可以通过解构来指定默认值

```ts
<script lang="ts" setup>
// 使用ts的泛型指令props类型
const { money, car = '小黄车' } = defineProps<{
  money: number
  car?: string
}>()
</script>
```



如果提供的默认值需要在模板中渲染，需要额外添加配置

https://vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in

```ts
// vite.config.ts
export default {
  plugins: [
    vue({
      reactivityTransform: true
    })
  ]
}
```



## defineEmits与Typescript

> 掌握：defineEmits的使用

1. defineEmits配合运行时声明

```ts
const emit = defineEmits(['change', 'update'])
```

2. defineEmits配合ts 类型声明，可以实现更细粒度的校验

```ts
const emit = defineEmits<{
  (e: 'changeMoney', money: number): void
  (e: 'changeCar', car: string): void
}>()
```
- 基于类型的声明使我们可以对所触发事件的类型进行更细粒度的控制。


## ref与Typescript

> 掌握：ts中ref函数如何使用

1. 通过泛型指定value的值类型，如果是简单值，该类型可以省略

```ts
const money = ref<number>(10)

const money = ref(10)
```

2. 如果是复杂类型，推荐指定泛型

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
})
```

## reactive与TypeScript
> 掌握：ts中reactive函数的使用

`reactive()` 也会隐式地从它的参数中推导类型：

```ts
import { reactive } from 'vue'

// 推导得到的类型：{ title: string }
const book = reactive({ title: 'Vue 3 指引' })
```

要显式地标注一个 reactive property 的类型，我们可以使用接口：

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 指引' })
```

- 不推荐使用 `reactive()` 的泛型参数，因为底层和ref实现不一样。



## computed与Typescript

`computed()` 会从其计算函数的返回值上推导出类型：

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// 推导得到的类型：ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

你还可以通过泛型参数显式指定类型：

```ts
const double = computed<number>(() => {
  // 若返回值不是 number 类型则会报错
})
```


## 事件处理与Typescript
> 掌握：在ts中如何给事件处理加类型

没加类型：
```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` implicitly has `any` type
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

处理类型：
```ts
// 1. handleChange($event) 查看$event类型
function handleChange(event: Event) {
  // `event` 隐式地标注为 `any` 类型
  // 2. document.querySelector('input') 查看返回值类型
  console.log((event.target as HTMLInputElement).value)
}
```

## Template Ref与Typescript
> 掌握：在ts中通过ref获取dom的操作

模板 ref 需要通过一个显式指定的泛型参数和一个初始值 null 来创建：

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

:::tip
注意为了严格的类型安全，有必要在访问 el.value 时使用可选链或类型守卫。这是因为直到组件被挂载前，这个 ref 的值都是初始的 null，并且在由于 v-if 的行为将引用的元素卸载时也可以被设置为 null。
:::


## ② TypeScript类型声明文件
:::tip
typescript 类型声明文件相关知识
:::



## 基本介绍


## 内置类型声明文件


## 第三方库类型声明文件


## 自定义类型声明文件

