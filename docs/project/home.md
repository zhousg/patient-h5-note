# 首页模块

![image-20220811163550162](./images/image-20220811163550162.png)



## 首页模块-基础结构{#homw-html}
> 实现：首页基础结构搭建

步骤：
- 页面基本结构
- 知识列表tab

代码：

`Home/index.vue`
- 页面基本结构

```vue
<script setup lang="ts"></script>

<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-header">
      <div class="con">
        <h1>优医</h1>
        <div class="search">
          <cp-icon name="home-search" /> 搜一搜：疾病/症状/医生/健康知识
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="home-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icon name="home-doctor"></cp-icon>
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/consult/fast" class="nav">
            <cp-icon name="home-graphic"></cp-icon>
            <p class="title">极速问诊</p>
            <p class="desc">20s医生极速回复</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icon name="home-prescribe"></cp-icon>
            <p class="title">开药门诊</p>
            <p class="desc">线上买药更方便</p>
          </router-link>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-order"></cp-icon>
            <p class="title">药品订单</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-docs"></cp-icon>
            <p class="title">健康档案</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-rp"></cp-icon>
            <p class="title">我的处方</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-find"></cp-icon>
            <p class="title">疾病查询</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="home-banner">
      <van-swipe indicator-color="#fff">
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;
}
.home-header {
  height: 100px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  .con {
    position: relative;
    padding: 0 15px;
    > h1 {
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding: 20px 0;
      line-height: 1;
      padding-left: 5px;
    }
    .search {
      height: 40px;
      border-radius: 20px;
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: var(--cp-dark);
      font-size: 13px;
      .cp-icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }
}
.home-navs {
  padding: 10px 15px 0 15px;
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .cp-icon {
      font-size: 48px;
    }
    .title {
      font-weight: 500;
      margin-top: 5px;
      color: var(--cp-text1);
    }
    .desc {
      font-size: 11px;
      color: var(--cp-tag);
      margin-top: 2px;
    }
    &.min {
      .cp-icon {
        font-size: 31px;
      }
      .title {
        font-size: 13px;
        color: var(--cp-text2);
        font-weight: normal;
      }
    }
  }
}
.home-banner {
  padding: 10px 15px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
```

- 知识列表tab

`Home/index.vue`
```html
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注">1</van-tab>
      <van-tab title="推荐" >
        <p v-for="i in 100" :key="i">内容</p>
      </van-tab>
      <van-tab title="减脂">3</van-tab>
      <van-tab title="饮食">4</van-tab>
    </van-tabs>
```

`styles/main.scss` 全局tab的样式都一样
```scss
// 全局覆盖van-tab样式
.van-tabs {
  .van-tabs__nav {
    padding: 0 0 15px 0;
  }
  .van-tabs__line {
    width: 20px;
    background-color: var(--cp-primary);
  }
  .van-tab {
    padding: 0 15px;
  }
}
```
`Home/index.vue` 激活推荐 tab 
```ts
// active 的值是 tab 的索引
const active = ref(1)
```


提问：
- 首页的金刚区如何实现？
  - van-col  van-row
- 首页的轮播图如何实现？
  - van-swipe 
- 知识列表切换？
  - van-tabs


## 首页模块-列表加载更多{#home-knowledge-html}
> 实现：准备知识列表组件，模拟加载更多效果

步骤：
- 提取 knowledge-list knowledge-card 组件展示知识文章列表
- vant-list 组件基本使用，模拟加载更多效果

代码：

1）提取 knowledge-list knowledge-card 组件展示知识文章列表

`Home/components/KnowledgeList.vue`
```vue
<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
</script>

<template>
  <div class="knowledge-list">
    <knowledge-card v-for="i in 5" :key="i"></knowledge-card>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
```

