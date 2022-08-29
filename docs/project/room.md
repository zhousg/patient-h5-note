# 问诊室模块

![image-20220824154943859](./images/image-20220824154943859.png)

![image-20220824155012193](./images/image-20220824155012193.png)

![image-20220824155114135](./images/image-20220824155114135.png)

## 问诊室-路由与组件


1）路由与组件

- 组件
```vue
<script setup lang="ts"></script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
  </div>
</template>

<style lang="scss" scoped>

</style>
```
- 路由
```ts
    {
      path: '/room',
      component: () => import('@/views/Room/index.vue'),
      meta: { title: '问诊室' }
    },
```

2）准备顶部订单状态

- 等待接诊，咨询中，已结束

```vue
<script setup lang="ts"></script>

<template>
  <div class="room-status">
    <div class="wait">已通知医生尽快接诊，24小时内医生未回复将自动退款</div>
    <!-- <div class="chat">
      <span>咨询中</span>
      <span>剩余时间：23:10:34</span>
    </div> -->
    <!-- <div class="end"><van-icon name="passed" /> 已结束</div> -->
  </div>
</template>

<style lang="scss" scoped>
.room-status {
  position: fixed;
  left: 0;
  top: 46px;
  height: 44px;
  width: 100%;
  background-color: #fff;
  font-size: 13px;
  z-index: 1;
  .wait {
    padding: 0 15px;
    background-color: var(--cp-plain);
    height: 100%;
    line-height: 44px;
    text-align: center;
    color: var(--cp-primary);
  }
  .chat {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    span {
      &:first-child {
        color: var(--cp-primary);
      }
      &:last-child {
        color: var(--cp-text2);
        width: 120px;
      }
    }
  }
  .end {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 15px;
    font-weight: 500;
    .van-icon {
      font-size: 14px;
      margin-right: 4px;
      position: relative;
      top: 1px;
    }
  }
}
</style>
```
```vue
<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <room-status />
  </div>
</template>
```

3）准备底部订单操作栏

```vue
<script setup lang="ts"></script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
    ></van-field>
    <van-uploader :preview-image="false">
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
```
```vue
<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <room-status />

    <room-action />
  </div>
</template>
```




## 问诊室-消息卡片

组件 `Room/components/RoomMessage.vue` 

```vue
<script setup lang="ts"></script>

<template>
  各类消息
</template>

<style lang="scss" scoped>
@import '@/styles/room.scss';
</style>

```

- 病情描述

```html
  <div class="msg msg-illness">
    <div class="patient van-hairline--bottom">
      <p>李富贵 男 31岁</p>
      <p>一周内 | 未去医院就诊</p>
    </div>
    <van-row>
      <van-col span="6">病情描述</van-col>
      <van-col span="18">头痛、头晕、恶心</van-col>
      <van-col span="6">图片</van-col>
      <van-col span="18">点击查看</van-col>
    </van-row>
  </div>
```

- 温馨提示-通知

```html
  <div class="msg msg-tip">
    <div class="content">
      <span class="green">温馨提示：</span>
      <span>在线咨询不能代替面诊，医护人员建议仅供参考</span>
    </div>
  </div>
```

- 通知

```html
  <div class="msg msg-tip">
    <div class="content">
      <span>医护人员正在赶来，请耐心等候</span>
    </div>
  </div>
```

- 发送文字

```html
  <div class="msg msg-to">
    <div class="content">
      <div class="time">20:12</div>
      <div class="pao">大夫你好？</div>
    </div>
    <van-image src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg" />
  </div>
```

- 发送图片

```html
  <div class="msg msg-to">
    <div class="content">
      <div class="time">20:12</div>
      <van-image
        fit="contain"
        src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg"
      />
    </div>
    <van-image src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg" />
  </div>
```

- 接收文字

```html
  <div class="msg msg-from">
    <van-image src="https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_3.jpg" />
    <div class="content">
      <div class="time">20:12</div>
      <div class="pao">哪里不舒服</div>
    </div>
  </div>
```

- 处方消息

```html
  <div class="msg msg-recipe">
    <div class="content">
      <div class="head van-hairline--bottom">
        <div class="head-tit">
          <h3>电子处方</h3>
          <p>原始处方 <van-icon name="arrow"></van-icon></p>
        </div>
        <p>李富贵 男 31岁 血管性头痛</p>
        <p>开方时间：2022-01-15 14:21:42</p>
      </div>
      <div class="body">
        <div class="body-item" v-for="i in 2" :key="i">
          <div class="durg">
            <p>优赛明 维生素E乳</p>
            <p>口服，每次1袋，每天3次，用药3天</p>
          </div>
          <div class="num">x1</div>
        </div>
      </div>
      <div class="foot"><span>购买药品</span></div>
    </div>
  </div>
```

- 订单取消

```html
  <div class="msg msg-tip msg-tip-cancel">
    <div class="content">
      <span>订单取消</span>
    </div>
  </div>
```

- 评价卡片

