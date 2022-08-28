# 问诊订单

![image-20220824155307256](./images/image-20220824155307256.png)

## 问诊记录-页面搭建{#consult-order-page}

步骤：
- 新建问诊订单页面，实现tab切换
- 新建问诊订单列表组件，通过传入问诊类型展示不同列表

代码：

1）新建问诊订单页面，实现tab切换

`User/ConsultPage.vue`
```vue
<script setup lang="ts">
import ConsultList from './components/ConsultList.vue'
import { ConsultType } from '@/enums'
</script>

<template>
  <div class="consult-page">
    <cp-nav-bar title="问诊记录" />
    <van-tabs sticky>
      <van-tab title="找医生"><consult-list :type="ConsultType.Doctor" /></van-tab>
      <van-tab title="极速问诊"><consult-list :type="ConsultType.Fast" /></van-tab>
      <van-tab title="开药问诊"><consult-list :type="ConsultType.Medication" /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.consult-page {
  padding-top: 46px;
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
</style>
```

2）新建问诊订单列表组件，通过传入问诊类型展示不同列表

`User/components/ConsultList.vue`
```vue
<script setup lang="ts">
import ConsultItem from './ConsultItem.vue'
</script>

<template>
  <div class="consult-list">
    <consult-item v-for="i in 5" :key="i" />
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
```

`User/components/ConsultList.vue`

```vue
<script setup></script>

<template>
  <div class="consult-item" v-for="i in 5" :key="i">
    <div class="head van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p>极速问诊（自动分配医生）</p>
      <span>待支付</span>
    </div>
    <div class="body">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">腹痛腹泻 胃部有些痉挛</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ 39.00</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value tip">2019-07-08 09:55:54</div>
      </div>
    </div>
    <div class="foot">
      <van-button class="gray" plain size="small" round>取消问诊</van-button>
      <van-button type="primary" plain size="small" round >去支付</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-item {
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  margin-bottom: 10px;
  .head {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    .img {
      width: 20px;
      height: 20px;
    }
    > p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }
    > span {
      color: var(--cp-tag);
      &.orange {
        color: #f2994a;
      }
      &.green {
        color: var(--cp-primary);
      }
    }
  }
  .body {
    padding: 15px 15px 8px 15px;
    .body-row {
      display: flex;
      margin-bottom: 7px;
    }
    .body-label {
      width: 62px;
      font-size: 13px;
      color: var(--cp-tip);
    }
    .body-value {
      width: 250px;
      &.tip {
        color: var(--cp-tip);
      }
    }
  }
  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }
    .more {
      color: var(--cp-tag);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>
```

## 问诊记录-类型定义与API函数{#consult-order-type}

步骤：
- 定义接口参数类型
- 订单状态枚举
- 单个问诊订单类型
- 带分页问诊订单类型
- 定义查询API函数

代码：

1）定义接口参数类型 `types/consult.d.ts`
```ts 
export type ConsultOrderListParams = PageParams & {
  type: ConsultType
}
```

2）订单状态枚举 `enums/index.ts`
```ts
// 订单类型
// 1待支付2待接诊3咨询中4已完成5已取消   问诊订单
// 10待支付11待发货12待收货13已完成14已取消   药品订单
export enum OrderType {
  ConsultPay = 1,
  ConsultWait = 2,
  ConsultChat = 3,
  ConsultComplete = 4,
  ConsultCancel = 5,
  MedicinePay = 10,
  MedicineSend = 11,
  MedicineTake = 12,
  MedicineComplete = 13,
  MedicineCancel = 14
}
```

3）单个问诊订单类型 `types/consult.d.ts`

```ts
// 问诊订单单项信息
export type ConsultOrderItem = Consult & {
  createTime: string
  docInfo?: Doctor
  patientInfo: Patient
  orderNo: string
  statusValue: string
  typeValue: string
  status: OrderType
  countdown: number
  prescriptionId?: string
  evaluateId: number
  payment: number
  couponDeduction: number
  pointDeduction: number
  actualPayment: number
}
```

