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
</script>

<template>
  <div class="consult-page">
    <cp-nav-bar title="问诊记录" />
    <van-tabs sticky>
      <van-tab title="极速问诊"><consult-list /></van-tab>
      <van-tab title="找医生"><consult-list /></van-tab>
      <van-tab title="开药问诊"><consult-list /></van-tab>
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
```ts
    {
      path: '/user/consult',
      component: () => import('@/views/User/ConsultPage.vue'),
      meta: { title: '问诊记录' }
    }
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

`User/components/ConsultItem.vue`

```vue
<script setup lang="ts"></script>

<template>
  <div class="consult-item">
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
3） 传入类型

```html
      <van-tab title="极速问诊"><consult-list :type="ConsultType.Fast" /></van-tab>
      <van-tab title="找医生"><consult-list :type="ConsultType.Doctor" /></van-tab>
      <van-tab title="开药问诊"><consult-list :type="ConsultType.Medication" /></van-tab>
```

## 问诊记录-类型定义与API函数{#consult-order-type}

步骤：
- 定义接口参数类型
- 带分页问诊订单类型
- 定义查询API函数

代码：

1）定义接口参数类型 `types/consult.d.ts`
```ts 
export type ConsultOrderListParams = PageParams & {
  /** 问诊记录类型 */
  type: ConsultType
}
```

2）带分页问诊订单类型 `types/consult.d.ts`
```ts
export type ConsultOrderPage = {
  pageTotal: number
  total: number
  rows: ConsultOrderItem[]
}
```

3）定义查询API函数 `services/consult.ts`

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
      <consult-item v-for="item in list" :key="item.id" :item="item"></consult-item>
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
        <div class="body-value">¥ {{ item.payment.toFixed(2) }}</div>
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
- 待支付：取消问诊+去支付
- 待接诊：取消问诊+继续沟通
- 咨询中：查看处方（如果开了）+继续沟通
- 已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价）
- 已取消：删除订单+咨询其他医生

代码实现：

```ts
import { computed, ref } from 'vue'
import type { ConsultOrderItem } from '@/types/consult'

const props = defineProps<{ item: ConsultOrderItem }>()
const showPopover = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: !props.item.prescriptionId },
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
> 实现取消问诊订单功能

步骤：
- API接口
- 取消订单逻辑函数
- 使用逻辑

代码：

1）API接口 `services/consult.ts`
```ts
// 取消订单
export const cancelOrder = (id: string) => request(`/patient/order/cancel/${id}`, 'PUT')
```

2）取消订单逻辑函数 `ConsultItem.vue`
```ts
import { cancelOrder } from '@/services/consult'
import { showSuccessToast, showFailToast } from 'vant'
```
```ts
// 取消订单
const loading = ref(false)
const cancelConsultOrder = async (item: ConsultOrderItem) => {
  try {
    loading.value = true
    await cancelOrder(item.id)
    item.status = OrderType.ConsultCancel
    item.statusValue = '已取消'
    showSuccessToast('取消成功')
  } catch (error) {
    showFailToast('取消失败')
  } finally {
    loading.value = false
  }
}
```


3）使用逻辑

```diff
    <div class="foot" v-if="item.status === OrderType.ConsultPay">
      <van-button
        class="gray"
        plain
        size="small"
+        :loading="loading"
        round
+        @click="cancelConsultOrder(item)"
      >
        取消问诊
      </van-button>
      <van-button type="primary" plain size="small" round :to="`/user/consult/${item.id}`">
        去支付
      </van-button>
    </div>
```

```diff
    <div class="foot" v-if="item.status === OrderType.ConsultWait">
      <van-button
        class="gray"
        plain
        size="small"
+        :loading="loading"
        round
+        @click="cancelConsultOrder(item)"
      >
        取消问诊
      </van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