```vue
<script setup lang="ts">
import { Toast } from 'vant'
import { computed, ref } from 'vue'

const emit = defineEmits(['submit'])
defineProps<{ complete?: boolean; showScore?: number }>()

const score = ref(0)
const anonymousFlag = ref(false)
const content = ref('')
const disabled = computed(() => !score.value || !content.value)
const onSubmit = () => {
  if (!score.value) return Toast('请选择评分')
  if (!content.value) return Toast('请输入评价')
  emit('submit', {
    score: score.value,
    content: content.value,
    anonymousFlag: anonymousFlag.value ? 1 : 0
  })
}
</script>

<template>
  <div class="evalutate-card" v-if="complete">
    <p class="title">医生服务评价</p>
    <p class="desc">我们会更加努力提升服务质量</p>
    <van-rate
      :model-value="showScore"
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
    />
  </div>
  <div class="evalutate-card" v-else>
    <p class="title">感谢您的评价</p>
    <p class="desc">本次在线问诊服务您还满意吗？</p>
    <van-rate
      v-model="score"
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
    />
    <van-field
      v-model="content"
      type="textarea"
      maxlength="150"
      show-word-limit
      rows="3"
      placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
    ></van-field>
    <div class="footer">
      <van-checkbox v-model="anonymousFlag">匿名评价</van-checkbox>
      <van-button @click="onSubmit" type="primary" size="small" :class="{ disabled }" round
        >提交评价</van-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.evalutate-card {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  .title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .desc {
    font-size: 12px;
    margin-bottom: 15px;
    color: var(--cp-tip);
  }
  .van-field {
    background-color: var(--cp-bg);
    margin: 15px 0;
    border-radius: 8px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    ::v-deep() {
      .van-checkbox {
        height: 16px;
        .van-icon {
          font-size: 11px;
        }
        &__label {
          font-size: 12px;
          color: var(--cp-tip);
        }
      }
      .van-button {
        padding: 0 16px;
        &.disabled {
          opacity: 1;
          background: #fafafa;
          color: #d9dbde;
          border: #fafafa;
        }
      }
    }
  }
}
</style>
```
```ts
import EvaluateCard from './EvaluateCard.vue'
```
```html
  <div class="msg msg-comment">
    <evaluate-card />
  </div>
```


## 问诊室-websocket介绍

> 目的：认识websocket 

什么是 websocket ? https://websocket.org/

- 是一种网络通信协议，和 HTTP 协议 一样。


为什么需要websocket ?

- 因为 HTTP 协议有一个缺陷：通信只能由客户端发起。


理解 websokect 通讯过程

![](https://www.ruanyifeng.com/blogimg/asset/2017/bg2017051502.png)

了解 websocket api含义

```js
// 创建ws实例，建立连接
var ws = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

// 连接成功事件
ws.onopen = function(evt) { 
  console.log("Connection open ...");
  // 发送消息
  ws.send("Hello WebSockets!");
};
// 接受消息事件
ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  // 关闭连接  
  ws.close();
};
// 关闭连接事件
ws.onclose = function(evt) {
  console.log("Connection closed.");
};      
```

我们项目中使用 socket.io-client 来实现客户端代码，它是基于 websocket 的库。


## 问诊室-socket.io使用

> 目的：掌握 socket.io 的基本使用

1. socket.io 什么？
   - socket.io 是一个基于 WebSocket 的 CS（客户端-服务端）的实时通信库
   - 使用它可以在后端提供一个即时通讯服务
   - 它也提供一个 js 库，在前端可以去链接后端的 socket.io 创建的服务
   - 总结：它是一套基于 websocket 前后端即时通讯解决方案

2. socket.io 如何使用？
   -  大家可以体验下这个 [官方Demo](https://socket.io/get-started/chat#getting-this-example)

3. 我们需要掌握的客户端几个 api 的基本使用

如何使用客户端js库?
```bash
pnpm add socket.io-client
```

如何建立连接？
```ts
import io from 'socket.io-client'
// 参数1：不传默认是当前服务域名，开发中传入服务器地址
// 参数2：配置参数，根据需要再来介绍
const socket = io()
```

如何确定连接成功？
```ts
socket.on('connect', () => {
  // 建立连接成功
})
```

如何发送消息？
```ts
// chat message 发送消息事件，由后台约定，可变
socket.emit('chat message', '消息内容')
```

如何接收消息？

```ts
// chat message 接收消息事件，由后台约定，可变
socket.on('chat message', (ev) => {
  // ev 是服务器发送的消息
})
```

如何关闭连接？
```ts
// 离开组件需要使用
socket.close()
```

小结：
- sockt.io 在前端使用的js库需要知道哪些内容？
  - 如何建立链接 `io('地址')`
  - 连接成功的事件 `connect`
  - 如何发消息 `emit` + 事件
  - 如何收消息 `on` + 事件
  - 如果关闭连接 `close()`


## 问诊室-通讯规则


## 问诊室-默认展示


## 问诊室-发送消息


## 问诊室-接收消息


## 问诊室-聊天记录


## 问诊室-评价医生


## 问诊室-查看处方


## 问诊室-购买药品