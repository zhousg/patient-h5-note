# 问诊室模块

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


## 问诊室-websocket介绍


## 问诊室-socket.io使用


## 问诊室-通讯规则


## 问诊室-发送消息


## 问诊室-接收消息


## 问诊室-聊天记录


## 问诊室-评价医生