4）带分页问诊订单类型 `types/consult.d.ts`
```ts
export type ConsultOrderPage = {
  pageTotal: number
  total: number
  rows: ConsultOrderItem[]
}
```

5）定义查询API函数 `services/consult.ts`

```ts
import type { ConsultOrderListParams, ConsultOrderPage } from '@/types/consult'
```
```ts
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)
```


## 问诊记录-加载信息{#consult-order-render}



1）加载数据逻辑 `ConsultList.vue`

```vue
<script setup lang="ts">
import { ConsultType } from '@/enums'
import { getConsultOrderList } from '@/services/consult'
import type { ConsultOrderItem, ConsultOrderListParams } from '@/types/consult'
import { ref } from 'vue'
import ConsultItem from './ConsultItem.vue'

const props = defineProps<{ type: ConsultType }>()
const params = ref<ConsultOrderListParams>({
  type: props.type,
  current: 1,
  pageSize: 5
})
const loading = ref(false)
const finished = ref(false)
const list = ref<ConsultOrderItem[]>([])
const onLoad = async () => {
  const res = await getConsultOrderList(params.value)
  list.value.push(...res.data.rows)
  if (params.value.current < res.data.pageTotal) {
    params.value.current++
  } else {
    finished.value = true
  }
  loading.value = false
}
</script>

<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <consult-item v-for="item in list" :key="item.id" :item="item" />
    </van-list> 
  </div>
</template>     
```

2）渲染  `ConsultItem.vue`

```vue
<script setup lang="ts">
import type { ConsultOrderItem } from '@/types/consult'
import { OrderType } from '@/enums'

defineProps<{ item: ConsultOrderItem }>()
</script>

<template>
  <div class="consult-item">
    <div class="head van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p>{{ item.docInfo?.name || '暂未分配医生' }}</p>
      <span
        :class="{
          orange: item.status === OrderType.ConsultPay,
          green: item.status === OrderType.ConsultChat
        }"
        >{{ item.statusValue }}</span
      >
    </div>
    <div class="body" @click="$router.push(`/user/consult/${item.id}`)">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ item.actualPayment.toFixed(2) }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value tip">{{ item.createTime }}</div>
      </div>
    </div>
    <div class="foot">
      <van-button class="gray" plain size="small" round>取消订单</van-button>
      <van-button type="primary" plain size="small" round to="/">去支付</van-button>
    </div>
  </div>
</template>
```

## 问诊记录-列表操作按钮

状态梳理：
- 待支付：支付金额+取消问诊+去支付
- 待接诊：取消问诊+继续沟通
- 咨询中：查看处方（如果开了）+继续沟通
- 已完成：更多（查看处方<如果开了>，删除订单）+问诊记录+（未评价?写评价:查看评价）
- 已取消：删除订单+咨询其他医生

代码实现：

```ts
import { computed, ref } from 'vue'
import type { ConsultOrderItem } from '@/types/consult'

const { item } = defineProps<{ item: ConsultOrderItem }>()
const showPopover = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: !item.prescriptionId },
  { text: '删除订单' }
])
const onSelect = () => {
  //
}
```

```html
    <div class="foot" v-if="item.status === OrderType.ConsultPay">
      <van-button class="gray" plain size="small" round>取消问诊</van-button>
      <van-button type="primary" plain size="small" round :to="`/user/consult/${item.id}`">
        去支付
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultWait">
      <van-button class="gray" plain size="small" round>取消问诊</van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultChat">
      <van-button v-if="item.prescriptionId" class="gray" plain size="small" round>
        查看处方
      </van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultComplete">
      <div class="more">
        <van-popover
          placement="top-start"
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference> 更多 </template>
        </van-popover>
      </div>
      <van-button class="gray" plain size="small" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>
      <van-button v-if="!item.evaluateId" type="primary" plain size="small" round>
        去评价
      </van-button>
      <van-button v-else class="gray" plain size="small" round> 查看评价 </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultCancel">
      <van-button class="gray" plain size="small" round>删除订单</van-button>
      <van-button type="primary" plain size="small" round to="/">咨询其他医生</van-button>
    </div>
```


