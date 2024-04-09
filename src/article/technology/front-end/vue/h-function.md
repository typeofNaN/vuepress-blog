---
title: Vue使用h函数创建子组件
date: 2023-01-25
category: 技术文章
tag:
    - Vue
    - render
    - h
---

本文总结一下 Vue 使用`h函数`创建子组件。

<!-- more -->

## h 函数是什么

`h函数`本质就是`createElement()`的简写，作用是根据配置创建对应的虚拟节点，在 vue 中占有极其重要的地位！！！

## h 函数的配置

h 函数 接收三个参数：type，props 和 children：

### type

* 类型：String | Object | Function
* 详细：HTML 标签名、组件、异步组件或函数式组件 （注意：Vue3 不支持组件名用字符串表示了，必须直接使用组件名）

``` js
import MySon from './son.vue'

h('div', { }, [
  h(MySon, { props: { name: 'hhh' } }) // MySon 不可写成 'MySon'
])
```

### props

* 类型：Object

``` js
{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 `on`
  // 所以不再支持如 `v-on:keyup.enter` 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```

### children

* 类型：String | Object | Array

#### String

``` js
h('div', { }, 'Some text comes first.')
```

生成的虚拟节点：

``` html
<div>Some text comes first.</div>
```

#### Array

``` js
h('div', { }, [
  'Some text comes first.',
  h('h1', 'A headline'),
  h(MyComponent, {
    props: {
    	name: 'hhh'
    }
  })
])
```

生成的虚拟节点：

``` html
<div>
  Some text comes first.
  <h1>A headline</h1>
  <MyComponent name="hhh" />
</div>
```

#### Object

子组件：

``` vue
<template>
  <div>
    你好，我是子组件，下面是两个具名插槽
    <template #content />
    <template #contentTips />
  </div>
</template>
```

父组件：

``` js
const props = {
  name: 'aaa',
  age: 18
}
const slots = { }

['content', 'contentTips'].forEach(name => slots[name] = h('div', {key: name}, name))

h(MySon, { ...props }, slots)
```

## h 函数如何接收子组件$emit发送的事件

### Vue2

子组件：

``` vue
<template>
  <div>
    <button @click.stop="$emit('start', 'hello!!!')" />
  </div>
</template>
```

父组件的 h 函数：

``` js
import MySon from './son.vue'

h(MySon, {
  // 子组件 $emit 传递函数
  start(data) {
    console.log(data)
  }
})
```

### vue3

子组件：

``` vue
<template>
  <div>
    <button @click.stop="$emit('start', 'hello!')" />
  </div>
</template>
```

父组件的 h 函数：

``` js
import MySon from './son.vue'

h(TableActionButtons, {
  // 子组件 $emit 传递函数！！！！
  onStart(data) {
    console.log(data)
  }
})
```