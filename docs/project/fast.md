# 极速问诊模块

## 极速问诊-需求分析{#fast-product}
> 理解：极速问诊阶段流程分析

![image-20220813195713860](./images/image-20220813195713860.png)

极速问诊阶段：

1. 极速问诊（记录-问诊类型）

2. 三甲图文问诊 或 普通图文问诊（记录-极速问诊类型）

3. 选择科室（记录-疾病科室）

4. 描述病情（记录-症状详情、时间、是否就诊过、图片）

5. 选择患者（记录-患者ID）

6. 支付问诊费

所有流程走完才能组合成完整的问诊记录，而且是不同的页面采集数据，这个实现需要 `pinia` 

还有一个发现：接口数据

- type 就诊类型：  1找医生   2极速问诊   3开药问诊  `type:1|2|3`
- illnessType 极速问诊类型：0普通  1三甲	`illnessType: 0|1`

提问：

- 刚刚看到 1 2 3 的时候你能记得他们代表什么意思吗？
  - 不清楚，对于数字字面量类型的联合类型语义差，建议使用 `枚举`



## 枚举基本语法{#enum-base}

> 掌握：枚举的基本语法和使用细节

- 作用：表示一组明确可选的值，和字面量类型配合联合类型类似。
- 解释：枚举可以定义一组常量，使用该类型后，约定只能使用这组常量中的其中一个。

```ts
// 创建枚举类型
enum Direction { Up, Down, Left, Right }

// 使用枚举类型
const changeDirection = (direction: Direction) => {
  console.log(direction)
}

// 调用函数时，需要应该传入：枚举 Direction 成员的任意一个
// 类似于 JS 中的对象，直接通过 点（.）语法 访问枚举的成员
changeDirection(Direction.Up)
```

问题：
- 通过枚举访问其成员，成员的值是什么？
  - 默认从 0 开始自增的数值
- 可以修改其成员的值吗？
  - `Up = 10` , 后面是从 10 开始自增
- 成员的值可以使用字符串吗？
  - `Up = 'Up'` 可以，但是后面的值都需要使用字符串。


## 枚举使用场景{#enum-intro}

> 场景：用于一组没有语义的可选值，给它们添加类型。

比如：
- 后台给的数据： 0 是男  1 是女  ----   1 是待付款  5 是已付款  8 是已完成
- 好处，通过枚举可以让成员更加语义化，提高代码可读性

代码：
```ts
// 性别
enum GenderType {
  Boy,
  Girl
}
const showGender = (gender: GenderType) => {
  if (gender === GenderType.Boy) {
    console.log('性别：男')
  }
}
showGender(GenderType.Boy)
// 订单状态
enum OrderStatus {
  UnPay = 1,
  Payed = 5,
  Complete = 8
}
const showOrderStatus = (status: OrderStatus) => {
  if (status === OrderStatus.Complete) {
    console.log('状态：已完成')
  }
}
showOrderStatus(OrderStatus.Complete)
```

小结：
- 枚举一般使用在，表示一组明确可选的值，语义化不高的情况。
- 如果这组可选值语义很高，如 ` unpay | payed | complete ` ，使用字面量配合联合类型更简单些。
思考：
- 枚举的选项可以代表值，可以写在 `d.ts` 文件吗？
  - 不能，有值的需要写在 ts 文件中


## 极速问诊-定义类型{#fast-type}
> 定义问诊记录数据相关类型

步骤：
- 问诊类型枚举
- 问诊时间枚举
- 图片数组类型
- 问诊记录类型

代码：

`enums/index.ts`
```ts
// 问诊类型
export enum ConsultType {
  Doctor = 1,
  Fast = 2,
  Medication = 3
}
// 问诊时间，以1自增可以省略
export enum ConsultTime {
  Week = 1,
  Month,
  HalfYear,
  More
}
```

`types/fast.d.ts`
```ts
import { ConsultType, IllnessTime } from '@/enums'

// 图片列表
export type Images = {
  id: string
  url: string
}[]
// 问诊记录
export type Consult = {
  id: string
  type: ConsultType
  illnessType: 0 | 1
  depId: string
  illnessDesc: string
  illnessTime: ConsultTime
  consultFlag: 0 | 1
  pictures: Images
  patientId: string
}

// 问诊记录-全部可选
export type PartialConsult = Partial<Consult>
// Required 转换为全部必须   Partial 转换问全部可选  两个内置的泛型类型
```
小结：
- 全部可选是因为信息是一点一点累加上去的
- Required 转换为全部必须
- Partial 转换问全部可选 

注意：
- 枚举类型需要在 ts 文件中，因为枚举会编译成 js 代码

