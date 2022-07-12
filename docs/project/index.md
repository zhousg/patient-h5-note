## 在线问诊-起步













### 01-Pinia基本使用



![image-20220708155637594](./images/image-20220708155637594.png)

在Vue3使用Pinia不需要有心智负担，状态管理可以使用组合API实现，且再也不要担心this的问题。

真的这么简单吗？主要从仓库的创建和使用，状态的管理来体会。





使用步骤：

- 安装

```bash
yarn add pinia
# or
npm i pinia
```

- 导入，实例化，当做插件使用，和其他插件使用套路相同

```diff
import { createApp } from 'vue'
+ import { createPinia } from 'pinia'
import App from './App.vue'

+ const pinia = createPinia()
const app = createApp(App)

+ app.use(pinia)
app.mount('#app')
```

- 创建仓库&使用仓库

```js
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCounterStore = defineStore("counter", () => {
  return {}
})
```

```vue
<script setup lang="ts">
import { useCounterStore } from "./store/counter"
// store中有状态和函数
const store = useCounterStore()
</script>
```

- 进行状态管理

```typescript
  // state
  const count = ref(100)
  // getters
  const doubleCount = computed(() => count.value * 2)
  // mutations
  const update = () => count.value++
  // actions
  const asyncUpdate = () => {
    setTimeout(() => {
      count.value++
    }, 1000)
  }
  return { count, doubleCount, update, asyncUpdate }
```

```vue
<template>
  APP {{ store.count }} {{ store.doubleCount }}
  <button @click="store.update()">count++</button>
  <button @click="store.asyncUpdate()">async update</button>
</template>
```



总结：

- 通过 `const useXxxStore = defineStore('id',函数)` 创建仓库得到使用仓库的函数

| Vuex                 | Pinia                               |
| -------------------- | ----------------------------------- |
| state                | `ref` 和 `reactive`创建的响应式数据 |
| getter               | `computed` 创建的计算属性           |
| mutations 和 actions | 普通函数，同步异步均可              |

- 与在组件中维护数据相同，这就是 `Pinia` 的状态管理基本使用