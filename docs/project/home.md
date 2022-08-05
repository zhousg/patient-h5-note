# 首页模块







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