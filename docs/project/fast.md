# 快速问诊模块

## 快速问诊-需求分析{#fast-product}
> 理解：快速问诊阶段流程分析

![image-20220813195713860](./images/image-20220813195713860.png)

快速问诊阶段：

1. 快速问诊（记录-问诊类型）

2. 三甲图文问诊 或 普通图文问诊（记录-快速问诊类型）

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


## 快速问诊-定义类型{#fast-type}
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

## 快速问诊-问诊记录仓库{#fast-consult-store}
> 实现：病情描述仓库的定义，实现问诊记录分步修改

步骤：
- 定义仓库，提供
  - 问诊记录状态
  - 修改问诊类型
  - 修改快速问诊类型
  - 修改科室
  - 修改病情描述相关信息
  - 修改患者
  - 清空记录
- 导出仓库
- 首页点击快速问诊记录问诊类型且跳转页面

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
    // 设置快速问诊类型
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

3）首页点击快速问诊记录问诊类型且跳转页面 `views/Home/index.vue`

```ts
import { useConsultStore } from '@/stores'
import { ConsultType } from '@/enums'

const store = useConsultStore()
```

```html
<router-link to="/fast" @click="store.setType(ConsultType.Fast)" class="nav">
```


## 快速问诊-选择快速问诊类型{#fast-consult-type}


## 快速问诊-选择科室{#fast-consult-dep}


## 病情描述-基础布局{#illness-html}


## 病情描述-收集数据{#illness-data}


## 病情描述-图片上传{#illness-img}

