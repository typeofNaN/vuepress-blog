---
title: Vue常用自定义指令
date: 2021-01-26
category: 技术文章
tag:
    - Vue
    - Vue Directive
---

Vue 自定义指令有全局注册和局部注册两种方式。先来看看注册全局指令的方式，通过 Vue.directive( id, [definition] ) 方式注册全局指令。然后在入口文件中进行 Vue.use() 调用。

<!-- more -->

批量注册指令，新建 directives/index.js 文件

``` js
import copy from './copy'
import longpress from './longpress'
// 自定义指令
const directives = {
  copy,
  longpress,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}
```

在 main.js 引入并调用

``` js
import Vue from 'vue'
import Directives from './directives'

Vue.use(Directives)
```

指令定义函数提供了几个钩子函数（可选）：

* bind: 只调用一次，指令第一次绑定到元素时调用，可以定义一个在绑定时执行一次的初始化动作。
* inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
* update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值。
* componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
* unbind: 只调用一次， 指令与元素解绑时调用。

下面分享几个实用的 Vue 自定义指令

* 复制粘贴指令 **v-copy**
* 长按指令 **v-longpress**
* 输入框防抖指令 **v-debounce**
* 禁止表情及特殊字符 **v-emoji**
* 图片懒加载 **v-lazyload**
* 权限校验指令 **v-permission**
* 实现页面水印 **v-waterMarker**
* 拖拽指令 **v-draggable**

## v-copy

### 需求

实现一键复制文本内容，用于鼠标右键粘贴。

### 思路

动态创建 textarea 标签，并设置 readOnly 属性及移出可视区域

将要复制的值赋给 textarea 标签的 value 属性，并插入到 body

选中值 textarea 并复制

将 body 中插入的 textarea 移除

在第一次调用时绑定事件，在解绑时移除事件

``` js
const copy = {
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        console.log('无复制内容')
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        console.log('复制成功') // 可根据项目UI仔细设计
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}

export default copy
```

### 使用

给 Dom 加上 v-copy 及复制的文本即可

``` vue
<template>
  <button v-copy="copyText">复制</button>
</template>

<script>
export default {
  data() {
    return {
      copyText: 'a copy directives'
    }
  }
}
</script>
```

## v-longpress

### 需求

实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件

### 思路

创建一个计时器， 2 秒后执行函数

当用户按下按钮时触发 mousedown 事件，启动计时器；用户松开按钮时调用 mouseout 事件。

如果 mouseup 事件 2 秒内被触发，就清除计时器，当作一个普通的点击事件

如果计时器没有在 2 秒内清除，则判定为一次长按，可以执行关联的函数。

在移动端要考虑 touchstart，touchend 事件

``` js
const longpress = {
  bind(el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function'
    }
    // 定义变量
    let pressTimer = null
    // 创建计时器（ 2秒后执行函数 ）
    let start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler()
        }, 2000)
      }
    }
    // 取消计时器
    let cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    // 运行函数
    const handler = (e) => {
      binding.value(e)
    }
    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}

export default longpress
```

### 使用

给 Dom 加上 v-longpress 及回调函数即可

``` vue
<template>
  <button v-longpress="longpress">长按</button>
</template>

<script>
export default {
  methods: {
    longpress() {
      alert('长按指令生效')
    }
  }
}
</script>
```

## v-debounce

### 背景

在开发中，有些提交保存按钮有时候会在短时间内被点击多次，这样就会多次重复请求后端接口，造成数据的混乱，比如新增表单的提交按钮，多次点击就会新增多条重复的数据。

### 需求

防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次。

### 思路

定义一个延迟执行的方法，如果在延迟时间内再调用该方法，则重新计算执行时间。

将时间绑定在 click 方法上。

``` js
const debounce = {
  inserted(el, binding) {
    let timer
    el.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  }
}

export default debounce
```

### 使用

给 Dom 加上 v-debounce 及回调函数即可

``` vue
<template>
  <button v-debounce="debounceClick">防抖</button>
</template>

<script>
export default {
  methods: {
    debounceClick() {
      console.log('只触发一次')
    }
  }
}
</script>
```

## v-emoji

### 背景

开发中遇到的表单输入，往往会有对输入内容的限制，比如不能输入表情和特殊字符，只能输入数字或字母等。

我们常规方法是在每一个表单的 on-change 事件上做处理。

``` vue
<template>
  <input
    v-model="note"
    type="text"
    @change="validateEmoji"
  />
</template>

<script>
export default {
  methods: {
    validateEmoji() {
      const reg = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
      this.note = this.note.replace(reg, '')
    }
  }
}
</script>
```

这样代码量比较大而且不好维护，所以我们需要自定义一个指令来解决这问题。

### 需求

根据正则表达式，设计自定义处理表单输入规则的指令，下面以禁止输入表情和特殊字符为例。

``` js
let findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

const trigger = (el, type) => {
  const e = document.createEvent('htmlEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

const emoji = {
  bind(el, binding, vNode) {
    // 正则规则可根据需求自定义
    var regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
    let $inp = findEle(el, 'input')
    el.$inp = $inp
    $inp.handle = function () {
      let val = $inp.value
      $inp.value = val.replace(regRule, '')

      trigger($inp, 'input')
    }
    $inp.addEventListener('keyup', $inp.handle)
  },
  unbind(el) {
    el.$inp.removeEventListener('keyup', el.$inp.handle)
  }
}

export default emoji
```

### 使用

将需要校验的输入框加上 v-emoji 即可

``` vue
<template>
  <input
    v-model="note"
    v-emoji
    type="text"
  />
</template>
```

## v-lazyload

### 背景