`Home/components/KnowledgeCard.vue`
```vue
<script setup lang="ts"></script>

<template>
    <div class="knowledge-card van-hairline--bottom">
      <div class="head">
        <van-image
          round
          class="avatar"
          src="https://yanxuan-item.nosdn.127.net/9ad83e8d9670b10a19b30596327cfd14.png"
        ></van-image>
        <div class="info">
          <p class="name">张医生</p>
          <p class="dep van-ellipsis">积水潭医院 骨科 主任医师</p>
        </div>
        <van-button class="btn" size="small" round>+ 关注</van-button>
      </div>
      <div class="body">
        <h3 class="title van-ellipsis">高血压是目前世界上最常见，发病率最高的慢性病之一</h3>
        <p class="tag">
          <span># 肥胖</span>
          <span># 养生</span>
        </p>
        <p class="intro van-multi-ellipsis--l2">
          据估计，全世界有 10
          亿人患有高血压，来自美国全国健康和营养调查的数据（NHANES）显示，高血压的患病率呈逐年上升趋势。
          但是，我国高血压的控制程度非常不乐观，不少朋友担心降压药对肾的影响，有些甚至因为担心伤肾，而不敢吃降压药。
          我们就介绍一下，高血压对肾脏的危害，还有降压药对肾脏影响。
          没有耐心看的朋友，可以直接记住这个结论：高血压比降压药伤肾。千万不要因为担心副作用不敢吃药，那是「丢西瓜捡芝麻」得不偿失的行为
        </p>
        <div class="imgs">
          <van-image
            src="https://yanxuan-item.nosdn.127.net/c1cdf62c5908659a9e4c8c2f9df218fd.png"
          />
          <van-image
            src="https://yanxuan-item.nosdn.127.net/c1cdf62c5908659a9e4c8c2f9df218fd.png"
          />
          <van-image
            src="https://yanxuan-item.nosdn.127.net/c1cdf62c5908659a9e4c8c2f9df218fd.png"
          />
        </div>
        <p class="logs">
          <span>10 收藏</span>
          <span>50 评论</span>
        </p>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.knowledge-card {
  padding: 20px 0 16px;
  .head {
    display: flex;
    align-items: center;
    .avatar {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }
    .info {
      width: 200px;
      padding-right: 10px;
      .name {
        color: var(--cp-text2);
      }
      .dep {
        color: var(--cp-tip);
        font-size: 12px;
      }
    }
    .btn {
      padding: 0 12px;
      border-color: var(--cp-primary);
      color: var(--cp-primary);
      height: 28px;
      width: 72px;
    }
  }
  .body {
    .title {
      font-size: 16px;
      margin-top: 8px;
      font-weight: normal;
    }
    .tag {
      margin-top: 6px;
      > span {
        color: var(--cp-primary);
        margin-right: 20px;
        font-size: 12px;
      }
    }
    .intro {
      margin-top: 7px;
      line-height: 2;
      color: var(--cp-text3);
    }
    .imgs {
      margin-top: 7px;
      display: flex;
      .van-image {
        width: 106px;
        height: 106px;
        margin-right: 12px;
        border-radius: 12px;
        overflow: hidden;
        &:last-child {
          margin-right: 0;
        }
      }
      &.large {
        .van-image {
          width: 185px;
          height: 125px;
        }
      }
    }
    .logs {
      margin-top: 10px;
      > span {
        color: var(--cp-tip);
        margin-right: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
```

`Home/index.vue`
```ts
import KnowledgeList from './components/KnowledgeList.vue'
```
```html
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注"><knowledge-list /> </van-tab>
      <van-tab title="推荐"><knowledge-list /></van-tab>
      <van-tab title="减脂"><knowledge-list /></van-tab>
      <van-tab title="饮食"><knowledge-list /></van-tab>
    </van-tabs>
```

2）vant-list 组件基本使用，模拟加载更多效果


```vue
<script setup lang="ts">
import { ref } from 'vue'

const list = ref<number[]>([])
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // 加载数据
  console.log('loading')
  // 模拟加载更多
  setTimeout(() => {
    const data = [1, 2, 3, 4, 5]
    list.value.push(...data)
    // 模拟加载完毕
    if (list.value.length > 20) {
      finished.value = true
    }
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="(item, i) in list" :key="i" />
    </van-list>
  </div>
</template>
```

小结：
- v-model:loading 数据？
  - 控制加载中效果
- :finished 数据？
  - 控制全部数据是否加载完成，true就不在触发加载
- 触发加载事件，做什么？
  - 发请求，追加数据，判断是否加载完成



## 首页模块-知识数据-类型{#home-knowledge-type}

> 实现：接口是分页，数据类型的定和传参类型的定义

`types/consult.d.ts`

1）响应数据类型