## 极速问诊-问诊记录仓库{#fast-consult-store}
> 实现：病情描述仓库的定义，实现问诊记录分步修改

步骤：
- 定义仓库，提供
  - 问诊记录状态
  - 修改问诊类型
  - 修改极速问诊类型
  - 修改科室
  - 修改病情描述相关信息
  - 修改患者
  - 清空记录
- 导出仓库
- 首页点击极速问诊记录问诊类型且跳转页面

代码：

1）定义仓库 `stores/modules/consult.ts`

```ts
import { ConsultType } from '@/enums'
import type { PartialConsult, Consult } from '@/types/fast'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    const consult = ref<PartialConsult>({})
    // 设置问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 设置极速问诊类型
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 设置科室
    const setDep = (id: string) => (consult.value.depId = id)
    // 设置病情描述
    const setIllnes = (
      illness: Pick<Consult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>
    ) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 设置患者
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 清空记录
    const clear = () => (consult.value = {})
    return { consult, setType, setIllnessType, setDep, setIllnes, setPatient, clear }
  },
  {
    persist: true
  }
)
```

2) 导出仓库 `stores/index.ts`
```
export * from './modules/consult'
```

3）首页点击极速问诊记录问诊类型且跳转页面 `views/Home/index.vue`

```ts
import { useConsultStore } from '@/stores'
import { ConsultType } from '@/enums'

const store = useConsultStore()
```

```html
<router-link to="/fast" @click="store.setType(ConsultType.Fast)" class="nav">
```

## 极速问诊-选择极速问诊类型{#fast-consult-type}

![image-20220815133500165](./images/image-20220815133500165.png)

> 完成选择三甲还是普通问诊页面，点击后记录对应的类型，跳转到选择科室路由

步骤：
- 路由和组件
- 编写页面布局
- 点击入口记录极速问诊类型

代码：

1）路由和组件 

`Fast/index.vue`
```vue
<script setup lang="ts"></script>

<template>
  <div class="fast-page">fast</div>
</template>

<style lang="scss" scoped></style>
```
`router/index.ts`
```ts
    {
      path: '/fast',
      component: () => import('@/views/Fast/index.vue'),
      meta: { title: '极速问诊' }
    }
```

2）编写页面布局

```vue
<script setup lang="ts"></script>

<template>
  <div class="fast-page">
    <cp-nav-bar title="极速问诊" right-text="问诊记录"></cp-nav-bar>
    <div class="fast-logo">
      <img class="img" src="@/assets/fast-consult.png" alt="" />
      <p class="text"><span>20s</span> 快速匹配专业医生</p>
    </div>
    <div class="fast-type">
      <router-link to="/fast/dep" class="item">
        <cp-icon class="pic" name="fast-doctor"></cp-icon>
        <div class="info">
          <p>三甲图文问诊</p>
          <p>三甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
      <router-link to="/fast/dep" class="item">
        <cp-icon class="pic" name="fast-message"></cp-icon>
        <div class="info">
          <p>普通图文问诊</p>
          <p>二甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fast-page {
  padding-top: 46px;
  .fast-logo {
    padding: 30px 0;
    text-align: center;
    .img {
      width: 240px;
    }
    .text {
      font-size: 16px;
      margin-top: 10px;
      > span {
        color: var(--cp-primary);
      }
    }
  }
  .fast-type {
    padding: 15px;
    .item {
      display: flex;
      padding: 16px;
      border-radius: 4px;
      align-items: center;
      margin-bottom: 16px;
      border: 0.5px solid var(--cp-line);
    }
    .pic {
      width: 40px;
      height: 40px;
    }
    .info {
      margin-left: 12px;
      flex: 1;
      > p:first-child {
        font-size: 16px;
        color: var(--cp-text1);
        margin-bottom: 4px;
      }
      > p:last-child {
        font-size: 13px;
        color: var(--cp-tag);
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
</style>
```


3）点击入口记录极速问诊类型

```ts
<script setup lang="ts">
import { useConsultStore } from '@/stores'

const store = useConsultStore()
</script>
```

```html
      <router-link to="/fast/dep" class="item" @click="store.setIllnessType(1)">
```

```html
      <router-link to="/fast/dep" class="item" @click="store.setIllnessType(0)">
```


## 极速问诊-选择科室-布局{#fast-consult-dep-html}
> 实现：路由与组件，和基础结构

步骤：
- 组件与路由
- 一级科室使用 sidebar 组件
- 二级科室绘制

代码：

1）路由与组件