## 问诊记录-取消订单


## 问诊记录-删除订单


## 问诊记录-查看处方Hook


## 问诊记录-问诊详情

![image-20220824155407302](./images/image-20220824155407302.png)


代码：

1）页面结构

```vue
<script setup lang="ts"></script>

<template>
  <div class="consult-detail-page">
    <cp-nav-bar title="问诊详情" />
    <div class="detail-head">
      <div class="text">
        <h3>图文问诊 39 元</h3>
        <span class="sta green">待支付</span>
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img class="avatar" src="@/assets/avatar-doctor.svg" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>自动分配医生</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell title="患者信息" value="李富贵 | 男 | 30岁" />
        <van-cell title="患病时长" value="一周内" />
        <van-cell title="就诊情况" value="未就诊过" />
        <van-cell title="病情描述" label="头痛，头晕，恶心" />
      </van-cell-group>
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy">复制</span>
            202201127465
          </template>
        </van-cell>
        <van-cell title="创建时间" value="2022-01-23 09:23:46" />
        <van-cell title="应付款" value="￥39" />
        <van-cell title="优惠券" value="-￥0" />
        <van-cell title="积分抵扣" value="-￥0" />
        <van-cell title="实付款" value="￥39" class="price" />
      </van-cell-group>
    </div>
    <div class="detail-action van-hairline--top">
      <div class="price">
        <span>需付款</span>
        <span>￥39.00</span>
      </div>
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round>继续支付</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-detail-page {
  padding: 46px 0 110px 0;
}
.detail-head {
  height: 140px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 135px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  padding: 15px;
  .text {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 3px;
    .sta {
      color: var(--cp-tag);
      font-weight: 500;
      font-size: 16px;
      &.green {
        color: var(--cp-primary);
      }
      &.orange {
        color: #f2994a;
      }
    }
    .tip {
      width: 100%;
      color: var(--cp-text3);
      margin-top: 5px;
    }
  }
  .card {
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    .avatar {
      width: 38px;
      height: 38px;
    }
    .doc {
      flex: 1;
      padding-left: 15px;
      > span {
        display: block;
        font-size: 16px;
        &:last-child {
          font-size: 13px;
          color: var(--cp-text3);
        }
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
.detail-patient {
  &::after {
    content: '';
    display: block;
    height: 12px;
    background-color: var(--cp-bg);
  }
}
.detail-order {
  > h3 {
    padding: 10px 18px;
    font-weight: normal;
  }
  .copy {
    padding: 2px 10px;
    border: 1px solid var(--cp-primary);
    background-color: var(--cp-plain);
    color: var(--cp-primary);
    font-size: 12px;
    border-radius: 12px;
    margin-right: 10px;
  }
  :deep(.van-cell__title) {
    width: 70px;
    flex: none;
  }
  .price :deep(.van-cell__value) {
    font-size: 16px;
    color: var(--cp-price);
  }
}
.detail-action {
  height: 65px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: flex-end;
  padding: 0 15px;
  box-sizing: border-box;
  .price {
    flex: 1;
    > span:last-child {
      font-size: 18px;
      color: var(--cp-price);
      padding-left: 5px;
    }
  }
  .van-button {
    margin-left: 10px;
    padding-left: 17px;
    padding-right: 17px;
  }
  :deep(.van-button--default) {
    background-color: var(--cp-bg);
    color: var(--cp-text3);
  }
}
.van-cell {
  padding-left: 18px;
  padding-right: 18px;
}
</style>
```

2）路由配置

```ts
    {
      path: '/user/consult/:id',
      component: () => import('@/views/User/ConsultDetail.vue'),
      meta: { title: '问诊详情' }
    }
```

3）骨架效果
```html
  <div class="consult-detail-page" v-if="item">
  // ...
  </div>
  <div class="consult-detail-page" v-else>
    <cp-nav-bar title="问诊详情" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
```

4）基本渲染