```ts
// 文章信息类型
export type Knowledge = {
  id: string
  /** 标题 */
  title: string
  /** 封面[] */
  coverUrl: string[]
  /** 标签[] */
  topics: string[]
  /** 收藏数 */
  collectionNumber: number
  /** 评论数 */
  commentNumber: number
  /** 医生名称 */
  creatorName: string
  /** 医生头像 */
  creatorAvatar: string
  /** 医生医院 */
  creatorHospatalName: string
  /** 关注文章 */
  likeFlag: 0 | 1
  /** 内容 */
  content: string
  /** 医生科室 */
  creatorDep: string
  /** 医生职称 */
  creatorTitles: string
  /** 医生ID */
  creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页
export type KnowledgePage = {
  pageTotal: number
  total: number
  rows: KnowledgeList
}
```

2）查询参数类型

```ts
// props类型 recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

// 文章列表查询参数
export type KnowledgeParams = {
  type: KnowledgeType
  current: number
  pageSize: number
}
```

3）组件 props 类型

`Home/components/KnowledgeList.vue`
```ts
const props = defineProps<{
  type: KnowledgeType
}>()
```
`Home/index.vue`
```html
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注">
        <knowledge-list type="like" />
      </van-tab>
      <van-tab title="推荐">
        <knowledge-list type="recommend" />
      </van-tab>
      <van-tab title="减脂">
        <knowledge-list type="fatReduction" />
      </van-tab>
      <van-tab title="饮食">
        <knowledge-list type="food" />
      </van-tab>
    </van-tabs>
```


## 首页模块-知识加载-实现{#home-knowledge-logic}
> 实现：知识列表组件滚动加载

步骤：
- 定义 api 函数
- 准备查询参数
- 实现加载数据
- 知识卡片渲染

代码：


1）定义 api 函数 `services/consult.ts`
```ts
import type { KnowledgePage, KnowledgeParams } from '@/types/consult'
import { request } from '@/utils/request'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)
```

2）实现加载数据

`Home/components/KnowledgeList.vue`
```vue
<script setup lang="ts">
import { getKnowledgePage } from '@/services/consult'
import type { KnowledgeList, KnowledgeParams, KnowledgeType } from '@/types/consult'
import { ref } from 'vue'

const props = defineProps<{
  type: KnowledgeType
}>()

const loading = ref(false)
const finished = ref(false)

const list = ref<KnowledgeList>([])
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const onLoad = async () => {
  // 加载更多
  const res = await getKnowledgePage(params.value)
  list.value.push(...res.data.rows)
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>
```

3）渲染

`Home/components/KnowledgeCard.vue`
```vue
<script setup lang="ts">
import type { Knowledge } from '@/types/consult'

defineProps<{ item: Knowledge }>()
</script>

<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head">
      <van-image round class="avatar" :src="item.creatorAvatar"></van-image>
      <div class="info">
        <p class="name">{{ item.creatorName }}</p>
        <p class="dep van-ellipsis">
          {{ item.creatorHospatalName }} {{ item.creatorDep }} {{ item.creatorTitles }}
        </p>
      </div>
      <van-button class="btn" size="small" round>
        {{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}
      </van-button>
    </div>
    <div class="body">
      <h3 class="title van-ellipsis">{{ item.title }}</h3>
      <p class="tag">
        <span v-for="(tag, i) in item.topics" :key="i"># {{ tag }}</span>
      </p>
      <p class="intro van-multi-ellipsis--l2">{{ item.content.replace(/<[^>]+>/g, '') }}</p>
      <div class="imgs" :class="{ large: item.coverUrl.length === 1 }">
        <van-image fit="cover" v-for="(url, i) in item.coverUrl" :key="i" :src="url" />
      </div>
      <p class="logs">
        <span>{{ item.collectionNumber }} 收藏</span>
        <span>{{ item.commentNumber }} 评论</span>
      </p>
    </div>
  </div>
</template>
```

## 首页模块-推荐关注医生-结构{#home-doctor}
> 实现：在关注医生的文章列表下加上医生列表

步骤：
- 提取组件，定义组件基本结构
- 查看 van-swipe 组件的使用
- 添加医生卡片基本结构
- 去除 指示器，关闭 无缝滚动，色值一次滚动一个卡片

代码：

1）提取组件，定义组件基本结构 

定义组件，`Home/components/FollowDoctor.vue`
```vue
<script setup lang="ts"></script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
```
使用组件，`Home/index.vue`
```ts
import FollowDoctor from './components/FollowDoctor.vue'
```
```html
      <van-tab title="关注" name="like">
        <follow-doctor></follow-doctor>
        <knowledge-list type="like" />
      </van-tab>
```

