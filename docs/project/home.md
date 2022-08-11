# 首页模块

![image-20220811163550162](./images/image-20220811163550162.png)



## 首页模块-基础结构{#homw-html}
> 实现：首页基础结构搭建

步骤：
- 头部
- 导航
- 轮播图

代码：`Home/index.vue`
- 头部

```html
  <div class="home-page">
    <div class="home-header">
      <div class="con">
        <h1>优医</h1>
        <div class="search"><cp-icon name="home-search" /> 搜一搜：疾病/症状/医生/健康知识</div>
      </div>
    </div>
  </div>  
```
```scss
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
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.82);
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
```

- 导航

```html
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
          <router-link to="/fast" class="nav">
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
```
```scss
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
```
- 轮播图

```html
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
```
```scss
.home-banner {
  padding: 10px 15px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
```

提问：
- 首页的金刚区如何实现？
  - van-col  van-row
- 首页的轮播图如何实现？
  - van-swipe 


## 首页模块-知识列表搭建{#home-knowledge-html}
> 实现：tab切换效果，准备知识列表组件

步骤：
- 使用 van-tabs 组件，重置样式
- 提取 knowledge-list 组件展示知识文章列表
- 默认激活 推荐tab , 结合查询列表接口的知识类型

代码：

1）使用 van-tabs 组件，重置样式

 `Home/index.vue`
```html
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注">1 </van-tab>
      <van-tab title="推荐">2</van-tab>
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

2）提取 knowledge-list 组件展示知识文章列表

`Home/components/KnowledgeList.vue`
```vue
<script setup lang="ts"></script>

<template>
  <div class="knowledge-list">
    <div class="knowledge-item van-hairline--bottom" v-for="i in 5" :key="i">
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
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
.knowledge-item {
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
      width: 226px;
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
      padding: 0 16px;
      border-color: var(--cp-primary);
      color: var(--cp-primary);
      height: 28px;
      width: 70px;
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
      margin-top: 6px;
      display: flex;
      .van-image {
        width: 106px;
        height: 106px;
        margin-right: 16px;
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
```ts
import KnowledgeList from './components/KnowledgeList.vue'
```
```html
    <van-tabs shrink sticky>
      <van-tab title="关注"><knowledge-list /> </van-tab>
      <van-tab title="推荐"><knowledge-list /></van-tab>
      <van-tab title="减脂"><knowledge-list /></van-tab>
      <van-tab title="饮食"><knowledge-list /></van-tab>
    </van-tabs>
```

2）默认激活 推荐tab , 结合查询列表接口的知识类型
- recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章

`types/fast.d.ts`
```ts

```

`Home/index.vue`
```ts
import { ref } from 'vue'
import KnowledgeList from './components/KnowledgeList.vue'
import type { KnowledgeType } from '@/types/fast'

const active = ref<KnowledgeType>('recommend')
```
```html
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注" name="like"><knowledge-list /> </van-tab>
      <van-tab title="推荐" name="recommend"><knowledge-list /></van-tab>
      <van-tab title="减脂" name="fatReduction"><knowledge-list /></van-tab>
      <van-tab title="饮食" name="food"><knowledge-list /></van-tab>
    </van-tabs>
```

提问：
- active 的值是什么？
  - 将来查询知识问诊列表的类型，局限于4个值。



## 首页模块-知识列表加载{#home-knowledge-load}
> 实现：识列表组件滚动加载

步骤：
- 使用 van-list 组件实现上拉加载更多效果
- 定义 api 函数
- 实现加载数据和渲染

代码：

1）使用 van-list 组件实现上拉加载更多效果 `Home/components/KnowledgeList.vue`

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  // 加载数据
  console.log('loading')
  // 1. 发请求获取的数据（默认第一页）追加到数组
  // 2. 判断是否还有数据（当前页是否等于总页数）
  // 2.1 有，当前页+1
  // 2.2 没，设置为已完成所有数据加载
  // 3 结束加载效果
}
</script>

<template>
  <div class="knowledge-list">
    <van-list v-model:loading="loading" v-model:finished="finished" @load="onLoad">
      <div class="knowledge-item van-hairline--bottom" v-for="i in 5" :key="i">
        <!-- ...省略... -->
      </div>
    </van-list>
  </div>
</template>
```

2）定义 api 函数





## 首页模块-关注列表{#home-like}




## 枚举类型{#enum}

### 枚举基本语法{#enum-base}
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


### 枚举使用场景{#enum-intro}

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