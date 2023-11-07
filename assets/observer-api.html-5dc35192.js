import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t,b as e,d as p}from"./app-df8a1deb.js";const o={},c=e("p",null,"Observer API（观察者API）释放了Web隐藏的超能力，以创建真正的响应式体验，从懒加载关键内容到非侵入式性能监控。 在检测变化方面非常方便，可以用来创建响应式应用。",-1),i=p(`<p>有四种不同类型的观察者可以观察不同的东西——从DOM到浏览器性能。</p><h1 id="mutationobserver" tabindex="-1"><a class="header-anchor" href="#mutationobserver" aria-hidden="true">#</a> MutationObserver</h1><p>MutationObserver观察DOM树，监听DOM的变化。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 选择要观察突变的节点</span>
<span class="token keyword">const</span> targetNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;element&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 观察者的选项（观察哪些突变）</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">attributes</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">childList</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">subtree</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建一个观察者实例，链接到一个回调，以便在观察到突变时执行。</span>
<span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">mutations<span class="token punctuation">,</span> observer</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  mutations<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">mutation</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mutation<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&#39;childList&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;A child node has been added or removed.&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>mutation<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&#39;attributes&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">The </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>mutation<span class="token punctuation">.</span>attributeName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> attribute was modified.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 开始观察目标节点的配置突变情况</span>
observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>targetNode<span class="token punctuation">,</span> config<span class="token punctuation">)</span>

<span class="token comment">// 之后，你可以停止观察</span>
observer<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当一个元素的属性、文本或内容发生变化时，我们会得到通知，同时也会监控子节点是否被添加或删除。</p><p>这对于调整DOM中元素的大小以及重置DOM值特别有用。</p><h1 id="intersectionobserver" tabindex="-1"><a class="header-anchor" href="#intersectionobserver" aria-hidden="true">#</a> IntersectionObserver</h1><p>IntersectionObserver观察一个DOM元素的可见性，监听其位置的变化。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 选择要观察突变的节点</span>
<span class="token keyword">const</span> targetNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;element&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 观察者的选项（观察哪些突变）</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rootMargin</span><span class="token operator">:</span> <span class="token string">&#39;-100% 0px 0px 0px&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建一个观察者实例，链接到一个回调，以便在观察到突变时执行。</span>
<span class="token keyword">const</span> intersectionObserver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">entries<span class="token punctuation">,</span> observer</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>isIntersecting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Observing.&#39;</span><span class="token punctuation">)</span>

      <span class="token comment">// 之后，你可以停止观察</span>
      observer<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>target<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 开始观察</span>
intersectionObserver<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>targetNode<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这在基于目标元素的可见性和位置的懒惰加载和动画内容方面非常有用。</p><h1 id="resizeobserver" tabindex="-1"><a class="header-anchor" href="#resizeobserver" aria-hidden="true">#</a> ResizeObserver</h1><p>ResizeObserver观察元素的内容或边框，监听元素及其子元素的变化。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 选择要观察突变的节点</span>
<span class="token keyword">const</span> targetNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;element&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> resizeObserver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ResizeObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">entries<span class="token punctuation">,</span> observer</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Element size: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>entry<span class="token punctuation">.</span>width<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px x </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>entry<span class="token punctuation">.</span>height<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Element padding: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>entry<span class="token punctuation">.</span>top<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px ; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>entry<span class="token punctuation">.</span>left<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>

    <span class="token comment">// 之后，你可以停止观察</span>
    observer<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>target<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 开始观察</span>
resizeObserver<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>targetNode<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建基于输入或触发器包装的动态内容时，此观察者非常重要。</p><h1 id="performanceobserver" tabindex="-1"><a class="header-anchor" href="#performanceobserver" aria-hidden="true">#</a> PerformanceObserver</h1><p>PerformanceObserver观察性能测量事件，监听新的性能条目。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 观察者的选项（观察哪些突变）</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entryTypes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;resource&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;mark&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;measure&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token parameter">list</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在控制台上显示每个报告的测量</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Name: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>entry<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Type: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>entry<span class="token punctuation">.</span>entryType<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Start: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>entry<span class="token punctuation">.</span>startTime<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Duration: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>entry<span class="token punctuation">.</span>duration<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 开始观察</span>
observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
performance<span class="token punctuation">.</span><span class="token function">mark</span><span class="token punctuation">(</span><span class="token string">&#39;registered-observer&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这对于接收性能通知很有用，可以在空闲时间运行，而不与关键的渲染工作竞争。</p>`,18);function l(u,r){return s(),a("div",null,[c,t(" more "),i])}const v=n(o,[["render",l],["__file","observer-api.html.vue"]]);export{v as default};