2）查看 van-swipe 组件的使用
```html
      <van-swipe >
        <van-swipe-item v-for="item in 5" :key="item">
          {{ item }}
        </van-swipe-item>
      </van-swipe>
````

3) 添加医生卡片基本结构

`Home/components/DoctorCard.vue`

```vue
<script lang="ts" setup></script>
<template>
  <div class="doctor-card">
    <van-image
      round
      src="https://yanxuan-item.nosdn.127.net/3cb61b3fd4761555e56c4a5f19d1b4b1.png"
    />
    <p class="name">周医生</p>
    <p class="van-ellipsis">积水潭医院 神经内科</p>
    <p>副主任医师</p>
    <van-button round size="small" type="primary">+ 关注</van-button>
  </div>
</template>
<style scoped lang="scss" >
.doctor-card {
  width: 135px;
  height: 190px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
  text-align: center;
  padding: 15px;
  margin-left: 15px;
  display: inline-block;
  box-sizing: border-box;
  > .van-image {
    width: 58px;
    height: 58px;
    vertical-align: top;
    border-radius: 50%;
    margin: 0 auto 8px;
  }
  > p {
    margin-bottom: 0;
    font-size: 11px;
    color: var(--cp-tip);
    &.name {
      font-size: 13px;
      color: var(--cp-text1);
      margin-bottom: 5px;
    }
  }
  > .van-button {
    padding: 0 12px;
    height: 28px;
    margin-top: 8px;
    width: 72px;
  }
}
</style>
```
`Home/components/FollowDoctor.vue`
```ts
import DoctorCard from './DoctorCard.vue'
```
```html
<van-swipe-item v-for="item in 5" :key="item">
  <doctor-card />
</van-swipe-item>          
```

4）去除 指示器，关闭 无缝滚动，设置一次滚动一个卡片

```html
 <van-swipe :width="150" :show-indicators="false" :loop="false">
```

问题：
- 150 宽度的滚动距离，适配有问题，切换设备试试。


## 首页模块-@vueuse/core{#home-vueuse}

> 介绍 @vueuse/core 组合api库，使用 useXxx 函数获取设备宽度，动态设置滚动距离


@vueuse/core 介绍：[文档](https://vueuse.org/functions.html)
- 是一个基于 组合API 封装的库
- 提供了一些网站开发常用的工具函数，切得到的是响应式数据

需求：
- 在 375 宽度设备，滚动宽度为 150
- 在其他设备需要等比例设置滚动的宽度
- scrollWidth = 150 / 375 * deviceWidth 就可以适配

代码：

```ts
import { onMounted, onUnmounted, ref } from 'vue'

const width = ref(0)
const setWidth = () =>  width.value = window.innerWidth
onMounted(() => {
  setWidth()
  window.addEventListener('resize', setWidth)
})
onUnmounted(()=>{
  window.removeEventListener('resize', setWidth)
})
```
```html
<van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
```

@vueuse/core 应用：

```bash
pnpm add @vueuse/core
```

```ts
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
```

小结：
- 如果遇见一些常见的需求可以先看看 @vueuse/core 是否提供，这样可以提高开发效率。
  - 如果：窗口尺寸，滚动距离，是否进入可视区，倒计时，...等等。


## 首页模块-推荐关注医生-展示{#home-like-render}
> 完成关注tab下，推荐关注的医生列表展示

步骤：
- 定义 医生卡片数据 类型
- 定义 获取推荐关注医生 接口函数
- 实现 推荐关注的医生


代码：

1）定义 医生卡片数据 类型 `consult.d.ts`
```ts
// 通用的分页查询参数
export type PageParams = {
  /** 当前页码 */
  current: number
  /** 每页条数 */
  pageSize: number
}

// 文章列表查询参数
export type KnowledgeParams = PageParams & {
  /** 文章类型 */
  type: KnowledgeType
}

// 医生卡片对象
export type Doctor = {
  /** 医生ID */
  id: string
  /** 医生名称 */
  name: string
  /** 头像 */
  avatar: string
  /** 医院名称 */
  hospitalName: string
  /** 医院等级 */
  gradeName: string
  /** 科室 */
  depName: string
  /** 职称 */
  positionalTitles: string
  /** 是否关注，0 未关注 1 已关注 */
  likeFlag: 0 | 1
  /** 接诊服务费 */
  serviceFee: number
  /** 接诊人数 */
  consultationNum: number
  /** 评分 */
  score: number
  /** 主攻方向 */
  major: string
}

