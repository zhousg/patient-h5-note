# 开药门诊模块

## 开药门诊-需求分析

> 理解开药门诊阶段流程分析

![开药门诊流程](./images/image-20231010175804736.png)

## 开药门诊-路由搭建

步骤

1. 基础结构代码
2. 路由配置
3. 首页跳转
4. cv静态结构

基础结构代码`views/Consult/ConsultMedicine.vue`

```jsx
<script setup lang="ts"></script>

<template>
  <div class="consult-medicine-page">
    <h1>consult-medicine</h1>
  </div>
</template>

<style scoped lang="scss"></style>

```

路由配置`router/index.ts`

```ts
{
    path: '/consult/medicine',
    component: () => import('@/views/Consult/ConsultMedicine.vue'),
    meta: { title: '开药门诊' }
}
```

首页跳转`Home/index.vue`

```jsx
<router-link
    to="/consult/medicine"
    class="nav"
    @click="store.setType(ConsultType.Medication)"
>
    <cp-icon name="home-prescribe"></cp-icon>
    <p class="title">开药门诊</p>
    <p class="desc">线上买药更方便</p>
</router-link>
```

cv静态结构`ConsultMedicine.vue`

```jsx
<script setup lang="ts"></script>

<template>
  <div class="consult-medicine-page">
    <cp-nav-bar
      title="开药门诊"
      right-text="问诊记录"
      @click-right="$router.push('/user/consult')"
    ></cp-nav-bar>
    <van-notice-bar text="请如实填写资料以便医生了解您的病情和用药需求" />
    <div class="illness-form">
      <div class="adm-list-header">症状描述</div>
      <van-field
        type="textarea"
        rows="3"
        placeholder="请输入所患疾病名称"
      ></van-field>
      <div class="adm-list-header">用药人身体情况</div>
      <div class="item">
        <p>肝功能</p>
      </div>
      <div class="item">
        <p>肾功能</p>
      </div>
      <div class="item">
        <p>过敏史</p>
      </div>
      <div class="item">
        <p>生育状态及计划</p>
      </div>
      <div class="adm-list-header">补充病例信息</div>
      <!-- 上传组件 -->
      <div class="illness-img"></div>
      <!-- 下一步 -->
      <!-- <van-button type="primary" block round> 下一步 </van-button> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.consult-medicine-page {
  padding-top: 46px;
  .van-button {
    font-size: 16px;
    margin-bottom: 30px;
    &.disabled {
      opacity: 1;
      background: #fafafa;
      color: #d9dbde;
      border: #fafafa;
    }
  }
  .illness-form {
    padding: 0 15px 15px 15px;
    .adm-list-header {
      padding-bottom: 5px;
      font-size: 16px;
      font-weight: 500;
      color: #121826;
      border-bottom: none;
      margin-top: 30px;
    }
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
}
</style>

```

## 开药门诊-表单单选框处理

步骤：

1. 定义枚举
2. 定义选项options
3. 开药门诊页面中使用`cp-radio-btn`
4. 扩展`Consult`类型添加字段，`store`中添加方法保存字段
5. 双向数据绑定

定义枚举`enums/index.ts`

```ts
// 肝功能
export enum LiverFunction {
  /** 正常 */
  Normal,
  /** 异常 */
  Abnormal,
  /** 不清楚 */
  Unclear
}
// 肾功能
export enum RenalFunction {
  /** 正常 */
  Normal,
  /** 异常 */
  Abnormal,
  /** 不清楚 */
  Unclear
}
// 过敏史
export enum AllergicHistory {
  /** 正常 */
  Normal,
  /** 异常 */
  Abnormal,
  /** 不清楚 */
  Unclear
}
// 生育状态及计划
export enum FertilityStatus {
  /** 无 */
  No,
  /** 备孕中 */
  TryingToConceive,
  /** 已怀孕 */
  AlreadyPregnant,
  /** 哺乳期 */
  Breastfeeding
}
```

定义`options`选项`services/constant`

