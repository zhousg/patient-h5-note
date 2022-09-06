### 泛型约束{#generic-constraint}

> 了解：使用泛型约束，实现对泛型类型进行收缩

```ts
// 代码报错
function getId<T>(id: T): T {
  console.log(id.length)
  return id
}
getId([1, 2])
```
- 解释
  - Type 可以代表任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length
  - 需要为泛型添加约束来 `收缩类型` (缩窄类型取值范围)
  - 实现泛型约束两种方式：1 指定更加具体的类型  2 添加约束


1. 指定更加具体的类型

```ts
// 约束传入的参数有length属性，约定为数组
function getId<T>(id: T[]): T[] {
  console.log(id.length);
  return id;
}
getId([1, 2]);
```
但是：除了数组，字符串也有length属性

2. 添加约束

```ts
// 通过 `extends` 关键字使用该接口，为泛型(类型变量)添加约束
// 注意：传入的实参(比如，数组)只要有 length 属性即可（类型兼容性)
interface Len {
  length: number;
}
function getId<T extends Len>(id: T): T {
  console.log(id.length);
  return id;
}
getId('1');
getId(['2']);
```

解释:
1. 创建描述约束的接口 Len，该接口要求提供 length 属性
2. 通过 `extends` 关键字使用该接口，为泛型(类型变量)添加约束
3. 该约束表示：**传入的类型必须具有 length 属性**

:::tip
- 泛型约束语法比较高级，一般用于框架封装，或者高级函数封装。
- 还有class泛型，一般在node后台开发使用较多，今天也就不提及
:::