```


## 问诊记录-删除订单

> 删除订单功能实现

步骤：
- API接口
- 删除订单逻辑函数
- 使用逻辑

代码：

1）API接口 `services/consult.ts`
```ts
// 删除订单
export const deleteOrder = (id: string) => request(`/patient/order/${id}`, 'DELETE')
```

2）删除订单逻辑函数 `ConsultItem.vue`
```ts
import { deleteOrder } from '@/services/consult'
```
```ts
const emit = defineEmits<{
  (e: 'on-delete', id: string): void
}>()
// 删除订单
const deleteLoading = ref(false)
const deleteConsultOrder = async (item: ConsultOrderItem) => {
  try {
    deleteLoading.value = true
    await deleteOrder(item.id)
    showSuccessToast('删除成功')
    emit('on-delete', item.id)
  } catch (error) {
    showFailToast('删除失败')
  } finally {
    deleteLoading.value = false
  }
}
```

3）使用逻辑

更多操作的删除
```ts
const onSelect = (action: { text: string }, i: number) => {
  if (i === 1) {
    // 删除
    deleteConsultOrder(props.item)
  }
}
```
按钮的删除
```diff
    <div class="foot" v-if="item.status === OrderType.ConsultCancel">
      <van-button
        class="gray"
        plain
        size="small"
        round
+        :loading="deleteLoading"
+        @click="deleteConsultOrder(item)"
      >
        删除订单
      </van-button>
      <van-button type="primary" plain size="small" round to="/">咨询其他医生</van-button>
    </div>
```

4）父组件进行删除数据 `ConsultList.vue`
```html
<consult-item v-for="item in list" :key="item.id" :item="item" @on-delete="onDelete" />
```
```ts
const onDelete = (id: string) => {
  list.value = list.value.filter((item) => item.id !== id)
  if (!list.value.length) onLoad()
}
```

## 问诊记录-查看处方composable

> 实现，查看处方逻辑复用，提取一个hook函数

步骤：
- 提取一个hook提供，查看处方函数
- 问诊室使用，订单列表中使用

代码：

1）提取hook函数  `composables/index.ts`
```ts
import { getPrescriptionPic } from '@/services/consult'
import { onShowPrescription } from 'vant'
```
```ts
// 封装查看处方逻辑
export const useShowPrescription = () => {
  const onShowPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      showImagePreview([res.data.url])
    }
  }
  return { onShowPrescription }
}
```

2）使用hook函数

问诊室使用 `Room/components/RoomMessage.vue`
```ts
import { useShowPrescription } from '@/composable'

const { onShowPrescription } = useShowPrescription()
```
```diff
          <div class="head-tit">
            <h3>电子处方</h3>
+            <p @click="onShowPrescription(msg.prescription?.id)">
              原始处方 <van-icon name="arrow"></van-icon>
            </p>
          </div>
```
订单列表使用 `User/components/ConsultItem.vue`
```ts
import { useShowPrescription } from '@/composable'
```
```ts
const onSelect = (action: { text: string }, i: number) => {
  if (i === 0) {
    onShowPrescription(props.item.prescriptionId)
  }
  if (i === 1) {
    // 删除
    deleteConsultOrder(props.item)
  }
}
const { onShowPrescription } = useShowPrescription()
```

小结：
- 现在是只有一个函数复用，其实也可以复用状态数据之类的，或者多个函数。


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
    <!-- <div class="detail-time">
      请在 <van-count-down :time="10000 * 1000" /> 内完成支付，超时订单将取消
    </div> -->
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
          <span>{{ item.docInfo?.name }}</span>
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
    <!-- <div class="detail-time">
      请在 <van-count-down :time="10000 * 1000" /> 内完成支付，超时订单将取消
    </div> -->
    <div class="detail-action van-hairline--top">
      <div class="price">
        <span>需付款</span>
        <span>￥39.00</span>
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

## 问诊记录-consult-more组件

通用问诊记录查看更多组件

组件封装：`User/components/ConsultMore.vue`

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  disabled?: boolean
}>()

const showPopover = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: props.disabled },
  { text: '删除订单' }
])

const emit = defineEmits<{
  (e: 'on-delete'): void
  (e: 'on-preview'): void
}>()

const onSelect = (action: { text: string }, i: number) => {
  if (i === 0) emit('on-preview')
  if (i === 1) emit('on-delete')
}
</script>

<template>
  <div class="consult-more">
    <van-popover
      placement="top-start"
      v-model:show="showPopover"
      :actions="actions"
      @select="onSelect"
    >
      <template #reference> 更多 </template>
    </van-popover>
  </div>
</template>

<style lang="scss" scoped>
.consult-more {
  flex: 1;
  color: var(--cp-tag);
  font-size: 13px;
}
</style>
``

使用组件：`User/components/ConsultItem.vue`

```html
      <cp-consult-more
        :disabled="!item.prescriptionId"
        @on-delete="deleteConsultOrder(item)"
        @on-preview="onShowPrescription(item.prescriptionId)"
      ></cp-consult-more>