```ts
// 肝功能
export const liverFunctionOptions = [
  { label: '正常', value: LiverFunction.Normal },
  { label: '异常', value: LiverFunction.Abnormal },
  { label: '不清楚', value: LiverFunction.Unclear }
]
// 肾功能
export const renalFunctionOptions = [
  { label: '正常', value: RenalFunction.Normal },
  { label: '异常', value: RenalFunction.Abnormal },
  { label: '不清楚', value: RenalFunction.Unclear }
]
// 过敏史
export const allergicHistoryOptions = [
  { label: '正常', value: AllergicHistory.Normal },
  { label: '异常', value: AllergicHistory.Abnormal },
  { label: '不清楚', value: AllergicHistory.Unclear }
]
// 生育状态及计划
export const fertilityStatusOptions = [
  { label: '无', value: FertilityStatus.No },
  { label: '备孕中', value: FertilityStatus.TryingToConceive },
  { label: '已怀孕', value: FertilityStatus.AlreadyPregnant },
  { label: '哺乳期中', value: FertilityStatus.Breastfeeding }
]

```

使用`cp-radio-btn`在开药门诊页面中`ConsultMedicine.vue`

```ts
import {
  liverFunctionOptions,
  allergicHistoryOptions,
  fertilityStatusOptions,
  renalFunctionOptions
} from '@/services/constants'
```

```jsx
      <div class="item">
        <p>肝功能</p>
        <cp-radio-btn :options="liverFunctionOptions"></cp-radio-btn>
      </div>
      <div class="item">
        <p>肾功能</p>
        <cp-radio-btn :options="renalFunctionOptions"></cp-radio-btn>
      </div>
      <div class="item">
        <p>过敏史</p>
        <cp-radio-btn :options="allergicHistoryOptions"></cp-radio-btn>
      </div>
      <div class="item">
        <p>生育状态及计划</p>
        <cp-radio-btn :options="fertilityStatusOptions"></cp-radio-btn>
      </div>
```

扩展`Consult`类型添加字段，`store`中添加方法保存字段

`consult.d.ts`

```ts
import type {
  ConsultType,
  IllnessTime,
  OrderType,
  LiverFunction,
  RenalFunction,
  AllergicHistory,
  FertilityStatus
} from '@/enums'

...

export type Consult = {
  ...
  /** 肝功能 */
  liverFunction: LiverFunction
  /** 肾功能 */
  renalFunction: RenalFunction
  /** 过敏史 */
  allergicHistory: AllergicHistory
  /** 生育状态及计划 */
  fertilityStatus: FertilityStatus
}

export type MedicineIllness = Pick<
  PartialConsult,
  | 'illnessDesc'
  | 'liverFunction'
  | 'renalFunction'
  | 'allergicHistory'
  | 'fertilityStatus'
  | 'pictures'
```

`src/stores/modules/consult.ts`

```ts
import type { ConsultIllness, PartialConsult, MedicineIllness } from '@/types/consult'

...
// 记录问药门诊病情
const setMedicineIlness = (illness: MedicineIllness) => {
    consult.value.illnessDesc = illness.illnessDesc
    consult.value.liverFunction = illness.liverFunction
    consult.value.renalFunction = illness.renalFunction
    consult.value.allergicHistory = illness.allergicHistory
    consult.value.fertilityStatus = illness.fertilityStatus
    consult.value.pictures = illness.pictures
}

return {
    ...,
    setMedicineIlness
}
```

双向数据绑定`ConsultMedicine.vue`

```ts
import type { MedicineIllness } from '@/types/consult'
import { ref } from 'vue'
const form = ref<MedicineIllness>({
  illnessDesc: '',
  liverFunction: undefined,
  renalFunction: undefined,
  allergicHistory: undefined,
  fertilityStatus: undefined,
  pictures: []
})
```

```jsx
<div class="illness-form">
      <div class="adm-list-header">症状描述</div>
      <van-field
        type="textarea"
        rows="3"
        placeholder="请输入所患疾病名称"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="adm-list-header">用药人身体情况</div>
      <div class="item">
        <p>肝功能</p>
        <cp-radio-btn
          :options="liverFunctionOptions"
          v-model="form.liverFunction"
        ></cp-radio-btn>
      </div>
      <div class="item">
        <p>肾功能</p>
        <cp-radio-btn
          :options="renalFunctionOptions"
          v-model="form.renalFunction"
        ></cp-radio-btn>
      </div>
      <div class="item">
        <p>过敏史</p>
        <cp-radio-btn
          :options="allergicHistoryOptions"
          v-model="form.allergicHistory"
        ></cp-radio-btn>
      </div>
      <div class="item">
        <p>生育状态及计划</p>
        <cp-radio-btn
          :options="fertilityStatusOptions"
          v-model="form.fertilityStatus"
        ></cp-radio-btn>
      </div>
      <div class="adm-list-header">补充病例信息</div>
      <!-- 上传组件 -->
      <div class="illness-img"></div>
      <!-- 下一步 -->
      <!-- <van-button type="primary" block round> 下一步 </van-button> -->
    </div>
```