// 医生列表
export type DoctorList = Doctor[]

// 医生分页
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}
```
2）定义 获取推荐关注医生 接口函数 `consult.ts`
```ts 
import type { DoctorPage, KnowledgePage, KnowledgeParams, PageParams } from '@/types/consult'
import { request } from '@/utils/request'

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)
```

3）实现 推荐关注的医生展示

`Home/components/FollowDoctor.vue`
```vue
<script setup lang="ts">
import { getDoctorPage } from '@/services/consult'
import type { DoctorList } from '@/types/consult'
import { useWindowSize } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const { width } = useWindowSize()

const list = ref<DoctorList>()
const loadData = async () => {
  const res = await getDoctorPage({ current: 1, pageSize: 5 })
  list.value = res.data.rows
}
onMounted(() => loadData())
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctor-card :item="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
```

`Home/components/DoctorCard.vue`
```vue
<script lang="ts" setup>
import type { Doctor } from '@/types/consult'

defineProps<{ item: Doctor }>()
</script>
<template>
  <div class="doctor-card">
    <van-image round :src="item.avatar" />
    <p class="name">{{ item.name }}</p>
    <p class="van-ellipsis">{{ item.hospitalName }} {{ item.depName }}</p>
    <p>{{ item.positionalTitles }}</p>
    <van-button round size="small" type="primary">
      {{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}
    </van-button>
  </div>
</template>
```


## 首页模块-关注医生{#home-like}
> 实现：关注医生业务

步骤：
- 定义关注与取消关注API
- 实现关注和取消关注逻辑

代码：

- 定义关注与取消关注API

`types/consult.d.ts`
```ts
// 关注的类型，医生|文章|百科话题|疾病
export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'
```
`service/consult.ts`
```ts

export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })
```

- 实现关注和取消关注逻辑

`Home/components/DoctorCard.vue`
```html
<van-button :loading="loading" @click="follow(item)" round size="small" type="primary">
              {{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}
            </van-button>
```
```ts
import type { Doctor } from '@/types/consult'
import { followOrUnfollow } from '@/services/consult'
import { ref } from 'vue'

defineProps<{ item: Doctor }>()

// 关注逻辑
const loading = ref(false)
const follow = async (item: Doctor) => {
  loading.value = true
  try {
    await followOrUnfollow(item.id)
    item.likeFlag = item.likeFlag === 1 ? 0 : 1
  } finally {
    loading.value = false
  }
}
```





## 首页模块-逻辑复用{#home-like-logic}
> 利用组合API，实现关注医生业务逻辑复用

封装：

`composable/index.ts`
```ts
import { ref } from 'vue'
import { followOrUnfollow } from '@/services/consult'
import type { FollowType } from '@/types/consult'

// 封装逻辑，规范 useXxx，表示使用某功能
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  // {a, b} 类型，传值得时候 {a, b, c} 也可以，这是类型兼容：多的可以给少的
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}
```

使用：

`DoctorCard.vue`

```vue
<script lang="ts" setup>
import type { Doctor } from '@/types/consult'
import { useFollow } from '@/composable'

defineProps<{ item: Doctor }>()

// 关注逻辑
const { loading, follow } = useFollow()
</script>
<template>
  <div class="doctor-card">
    <van-image round :src="item.avatar" />
    <p class="name">{{ item.name }}</p>
    <p>{{ item.hospitalName }} {{ item.depName }}</p>
    <p>{{ item.positionalTitles }}</p>
    <van-button :loading="loading" @click="follow(item)" round size="small" type="primary">
      {{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}
    </van-button>
  </div>
</template>
```

`KnowledgeCard.vue`
```ts
const { loading, follow } = useFollow('knowledge')
```
```html
      <van-button
        class="btn"
        size="small"
        round
        :loading="loading"
        @click="follow(item)"
      >
        {{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}
      </van-button>
```

小结：
- 是组合API封装逻辑复用的函数，一般叫 hook 函数，是一种逻辑复用的思想
- 对象类型多的可以传递给少的，叫：类型兼容