```


## 问诊记录-详情按钮处理

状态梳理：
- 待支付：支付金额+取消问诊+去支付
- 待接诊：取消问诊+继续沟通
- 咨询中：查看处方（如果开了）+继续沟通
- 已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价）
- 已取消：删除订单+咨询其他医生

代码实现：

提示：

```html
    <div class="detail-time" v-if="item.status === OrderType.ConsultPay">
      请在 <van-count-down :time="item.countdown * 1000" /> 内完成支付，超时订单将取消
    </div>
```

按钮：

```html
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultPay"
    >
      <div class="price">
        <span>需付款</span>
        <span>￥{{ item.actualPayment }}</span>
      </div>
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round>继续支付</van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultWait"
    >
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultChat"
    >
      <van-button type="default" round v-if="item.prescriptionId">
        查看处方
      </van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultComplete"
    >
      <consult-more></consult-more>
      <van-button type="default" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>
      <van-button type="default" round v-if="item.evaluateId">
        查看评价
      </van-button>
      <van-button type="primary" round v-else> 写评价 </van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="item.status === OrderType.ConsultCancel"
    >
      <van-button type="default" round>删除订单</van-button>
      <van-button type="primary" round to="/">咨询其他医生</van-button>
    </div>
```

## 问诊记录-取消订单composable

> 实现，取消订单逻辑复用，提取hook函数


`composables/index.ts`

```ts
// 封装取消订单逻辑
export const useCancelOrder = () => {
  const loading = ref(false)
  const cancelConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await cancelOrder(item.id)
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      showSuccessToast('取消成功')
    } catch (error) {
      showFailToast('取消失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, cancelConsultOrder }
}
```

`ConsultItem.vue`
```ts
import { useCancelOrder } from '@/composable'
const { loading, cancelConsultOrder } = useCancelOrder()
```

`ConsultDetail.vue`
```ts
import { useCancelOrder } from '@/composable'
const { loading, cancelConsultOrder } = useCancelOrder()
```

```diff
<div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultPay">
      <div class="price">
        <span>需付款</span>
        <span>￥{{ item.actualPayment }}</span>
      </div>
+      <van-button type="default" round :loading="loading" @click="cancelConsultOrder(item!)">
        取消问诊
      </van-button>
      <van-button type="primary" round>继续支付</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultWait">
+      <van-button type="default" round :loading="loading" @click="cancelConsultOrder(item!)">
        取消问诊
      </van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">继续沟通</van-button>
    </div>
```


## 问诊记录-删除订单composable

> 实现，取消删除逻辑复用，提取hook函数

```ts
export const useDeleteOrder = (cb: () => void) => {
  // 删除订单
  const loading = ref(false)
  const deleteConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await deleteOrder(item.id)
      showSuccessToast('删除成功')
      // 成功，做其他业务
      cb && cb()
    } catch (e) {
      showFailToast('删除失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, deleteConsultOrder }
}
```

`ConsultItem.vue`

```ts
import { useCancelOrder, useDeleteOrder, useShowPrescription } from '@/composable'

const { loading: deleteLoading, deleteConsultOrder } = useDeleteOrder(()=>{
  emit('on-delete', props.item.id)
})
```

`ConsultDetail.vue`
```ts
import { useCancelOrder, useDeleteOrder, useShowPrescription } from '@/composable'

const { showPrescription } = useShowPrescription()
const { loading: deleteLoading, deleteConsultOrder } = useDeleteOrder(() => {
  router.push('/user/consult')
})
```

更多：查看处方和删除订单

```html
      <cp-consult-more
        :disabled="!item.prescriptionId"
        @on-delete="deleteConsultOrder(item)"
        @on-preview="onShowPrescription(item.prescriptionId)"
      ></cp-consult-more>
```

删除订单 `(item!)` 是ts语法非空断言

```html
      <van-button type="default" round :loading="deleteLoading" @click="deleteConsultOrder(item!)">
        删除订单
      </van-button>
```

查看处方
```diff
      <van-button
        type="default"
        round
        v-if="item.prescriptionId"
+        @click="onShowPrescription(item?.prescriptionId)"
      >
        查看处方
      </van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">继续沟通</van-button>
    </div>
```

小结：
- 删除订单和查看处方一起实现


## 问诊记录-复制订单号

步骤：
- 知道 useClipboard 基本用法
- 使用 useClipboard 复制订单号

代码：
- [参考代码](https://github.com/vueuse/vueuse/blob/main/packages/core/useClipboard/demo.vue)
```
1. copy(需要拷贝的内容)
2. copied 是否拷贝成功，默认1.5s恢复状态 
3. isSupported 浏览器是否支持，需要授权读取粘贴板和写入粘贴板权限
```

- 实现逻辑

```ts
import { useClipboard } from '@vueuse/core'
import { showToast } from 'vant'
```

```ts
// 复制
const { copy, isSupported } = useClipboard()
const onCopy = async () => {
  if (!isSupported.value) return showToast('未授权，不支持')
  await copy(item.value?.orderNo || '')
  showToast('已复制')
}
```

```html
        <van-cell title="订单编号">
          <template #value>
            <span class="copy" @click="onCopy()">复制</span>
            {{ item.orderNo }}
          </template>
        </van-cell>
```


## 问诊记录-支付抽屉组件封装


思路：
- 组件需要实现哪些功能？
  - 展示微信支付和支付宝支付，可以选择
  - 展示支付金额，传入订单ID用于生成订单支付链接
  - 打开关闭抽屉
  - 关闭后的业务可自定义
- 需要暴露哪些 props 参数？
  - orderId  actualPayment  onClose show
- 需要提供哪些 emits 事件？
  - update:show


代码：

1）封装组件 `components/CpPaySheet.vue`
```vue
<script setup lang="ts">
import { showToast, showLoadingToast } from 'vant'
import { ref } from 'vue'
import { getConsultOrderPayUrl } from '@/services/consult'

const props = defineProps<{
  orderId: string
  actualPayment: number
  onClose?: () => void
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()

const paymentMethod = ref<0 | 1>()

// 跳转支付
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({message: '跳转支付', duration: 0})
  const res = await getConsultOrderPayUrl({
    orderId: props.orderId,
    paymentMethod: paymentMethod.value,
    payCallback: 'http://localhost:5173/room'
  })
  window.location.href = res.data.payUrl
}
</script>

<template>
  <!-- 支付方式弹窗 -->
  <van-action-sheet
    :show="show"
    @update:show="emit('update:show', $event)"
    title="选择支付方式"
    :close-on-popstate="false"
    :before-close="onClose"
    :closeable="false"
  >
    <div class="pay-type">
      <p class="amount">￥{{ actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon><cp-icon name="consult-wechat" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
        </van-cell>
        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon><cp-icon name="consult-alipay" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button @click="pay" type="primary" round block>立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
```

```diff
import CpNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
+import CpPaySheet from '@/components/CpPaySheet.vue'
import { RouterLink, RouterView } from 'vue-router'

declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
    CpRadioBtn: typeof CpRadioBtn
+    CpPaySheet: typeof CpPaySheet
  }
}
```

2）使用组件

`ConsultPay.vue`

```html
      <cp-pay-sheet
        v-model:show="show"
        :order-id="orderId"
        :actualPayment="payInfo.actualPayment"
        :onClose="onClose"
      />
```

`ConsultDetail.vue`
```ts
const show = ref(false)
```
```html
      <van-button type="primary" round @click="show = true">继续支付</van-button>
```
```diff
    <div class="detail-action van-hairline--top" v-if="item.status === OrderType.ConsultCancel">
      <van-button type="default" round :loading="deleteLoading" @click="deleteConsultOrder(item!)">
        删除订单
      </van-button>
      <van-button type="primary" round to="/">咨询其他医生</van-button>
    </div>
+   <cp-pay-sheet v-model:show="show" :order-id="item.id" :actualPayment="item.actualPayment" />
  </div>
```