## 开药门诊-封装上传组件

极速问诊中图文问诊用到了上传图片功能，在开药门诊中我们也有上传图片功能，所以需要封装上传组件

步骤：

1. 封装组件`CpUpload`
2. 为`CpUpload`组件提供类型
3. `ConsultIllness`使用上传组件
4. `ConsultMedicine`使用上传组件

封装组件`components/CpUpload.vue`

```jsx
<script setup lang="ts">
import { uploadImage } from '@/services/consult'
import type { UploaderFileListItem } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { ref } from 'vue'
import type { Image } from '@/types/consult'

const emit = defineEmits<{
  (e: 'uploadSuccess', img: Image): void
  (e: 'deleteSuccess', item: UploaderFileListItem): void
}>()

// 上传图片
const fileList = ref<Image[]>([])
// 图片上传
const onAfterRead: UploaderAfterRead = (item) => {
  if (Array.isArray(item)) return
  if (!item.file) return

  item.status = 'uploading'
  item.message = '上传中...'
  uploadImage(item.file)
    .then((res) => {
      item.status = 'done'
      item.message = undefined
      item.url = res.data.url
      emit('uploadSuccess', res.data)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '上传失败'
    })
}
const onDeleteImg = (item: UploaderFileListItem) => {
  emit('deleteSuccess', item)
}

const setFileList = (val: Image[]) => {
  fileList.value = val
}
defineExpose({
  setFileList
})
</script>

<template>
  <div class="illness-img">
    <van-uploader
      upload-icon="photo-o"
      upload-text="上传图片"
      max-count="9"
      :max-size="5 * 1024 * 1024"
      v-model="fileList"
      :after-read="onAfterRead"
      @delete="onDeleteImg"
    ></van-uploader>
    <p class="tip" v-if="!fileList.length">
      上传内容仅医生可见,最多9张图,最大5MB
    </p>
  </div>
</template>

<style scoped lang="scss">
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}
</style>
```

为`CpUpload`组件提供类型`src/types/components.d.ts`

```ts
...
import CpUpload from '@/components/CpUpload.vue'

declare module 'vue' {
  interface GlobalComponents {
    // 添加组件类型
    ...
    CpUpload: typeof CpUpload
  }
}

```

`ConsultIllness.vue`使用上传组件

```ts
// 数据的回显
onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复之前填写的病情信息？',
      closeOnPopstate: false
    }).then(() => {
      // 回显数据
      const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
      form.value = { illnessDesc, illnessTime, consultFlag, pictures }
      cpUploadRef.value.setFileList(pictures || [])
    })
  }
})
const cpUploadRef = ref()
const onUploadSuccess = (image: Image) => {
  form.value.pictures?.push(image)
}
const onDeleteSuccess = (item: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter(
    (pic) => pic.url !== item.url
  )
}

```

```jsx
<cp-upload
  ref="cpUploadRef"
  @upload-success="onUploadSuccess"
  @delete-success="onDeleteSuccess"
></cp-upload>
```

`ConsultMedicine.vue`使用上传组件

```ts
const onUploadSuccess = (image: Image) => {
  form.value.pictures?.push(image)
}
const onDeleteSuccess = (item: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter(
    (pic) => pic.url !== item.url
  )
}
```

```jsx
<cp-upload
  ref="cpUploadRef"
  @upload-success="onUploadSuccess"
  @delete-success="onDeleteSuccess"
></cp-upload>
```

## 开药门诊-下一步功能

`ConsultMedicine`

步骤：

1. 控制按钮样式
2. 校验逻辑
3. 下一步跳转逻辑

控制按钮样式

```ts
const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.liverFunction === undefined ||
    form.value.renalFunction === undefined ||
    form.value.allergicHistory === undefined ||
    form.value.fertilityStatus === undefined
)
```