`Fast/ConsultDep.vue`
```vue
<script setup lang="ts"></script>

<template>
  <div class="consult-dep-page">consult-dep</div>
</template>

<style lang="scss" scoped></style>
```
`router/index.ts`
```ts
    {
      path: '/fast/dep',
      component: () => import('@/views/Fast/ConsultDep.vue'),
      meta: { title: '选择科室' }
    }
```

1) 页面布局-一级科室

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item title="内科" />
        <van-sidebar-item title="外科" />
        <van-sidebar-item title="皮肤科" />
        <van-sidebar-item title="骨科" />
      </van-sidebar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
}
</style>
```

3) 页面布局-二级科室
```html
      <div class="sub-dep">
        <router-link to="/fast/illness">科室一</router-link>
        <router-link to="/fast/illness">科室二</router-link>
        <router-link to="/fast/illness">科室三</router-link>
      </div>
```
```scss
.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
```

小结
- 需要实现一级科室的切换要绑定数据

## 极速问诊-选择科室-业务{#fast-consult-dep-logic}
> 实现：科室切换以及跳转到病情描述

步骤：

- 编写科室需要的类型
- 准备API函数
- 实现一级科室切换
- 实现二级科室切换
- 跳转时记录科室到问诊记录


代码：

1）编写科室需要的类型 `types/fast.d.ts`
```ts
// 科室
export type SubDep = {
  id: string
  name: string
}

export type TopDep = SubDep & {
  child: SubDep[]
}
```

2）准备API函数 `services/fast.ts`
```diff
import type {
  DoctorPage,
  FollowType,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
+  TopDep
} from '@/types/fast'

+export const getAllDep = () => request<TopDep[]>('/dep/all')
```

3）实现一级科室切换 `Fast/ConsultDep.vue`

```ts
import { getAllDep } from '@/services/fast'
import type { TopDep } from '@/types/fast'
import { onMounted, ref } from 'vue'
```
```ts
// 一级科室
const allDep = ref<TopDep[]>([])
onMounted(async () => {
  const res = await getAllDep()
  allDep.value = res.data
})
```
```html
      <van-sidebar v-model="active">
        <van-sidebar-item :title="top.name" v-for="top in allDep" :key="top.id" />
      </van-sidebar>
```

4）实现二级科室切换
```ts
import { computed, onMounted, ref } from 'vue'
```
```ts
// 二级科室，注意：组件初始化没有数据 child 可能拿不到
const subDep = computed(() => allDep.value[active.value]?.child)
```
```html
      <div class="sub-dep">
        <router-link to="/fast/illness" v-for="sub in subDep" :key="sub.id">
          {{ sub.name }}
        </router-link>
      </div>
```

5）跳转时记录科室到问诊记录
```ts
import { useConsultStore } from '@/stores'

const store = useConsultStore()
```

```diff
        <router-link
          to="/fast/illness"
          v-for="sub in subDep"
          :key="sub.id"
+          @click="store.setDep(sub.id)"
        >
          {{ sub.name }}
        </router-link>
```



## 病情描述-基础布局{#illness-html}
> 实现：路由和组件以及页面的基础布局（医生提示，描述，症状时间，是否已就诊）


1）路由与组件

```vue
<script setup lang="ts"></script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
}
</style>
```

2) 病情描述头部提示

```ts
import avatar from '@/assets/avatar-doctor.svg'
```
```html
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <van-image :src="avatar"></van-image>
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe"><cp-icon name="fast-safe" /><span>内容仅医生可见</span></p>
      </div>
    </div>
```
```scss
.illness-tip {
  display: flex;
  padding: 15px;
  .van-image {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
```

2）准备表单数据

`types/fast.d.ts`
```ts
// 问诊记录-病情描述全部必填
export type ConsultIllness = Pick<
  Consult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>
```
`stores/modules/consult.ts`
```ts
import type { PartialConsult, ConsultIllness } from '@/types/fast'
```
```diff
    // 设置病情描述
+    const setIllnes = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
```
`Fast/ConsultIllness.vue`
```ts
import type { ConsultIllness } from '@/types/fast'
import { ref } from 'vue'
import { IllnessTime } from '@/enums'

const timeOptions = [
  { label: '一周内', value: 1 },
  { label: '一月内', value: 2 },
  { label: '半年内', value: 3 },
  { label: '大于半年', value: 4 }
]
const flagOptions = [
  { label: '就诊过', value: 0 },
  { label: '没就诊过', value: 1 }
]
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: IllnessTime.Week,
  consultFlag: 0,
  pictures: []
})
```
```html
<!-- 表单 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn :options="timeOptions" v-model="form.illnessTime" />
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn :options="flagOptions" v-model="form.consultFlag" />
      </div>
    </div>
```

```scss
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
```

## 病情描述-图片上传{#illness-img}


## 病情描述-保存数据{#illness-data}