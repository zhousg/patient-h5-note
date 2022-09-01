# 其他扩展
[TOC]

## 第三方登录

### QQ登录流程

### 跳转QQ登录

步骤：
- 本地host配置
- 引入QQ登录SDK
- 生成QQ登录跳转链接
- 登录后回跳成功

代码：
1） 本地host配置
`windows`
```
1. 找到 C:\Windows\System32\drivers\etc 下hosts文件
2. 在文件中加入  127.0.0.1       consult-patients.itheima.net
3. 保存即可。
# 如果提示没有权限
1. 将hosts文件移到桌面，然后进行修改，确认保存。
2. 将桌面hosts文件替换c盘文件
```


`mac OS`
```
1. 打开命令行窗口
2. 输入：sudo vim /etc/hosts
3. 按下：i 键
4. 输入：127.0.0.1       consult-patients.itheima.net
5. 按下：esc
6. 按下：shift + :
7. 输入：wq 回车即可
```

2） 引入QQ登录SDK

`inde.html`
```vue
<script
  src="http://connect.qq.com/qc_jssdk.js"
  data-appid="102015968"
  data-redirecturi="http://consult-patients.itheima.net:8080/login/callback"
></script>
```

3）生成QQ登录跳转链接，改成直接跳转

```ts
  onMounted(() => {
    // 组件渲染完毕，使用QC生成QQ登录按钮，目的得到跳转链接
    QC.Login({
      btnId: 'qq'
    })
  })
```
```html
<div class="icon" id="qq">
```
以上可以审查元素看到登录链接，复制后改成 A 标签改成 href 跳转即可
```html
  <a
    href="https://graph.qq.com/oauth2.0/authorize?client_id=102015968&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fconsult-patients.itheima.net%3A8080%2Flogin%2Fcallback"
  >
    <img src="@/assets/qq.svg" alt="" />
  </a>
```

![image-20220901163913209](./images/image-20220901163913209.png)

:::tip 注意

在手机访问会走QQ登录手机页面，点击按钮唤起QQ应用进行登录，课堂无法演示（限制域名）

开发中可以把谷歌手机模拟器关闭，关闭后可以可以使用手机QQ扫码进行登录，可走通流程。

:::

![image-20220901163349489](./images/image-20220901163349489.png)

4）登录后回跳成功

链接如下，路由为 `/login/callback`
```
http://consult-patients.itheima.net:8080/login/callback#access_token=B417C0C3EBF93A380A22A188A9C491A4&expires_in=7776000
```


### QQ登录-进行登录

步骤：
- 路由规则，加入登录白名单，基础结构
- 编写QQ登录API函数
- 提供 `QC` 相关的类型，使用QQ的SDK提供 `QC` 相关API获取 `openId`
- 提交三方登录亲请求
  - 1 如果之前没绑定，失败：需要绑定手机
  - 2 如果之前绑定过，成功：和之前登录成功一样的逻辑
  - 刚注册用户，属于情况1

代码：

1）路由规则，加入登录白名单，基础结构
```ts
    {
      path: '/login/callback',
      component: () => import('@/views/Login/LoginCallback.vue'),
      meta: { title: 'QQ登录-绑定手机' }
    }
```
```ts
  // 不需要登录的页面，白名单
  const wihteList = ['/login', '/login/callback']
```
```vue
<script setup lang="ts"></script>

<template>
  <div class="login-page">login-callback</div>
</template>

<style lang="scss" scoped></style>
```

2）编写QQ登录API函数
```ts
export const loginByQQ = (openId: string) =>
  request<User>('/login/thirdparty', 'POST', { openId, source: 'qq' })
```

3）提供 `QC` 相关的类型，使用QQ的SDK提供 `QC` 相关API获取 `openId`
`env.d.ts`
```diff
interface Window {
  _AMapSecurityConfig: {
    securityJsCode: string
  }
+  QC: {
+    Login: {
+      check(): boolean
+      getMe(cb: (openId: string) => void): void
+    }
+  }
}
```

`/Login/LoginCallback.vue`  记录 openId 和 isBind
```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const openId = ref('')
const isBind = ref(true)
onMounted(() => {
  if (window.QC.Login.check()) {
    window.QC.Login.getMe((id) => {
      openId.value = id
      // QQ，登录
      loginByQQ(id)
        .then((res) => {
          // 登录成功
        })
        .catch(() => {
          // 登录失败
          isBind.value = false
        })
    })
  }
})
</script>

<template>
  <div class="login-page">login-callback</div>
</template>

<style lang="scss" scoped></style>
```