```jsx
<van-button
  :class="{ disabled }"
  type="primary"
  block
  round
  @click="next"
>
  下一步
</van-button>
```

校验逻辑

```ts
const next = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.liverFunction === undefined)
    return showToast('请选择肝功能情况')
  if (form.value.renalFunction === undefined)
    return showToast('请选择肾功能情况')
  if (form.value.allergicHistory === undefined)
    return showToast('请选择过敏史情况')
  if (form.value.fertilityStatus === undefined)
    return showToast('请选择生育状态及计划')
  
}
```

下一步跳转逻辑

```ts
const store = useConsultStore()
const router = useRouter()
const next = () => {
  ....
  //  记录病情
  store.setMedicineIlness(form.value)
  // 跳转，携带标识
  router.push('/user/patient?isChange=1&from=medicineConsult')
}
```

## 开药门诊-选择患者下一步功能

步骤：

1. 开药门诊选择患者下一步跳转选择药品，根据标识跳转
2. 新建页面结构
3. 路由规则配置

开药门诊选择患者下一步跳转选择药品，根据标识跳转`views/User/PatientPage.vue`

```ts
const fromMedicineConsultFlag = computed(
  () => route.query.from === 'medicineConsult'
)
const next = () => {
  if (!patientId.value) return showToast('请选择患者')
  store.setPatient(patientId.value)
  if (fromMedicineConsultFlag.value) {
    router.push('/consult/choose')
  } else {
    router.push('/consult/pay')
  }
}
```

新建页面结构`ConsultChoose.vue`

```jsx
<script setup lang="ts"></script>

<template>
  <div class="consult-choose-page">
    <h1>consult-choose</h1>
  </div>
</template>

<style scoped lang="scss"></style>

```

路由规则配置`router/index.ts`

```ts
{
  path: '/consult/choose',
  component: () => import('@/views/Consult/ConsultChoose.vue'),
  meta: { title: '选择药品' }
}
```

## 选择药品-页面结构

步骤：

1. 静态结构
2. 步进器组件学习及样式处理

静态结构`ConsultChoose.vue`

```jsx
<script setup lang="ts">
import { showToast } from 'vant'
import { ref } from 'vue'

const searchValue = ref('')
const onSearch = (val: string) => showToast(val)
const onCancel = () => showToast('取消')

const step = ref(1)
</script>

<template>
  <div class="consult-choose-page">
    <cp-nav-bar title="选择药品"></cp-nav-bar>
    <van-search
      v-model="searchValue"
      show-action
      placeholder="搜一搜: 药品名称"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 药品列表 -->
    <div class="medicine-list">
      <div class="item van-hairline--top" v-for="i in 20" :key="i">
        <img class="img" src="@/assets/ad.png" alt="" />
        <div class="info">
          <p class="name">
            <span>优赛明 维生素E乳 {{ i }}</span>
            <span>
              <van-stepper v-model="step" />
            </span>
          </p>
          <p class="size">
            <van-tag>处方药</van-tag>
            <span>80ml</span>
          </p>
          <p class="price">￥25.00</p>
        </div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="cart-o" badge="0" />
      <div class="total-price">￥ 1000</div>
      <van-action-bar-button type="primary" text="申请开方" />
    </van-action-bar>
  </div>
</template>

<style scoped lang="scss">
.consult-choose-page {
  padding-top: 46px;
  .van-search {
    position: sticky;
    top: 46px;
    z-index: 10;
    background-color: #fff;
  }
  .van-action-bar {
    border-top: 1px solid rgba(237, 237, 237, 0.9);
    .total-price {
      width: 200px;
      font-size: 24px;
      line-height: 18px;
      font-weight: 700;
      color: #121826;
    }
  }
  .medicine-list {
    background-color: #fff;
    padding: 0 15px 45px;
    .item {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
      .img {
        width: 80px;
        height: 70px;
        border-radius: 2px;
        overflow: hidden;
      }
      .info {
        padding-left: 15px;
        width: 250px;
        .name {
          display: flex;
          font-size: 15px;
          margin-bottom: 5px;
          > span:first-child {
            // width: 200px;
            // width: 300px;
            width: 40vw;
          }
          > span:last-child {
            // width: 50px;
            text-align: right;
          }
        }
        .size {
          margin-bottom: 5px;
          .van-tag {
            background-color: var(--cp-primary);
            vertical-align: middle;
          }
          span:not(.van-tag) {
            margin-left: 10px;
            color: var(--cp-tag);
            vertical-align: middle;
          }
        }
        .price {
          font-size: 16px;
          color: #eb5757;
        }
      }
      .desc {
        width: 100%;
        background-color: var(--cp-bg);
        border-radius: 4px;
        margin-top: 10px;
        padding: 4px 10px;
        color: var(--cp-tip);
      }
    }
  }
}
</style>

```