```vue
<script setup lang="ts">
import { OrderType } from '@/enums'
import { getConsultOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { getConsultFlagText, getIllnessTimeText } from '@/utils/filter'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const item = ref<ConsultOrderItem>()
onMounted(async () => {
  const res = await getConsultOrderDetail(route.params.id as string)
  item.value = res.data
})
</script>

<template>
  <div class="consult-detail-page" v-if="item">
    <cp-nav-bar title="问诊详情" />
    <div class="detail-head">
      <div class="text">
        <h3>图文问诊 {{ item.payment }} 元</h3>
        <span
          class="sta"
          :class="{
            orange: item.status === OrderType.ConsultPay,
            green: item.status === OrderType.ConsultChat
          }"
          >{{ item.statusValue }}</span
        >
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img class="avatar" src="@/assets/avatar-doctor.svg" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>{{ item.docInfo.name }}</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell
          title="患者信息"
          :value="`${item.patientInfo.name} | ${item.patientInfo.genderValue} | ${item.patientInfo.age}岁`"
        />
        <van-cell title="患病时长" :value="getIllnessTimeText(item.illnessTime)" />
        <van-cell title="就诊情况" :value="getConsultFlagText(item.consultFlag)" />
        <van-cell title="病情描述" :label="item.illnessDesc" />
      </van-cell-group>
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy">复制</span>
            {{ item.orderNo }}
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="item.createTime" />
        <van-cell title="应付款" :value="`￥${item.payment}`" />
        <van-cell title="优惠券" :value="`-￥${item.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-￥${item.pointDeduction}`" />
        <van-cell title="实付款" :value="`￥${item.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <div class="detail-action van-hairline--top">
      <div class="price">
        <span>需付款</span>
        <span>￥{{ item.actualPayment }}</span>
      </div>
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round>继续支付</van-button>
    </div>
  </div>
  <div class="consult-detail-page" v-else>
    <cp-nav-bar title="问诊详情" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
</template>
```

## 问诊记录-详情按钮处理

状态梳理：
- 待支付：支付金额+取消问诊+去支付
- 待接诊：取消问诊+继续沟通
- 咨询中：查看处方（如果开了）+继续沟通
- 已完成：更多（查看处方<如果开了>，删除订单）+问诊记录+（未评价?写评价:查看评价）
- 已取消：删除订单+咨询其他医生

代码实现：

```ts
import { computed, onMounted, ref } from 'vue'
// ... 
const showPopover = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: !item.value?.prescriptionId },
  { text: '删除订单' }
])
const onSelect = () => {
  //
}
```
```html
    <div class="detail-time" v-if="item.status === OrderType.ConsultPay">
      请在 <van-count-down :time="item.countdown * 1000" /> 内完成支付，超时订单将取消
    </div>
    <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultPay">
      <div class="price">
        <span>需付款</span>
        <span>￥{{ item.actualPayment }}</span>
      </div>
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round>继续支付</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultWait">
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">继续沟通</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultChat">
      <van-button type="default" round v-if="item.prescriptionId">查看处方</van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">继续沟通</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultComplete">
      <div class="more">
        <van-popover
          placement="top-start"
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference> 更多 </template>
        </van-popover>
      </div>
      <van-button type="default" round>问诊记录</van-button>
      <van-button type="primary" round v-if="item.evaluateId">写评价</van-button>
      <van-button type="default" round v-else>查看评价</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultCancel">
      <van-button type="default" round>删除订单</van-button>
      <van-button type="primary" round to="/">咨询其他医生</van-button>
    </div>
```

```scss
.detail-time {
  position: fixed;
  left: 0;
  bottom: 65px;
  width: 100%;
  height: 44px;
  background-color: #fff7eb;
  text-align: center;
  line-height: 44px;
  font-size: 13px;
  color: #f2994a;
  .van-count-down {
    display: inline;
    color: #f2994a;
  }
}
```

## 问诊记录-取消订单Hook



## 问诊记录-删除订单Hook



## 问诊记录-支付抽屉组件封装