小结：
- `isBind` 是 `false` 需要显示绑定手机界面


### QQ登录-绑定手机

步骤：
- 准备基础页面
- 表单校验
- 发送验证码（拷贝）
- 进行绑定
- 绑定成功即是登录成功，根据是否有回跳地址进行跳转

代码：

1）准备基础页面

```vue 
<template>
  <div class="login-page" v-if="isBind">
    <cp-nav-bar></cp-nav-bar>
    <div class="login-head">
      <h3>手机绑定</h3>
    </div>
    <van-form autocomplete="off" ref="form">
      <van-field name="mobile" placeholder="请输入手机号"
      ></van-field>
      <van-field name="code" placeholder="请输入验证码">
        <template #button>
          <span class="btn-send">发送验证码</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"> 立即绑定 </van-button>
      </div>
    </van-form>
  </div>
</template>
```

2）表单校验
```ts 
import { mobileRules, codeRules } from '@/utils/rules'


const mobile = ref('')
const code = ref('')
const bind = async () => {
  // 校验通过
}
```

```html 
<van-form autocomplete="off" @submit="bind" ref="form">
  <van-field
    v-model="mobile"
    name="mobile"
    :rules="mobileRules"
    placeholder="请输入手机号"
  ></van-field>
  <van-field v-model="code" name="code" :rules="codeRules" placeholder="请输入验证码">
    <template #button>
      <span class="btn-send">发送验证码</span>
    </template>
  </van-field>
  <div class="cp-cell">
    <van-button block round type="primary" native-type="submit"> 立即绑定 </van-button>
  </div>
</van-form>
```

3）发送验证码
```ts
import { Toast, type FormInstance } from 'vant'
import { onUnmounted, ref } from 'vue'
// ... 省略 ...
const form = ref<FormInstance>()
const time = ref(0)
let timeId: number
const send = async () => {
  if (time.value > 0) return
  await form.value?.validate('mobile')
  await sendMobileCode(mobile.value, 'login')
  Toast.success('发送成功')
  time.value = 60
  // 倒计时
  clearInterval(timeId)
  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) window.clearInterval(timeId)
  }, 1000)
}
onUnmounted(() => {
  window.clearInterval(timeId)
})
```
```html 
  <template #button>
    <span class="btn-send" :class="{ active: time > 0 }" @click="send">
      {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
    </span>
  </template>
```

3）进行绑定

```ts
export const bindMobile = (data: { mobile: string; code: string; openId: string }) =>
  request<User>('/login/binding', 'POST', data)
```

```ts
import type { User } from '@/types/user'


// 登录成功
const store = useUserStore()
const router = useRouter()
const loginSuccess = (res: { data: User }) => {
  store.setUser(res.data)
  router.replace('/user')
  Toast.success('登录成功')
}

const bind = async () => {
  const res = await bindMobile({
    mobile: mobile.value,
    code: code.value,
    openId: openId.value
  })
  loginSuccess(res)
}
```
```diff
      loginByQQ(id)
        .then((res) => {
+          loginSuccess(res)
        })
        .catch(() => {
          isBind.value = false
        })
```

4) 绑定成功即是登录成功，根据是否有回跳地址进行跳转
`stores/modules/user.ts`
```ts
   // 记录回跳地址
    const returnUrl = ref('')
    const setReturnUrl = (url: string) => (returnUrl.value = url)
    return { user, setUser, delUser, returnUrl, setReturnUrl }
```
`Login/index.vue`
```diff
        <a
+          @click="store.setReturnUrl($route.query.returnUrl as string)"
          href="https://graph.qq.com/oauth2.0/authorize?client_id=102015968&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fconsult-patients.itheima.net%3A8080%2Flogin%2Fcallback"
        >
          <img src="@/assets/qq.svg" alt="" />
        </a>
```
`Login/LoginCallback.vue`
```diff
// 登录成功
const loginSuccess = (res: { data: User }) => {
  store.setUser(res.data)
  // 如果有回跳地址就进行回跳，没有跳转到个人中心
+  router.replace(store.returnUrl || '/user')
  Toast.success('登录成功')
+  store.setReturnUrl('')
}
```


### 验证码hook封装

步骤：
- 分析 hook 需要传入参数，返回哪些数据
- 封装 hook 函数
- 使用 hook 函数

代码：
1）分析 hook 需要传入参数，返回哪些数据
```
参数：
1. 

返回：
```


### 区分环境


## 真机调试

## mock接口数据

## tailwindcss


## 项目上线


### 项目打包


### pm2部署


### 云自动部署


### gitlab部署