步进器组件学习及样式处理

```ts
const step = ref(0)
```

```scss
.van-stepper {
    position: absolute;
    right: 0;
    bottom: 15px;
    :deep() {
      .van-stepper__input {
        background: none;
      }
      .van-stepper__minus {
        background-color: #fff;
        border: 0.5px solid #16c2a3;
      }
      .van-stepper__plus {
        background-color: #eaf8f6;
      }
      .van-stepper__minus,
      .van-stepper__plus {
        width: 20px;
        height: 20px;
      }
    }
    &.hide {
      :deep() {
        .van-stepper__minus,
        .van-stepper__input {
          visibility: hidden;
        }
      }
    }
  }
```

## 选择药品-抽离列表卡片组件

步骤：

1. 抽离卡片组件
2. 抽离列表组件
3. 使用列表组件

抽离卡片组件`views/Consult/components/MedicineCard.vue`

```jsx
<script setup lang="ts">
import { ref } from 'vue'

const step = ref(0)
</script>

<template>
  <div class="item van-hairline--top">
    <img class="img" src="@/assets/ad.png" alt="" />
    <div class="info">
      <p class="name">
        <span>优赛明 维生素E乳</span>
        <span>
          <van-stepper v-model="step" min="0" :class="{ hide: step === 0 }" />
        </span>
      </p>
      <p class="size">
        <van-tag>处方药</van-tag>
        <span>80ml</span>
      </p>
      <p class="price">￥25.00</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  padding: 15px 0;
  .img {
    width: 80px;
    height: 70px;
    border-radius: 2px;
    overflow: hidden;
  }
  .info {
    padding-left: 15px;
    width: 250px;
    .name {
      display: flex;
      font-size: 15px;
      margin-bottom: 5px;
      > span:first-child {
        // width: 200px;
        // width: 300px;
        width: 40vw;
      }
      > span:last-child {
        // width: 50px;
        text-align: right;
      }
    }
    .size {
      margin-bottom: 5px;
      .van-tag {
        background-color: var(--cp-primary);
        vertical-align: middle;
      }
      span:not(.van-tag) {
        margin-left: 10px;
        color: var(--cp-tag);
        vertical-align: middle;
      }
    }
    .price {
      font-size: 16px;
      color: #eb5757;
    }
  }
  .desc {
    width: 100%;
    background-color: var(--cp-bg);
    border-radius: 4px;
    margin-top: 10px;
    padding: 4px 10px;
    color: var(--cp-tip);
  }
}

.van-stepper {
  position: absolute;
  right: 0;
  bottom: 15px;
  :deep() {
    .van-stepper__input {
      background: none;
    }
    .van-stepper__minus {
      background-color: #fff;
      border: 0.5px solid #16c2a3;
    }
    .van-stepper__plus {
      background-color: #eaf8f6;
    }
    .van-stepper__minus,
    .van-stepper__plus {
      width: 20px;
      height: 20px;
    }
  }
  &.hide {
    :deep() {
      .van-stepper__minus,
      .van-stepper__input {
        visibility: hidden;
      }
    }
  }
}
</style>

```

抽离列表组件`src/views/Consult/components/MedicineList.vue`

```jsx
<script setup lang="ts">
import MedicineCard from './MedicineCard.vue'
</script>

<template>
  <div class="medicine-list">
    <medicine-card v-for="i in 100" :key="i"></medicine-card>
  </div>
</template>

<style scoped lang="scss">
.medicine-list {
  background-color: #fff;
  padding: 0 15px 45px;
}
</style>

```

使用列表组件`ConsultChoose.vue`

```jsx
...
<!-- 药品列表 -->
<medicine-list></medicine-list>
...
```

## 选择药品-list组件渲染药品列表