在类电商类项目，往往存在大量的图片，如 banner 广告图，菜单导航图，美团等商家列表头图等。图片众多以及图片体积过大往往会影响页面加载速度，造成不良的用户体验，所以进行图片懒加载优化势在必行。

### 需求

实现一个图片懒加载指令，只加载浏览器可见区域的图片。

### 思路

图片懒加载的原理主要是判断当前图片是否到了可视区域这一核心逻辑实现的

拿到所有的图片 Dom ，遍历每个图片判断当前图片是否到了可视区范围内

如果到了就设置图片的 src 属性，否则显示默认图片

图片懒加载有两种方式可以实现，一是绑定 scroll 事件进行监听，二是使用 IntersectionObserver 判断图片是否到了可视区域，但是有浏览器兼容性问题。

下面封装一个懒加载指令兼容两种方法，判断浏览器是否支持 IntersectionObserver API，如果支持就使用 IntersectionObserver 实现懒加载，否则则使用 scroll 事件监听 + 节流的方法实现。

``` js
const lazyload = {
  // install方法
  install(Vue, options) {
    const defaultSrc = options.default
    Vue.directive('lazyload', {
      bind(el, binding) {
        lazyload.init(el, binding.value, defaultSrc)
      },
      inserted(el) {
        if (IntersectionObserver) {
          lazyload.observe(el)
        } else {
          lazyload.listenerScroll(el)
        }
      },
    })
  },
  // 初始化
  init(el, val, def) {
    el.setAttribute('data-src', val)
    el.setAttribute('src', def)
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    var io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
    })
    io.observe(el)
  },
  // 监听scroll事件
  listenerScroll(el) {
    const handler = lazyload.throttle(lazyload.load, 300)
    lazyload.load(el)
    window.addEventListener('scroll', () => {
      handler(el)
    })
  },
  // 加载真实图片
  load(el) {
    const windowHeight = document.documentElement.clientHeight
    const elTop = el.getBoundingClientRect().top
    const elBtm = el.getBoundingClientRect().bottom
    const realSrc = el.dataset.src
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  },
  // 节流
  throttle(fn, delay) {
    let timer
    let prevTime
    return function (...args) {
      const currentTime = Date.now()
      const context = this
      if (!prevTime) prevTime = currentTime
      clearTimeout(timer)

      if (currentTime - prevTime > delay) {
        prevTime = currentTime
        fn.apply(context, args)
        clearTimeout(timer)
        return
      }

      timer = setTimeout(function () {
        prevTime = Date.now()
        timer = null
        fn.apply(context, args)
      }, delay)
    }
  }
}

export default lazyload
```

### 使用

将组件内 标签的 src 换成 v-lazyload

``` vue
<img v-lazyload="xxx.jpg" />
```

## v-permission

### 背景

在一些后台管理系统，我们可能需要根据用户角色进行一些操作权限的判断，很多时候我们都是粗暴地给一个元素添加 v-if / v-show 来进行显示隐藏，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。针对这种情况，我们可以通过全局自定义指令来处理。

### 需求

自定义一个权限指令，对需要权限判断的 Dom 进行显示隐藏。

### 思路

自定义一个权限数组

判断用户的权限是否在这个数组内，如果是则显示，否则则移除 Dom

``` js
function checkArray(key) {
  let arr = ['1', '2', '3', '4']
  let index = arr.indexOf(key)
  if (index > -1) {
    return true // 有权限
  } else {
    return false // 无权限
  }
}

const permission = {
  inserted(el, binding) {
    // 获取到 v-permission的值
    let permission = binding.value

    if (permission) {
      let hasPermission = checkArray(permission)
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}

export default permission
```

### 使用

给 v-permission 赋值判断即可

``` vue
<div class="btn">
  <!-- 显示 -->
  <button v-permission="'1'">权限按钮1</button>
  <!-- 不显示 -->
  <button v-permission="'10'">权限按钮2</button>
</div>
```

## v-waterMarker

### 需求

给整个页面添加背景水印

### 思路

使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。

将其设置为背景图片，从而实现页面或组件水印效果

``` js
function addWaterMarker(str, parentNode, font, textColor) {
  // 水印文字，父元素，字体，文字颜色
  var can = document.createElement('canvas')
  parentNode.appendChild(can)
  can.width = 200
  can.height = 150
  can.style.display = 'none'
  var cans = can.getContext('2d')
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = font || '16px Microsoft YaHei'
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, can.width / 10, can.height / 2)
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}

const waterMarker = {
  bind: function (el, binding) {
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
  }
}

export default waterMarker
```

使用，设置水印文案，颜色，字体大小即可

``` vue
<template>
  <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
</template>
```

## v-draggable

### 需求

实现一个拖拽指令，可在页面可视区域任意拖拽元素。

### 思路

设置需要拖拽的元素为相对定位，其父元素为绝对定位。

鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。

鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值

鼠标松开(onmouseup)时完成一次拖拽

``` js
const draggable = {
  inserted: function (el) {
    el.style.cursor = 'move'
    el.onmousedown = function (e) {
      let disX = e.pageX - el.offsetLeft
      let disY = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        let x = e.pageX - disX
        let y = e.pageY - disY
        let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
        let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
        if (x < 0) {
          x = 0
        } else if (x > maxX) {
          x = maxX
        }

        if (y < 0) {
          y = 0
        } else if (y > maxY) {
          y = maxY
        }

        el.style.left = x + 'px'
        el.style.top = y + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  }
}
export default draggable
```

### 使用

在 Dom 上加上 v-draggable 即可

``` vue
<template>
  <div
    v-draggable
    class="el-dialog"
  ></div>
</template>
```