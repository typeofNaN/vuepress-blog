import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as r,a as t,d as e,f as i,e as o}from"./app-8fdb34df.js";const n={},d=e("p",null,"本文整理一下前端开发三大工具之一------CSS的常用属性及书写顺序规范",-1),s=e("h2",{id:"快速记忆",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#快速记忆","aria-hidden":"true"},"#"),i(" 快速记忆")],-1),h=e("h3",{id:"口诀",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#口诀","aria-hidden":"true"},"#"),i(" 口诀")],-1),c=e("p",null,"状定形边字背其，上右下左顺时针。",-1),u=o(`<ul><li>状（状态）</li><li>定（定位）</li><li>形（形状）</li><li>边（边框）</li><li>字（字体）</li><li>背（背景）</li><li>其（其他）</li></ul><p>属性越前则优先级越高。</p><h2 id="规范书写顺序原因" tabindex="-1"><a class="header-anchor" href="#规范书写顺序原因" aria-hidden="true">#</a> 规范书写顺序原因</h2><h3 id="目的" tabindex="-1"><a class="header-anchor" href="#目的" aria-hidden="true">#</a> 目的</h3><p>减少浏览器reflow（回流），提升浏览器渲染dom的性能。</p><h3 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h3><p>浏览器的渲染流程为：</p><ol><li>解析html构建dom树，解析css构建css树：将html解析成树形的数据结构，将css解析成树形的数据结构；</li><li>构建render树：DOM树和CSS树合并之后形成的render树；</li><li>布局render树：有了render树，浏览器已经知道那些网页中有哪些节点，各个节点的css定义和以及它们的从属关系，从而计算出每个节点在屏幕中的位置；</li><li>绘制render树：按照计算出来的规则，通过显卡把内容画在屏幕上。</li></ol><p>css样式解析到显示至浏览器屏幕上就发生在②③④步骤，可见浏览器并不是一获取到css样式就立马开始解析而是根据css样式的书写顺序将之按照dom树的结构分布render样式，完成第②步，然后开始遍历每个树结点的css样式进行解析，此时的css样式的遍历顺序完全是按照之前的书写顺序。在解析过程中，一旦浏览器发现某个元素的定位变化影响布局，则需要倒回去重新渲染正如按照这样的书写书序：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当浏览器解析到position的时候突然发现该元素是绝对定位元素需要脱离文档流，而之前却是按照普通元素进行解析的，所以不得不重新渲染，解除该元素在文档中所占位置，然而由于该元素的占位发生变化，其他元素也可能会受到它回流的影响而重新排位。最终导致③步骤花费的时间太久而影响到④步骤的显示，影响了用户体验。</p><p>所以规范的的css书写顺序对于文档渲染来说一定是事半功倍的！</p><h2 id="详细解析" tabindex="-1"><a class="header-anchor" href="#详细解析" aria-hidden="true">#</a> 详细解析</h2><h3 id="状态类" tabindex="-1"><a class="header-anchor" href="#状态类" aria-hidden="true">#</a> 状态类</h3><ul><li>display: block | none | inline | compact | marker | inline-table | list-item | run-in | table | table-caption | table-cell | table-column | table-column-group | table-footer-group | table-header-group | table-row | table-row-group</li><li>visibility: inherit | visible | collapse | hidden</li><li>float: none | left | right</li><li>clear: none | left | right | both</li><li>overflow: visible | auto | hidden | scroll</li></ul><h3 id="定位类" tabindex="-1"><a class="header-anchor" href="#定位类" aria-hidden="true">#</a> 定位类</h3><ul><li>position: static | absolute | fixed | relative</li><li>top：auto | length</li><li>right: auto | length</li><li>bottom: auto | length</li><li>left: auto | length</li><li>z-index: auto | number</li></ul><h3 id="形状类" tabindex="-1"><a class="header-anchor" href="#形状类" aria-hidden="true">#</a> 形状类</h3><h4 id="宽" tabindex="-1"><a class="header-anchor" href="#宽" aria-hidden="true">#</a> 宽</h4><ul><li>width: visible | auto | hidden | scroll</li><li>min-width: visible | auto | hidden | scroll</li><li>max-width: visible | auto | hidden | scroll</li></ul><h4 id="高" tabindex="-1"><a class="header-anchor" href="#高" aria-hidden="true">#</a> 高</h4><ul><li>height: auto | length</li><li>min-height: auto | length</li><li>max-height: auto | length</li></ul><h3 id="边框类" tabindex="-1"><a class="header-anchor" href="#边框类" aria-hidden="true">#</a> 边框类</h3><h4 id="margin" tabindex="-1"><a class="header-anchor" href="#margin" aria-hidden="true">#</a> margin</h4><ul><li>margin: auto | length</li><li>margin-top: auto | length</li><li>margin-right: auto | length</li><li>margin-bottom: auto | length</li><li>margin-left: auto | length</li></ul><h4 id="padding" tabindex="-1"><a class="header-anchor" href="#padding" aria-hidden="true">#</a> padding</h4><ul><li>padding: auto | length</li><li>padding-top: auto | length</li><li>padding-right: auto | length</li><li>padding-bottom: auto | length</li><li>padding-left: auto | length</li></ul><h4 id="border" tabindex="-1"><a class="header-anchor" href="#border" aria-hidden="true">#</a> border</h4><h5 id="四边" tabindex="-1"><a class="header-anchor" href="#四边" aria-hidden="true">#</a> 四边</h5><ul><li>border: border-width || border-style || border-color</li><li>border-top: border-width || border-style || border-color</li><li>border-right: border-width || border-style || border-color</li><li>border-bottom: border-width || border-style || border-color</li><li>border-left: border-width || border-style || border-color</li></ul><h5 id="边宽" tabindex="-1"><a class="header-anchor" href="#边宽" aria-hidden="true">#</a> 边宽</h5><ul><li>border-width: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset</li><li>border-top-width: medium | thin | thick | length</li><li>border-right-width: medium | thin | thick | length</li><li>border-bottom-width: medium | thin | thick | length</li><li>border-left-width: medium | thin | thick | length</li></ul><h5 id="边样式" tabindex="-1"><a class="header-anchor" href="#边样式" aria-hidden="true">#</a> 边样式</h5><ul><li>border-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset</li><li>border-top-style: border-width || border-style || border-color</li><li>border-right-style: border-width || border-style || border-color</li><li>border-bottom-style: border-width || border-style || border-color</li><li>border-left-style: border-width || border-style || border-color</li></ul><h5 id="边颜色" tabindex="-1"><a class="header-anchor" href="#边颜色" aria-hidden="true">#</a> 边颜色</h5><ul><li>border-color: color</li><li>border-top-color: color</li><li>border-right-color: color</li><li>border-bottom-color: color</li><li>border-left-color: color</li></ul><h5 id="边圆角" tabindex="-1"><a class="header-anchor" href="#边圆角" aria-hidden="true">#</a> 边圆角</h5><ul><li>border-radius: length</li></ul><h5 id="外边线" tabindex="-1"><a class="header-anchor" href="#外边线" aria-hidden="true">#</a> 外边线</h5><ul><li>outline: outline-color || outline-style || outline-width</li><li>list-style: list-style-image || list-style-position || list-style-type</li></ul><h5 id="其他边" tabindex="-1"><a class="header-anchor" href="#其他边" aria-hidden="true">#</a> 其他边</h5><ul><li>table-layout: auto | fixed</li><li>caption-side: top | right | bottom | left</li><li>border-collapse: separate | collapse</li><li>border-spacing: length</li><li>empty-cells: show | hide</li></ul><h3 id="字体类" tabindex="-1"><a class="header-anchor" href="#字体类" aria-hidden="true">#</a> 字体类</h3><ul><li>font: caption | icon | menu | message-box | small-caption | status-bar</li><li>font-family: fantasy | serif | sans-serif</li><li>font-size: xx-small | x-small | small | medium | large | x-large | xx-large | larger | smaller | length</li><li>line-height: normal | length</li><li>font-weight: normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900</li><li>text-align: left | right | center | justify</li><li>text-indent: length</li><li>text-transform: none | capitalize | uppercase | lowercase</li><li>text-decoration: none || underline || blink || overline || line-through</li><li>letter-spacing: normal | length</li><li>word-spacing: normal | length</li><li>white-space: normal | pre | nowrap</li><li>vertical-align: auto | baseline | sub | super | top | text-top | middle | bottom | text-bottom | length</li><li>color: color</li></ul><h3 id="背景类" tabindex="-1"><a class="header-anchor" href="#背景类" aria-hidden="true">#</a> 背景类</h3><ul><li>background: background-color || background-image || background-repeat || background-attachment || background-position</li><li>background-color: transparent | color</li><li>background-image: none | url ( url )</li><li>background-repeat: repeat | no-repeat | repeat-x | repeat-y</li><li>background-position: length || length || position</li></ul><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3><ul><li>opacity: 0-1</li><li>cursor: auto | all-scroll | col-resize| crosshair | default | hand | move | help | no-drop | not-allowed | pointer | progress | row-resize | text | vertical-text | wait | *-resize | url ( url )</li><li>content: attr(alt) | counter(name) | counter(name , list-style-type) | counters(name , string) | counters(name , string , list-style-type) | no-close-quote | no-open-quote | close-quote | open-quote | string | url(url)</li><li>quotes: none | string</li></ul>`,48);function b(p,g){return a(),r("div",null,[d,s,h,c,t(" more "),u])}const x=l(n,[["render",b],["__file","css-style-ruler.html.vue"]]);export{x as default};
