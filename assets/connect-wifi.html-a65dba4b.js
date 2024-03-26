import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t,d as p,e}from"./app-938962e3.js";const o={},c=p("p",null,"微信小程序提供了支持 Wi-Fi 功能的多个 Api 接口。",-1),i=e(`<p>最近项目中需要使用 Wi-Fi 相关功能。总结一下微信小程序 Wi-Fi 的使用方法，以及遇到的一些问题。</p><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2><h3 id="连接-wi-fi" tabindex="-1"><a class="header-anchor" href="#连接-wi-fi" aria-hidden="true">#</a> 连接 Wi-Fi</h3><ol><li>初始化 Wi-Fi：<code>wx.startWifi()</code></li><li>连接 Wi-Fi：<code>wx.connectWifi()</code></li></ol><h3 id="获取-wi-fi-列表" tabindex="-1"><a class="header-anchor" href="#获取-wi-fi-列表" aria-hidden="true">#</a> 获取 Wi-Fi 列表</h3><h4 id="ios" tabindex="-1"><a class="header-anchor" href="#ios" aria-hidden="true">#</a> iOS</h4><ol><li>初始化 Wi-Fi：<code>wx.startWifi()</code></li><li>请求获取 Wi-Fi 列表：<code>wx.getWifiList()</code></li><li>监听获取到 Wi-Fi 列表数据事件：<code>wx.onGetWifiList()</code></li><li>连接 Wi-Fi：<code>wx.connectWifi()</code></li></ol><h4 id="android" tabindex="-1"><a class="header-anchor" href="#android" aria-hidden="true">#</a> Android</h4><ol><li>初始化 Wi-Fi：<code>wx.startWifi()</code></li><li>授权用户地理位置：<code>scope.userLocation</code></li><li>请求获取 Wi-Fi 列表：<code>wx.getWifiList()</code></li><li>监听获取到 Wi-Fi 列表数据事件：<code>wx.onGetWifiList()</code></li><li>连接 Wi-Fi：<code>wx.connectWifi()</code></li></ol><h2 id="实现代码" tabindex="-1"><a class="header-anchor" href="#实现代码" aria-hidden="true">#</a> 实现代码</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> platform<span class="token punctuation">;</span>
<span class="token keyword">var</span> wifiList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> callBackFunc<span class="token punctuation">;</span>

<span class="token comment">// 仅 Android 6 与 iOS 11 以上版本支持</span>
<span class="token keyword">function</span> <span class="token function">checkPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 检测手机型号</span>
    wx<span class="token punctuation">.</span><span class="token function">getSystemInfo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> system <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>platform <span class="token operator">==</span> <span class="token string">&#39;android&#39;</span><span class="token punctuation">)</span> system <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>system<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>platform <span class="token operator">==</span> <span class="token string">&#39;ios&#39;</span><span class="token punctuation">)</span> system <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>system<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>platform <span class="token operator">==</span> <span class="token string">&#39;android&#39;</span> <span class="token operator">&amp;&amp;</span> system <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>platform <span class="token operator">==</span> <span class="token string">&#39;ios&#39;</span> <span class="token operator">&amp;&amp;</span> system <span class="token operator">&lt;</span> <span class="token number">11</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        platform <span class="token operator">=</span> res<span class="token punctuation">.</span>platform
        <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>platform<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;请求失败&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">3000</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 1. 可直接使用该方法去连接 Wi-Fi</span>
<span class="token keyword">function</span> <span class="token function">startConnectWifi</span><span class="token punctuation">(</span><span class="token parameter">account<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    wx<span class="token punctuation">.</span><span class="token function">startWifi</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function">success</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">connectWifi</span><span class="token punctuation">(</span>account<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">fail</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;初始化WiFi失败&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">3000</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2. 可直接使用该方法去搜索 Wi-Fi</span>
<span class="token keyword">function</span> <span class="token function">startSearchWifi</span><span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  callBackFunc <span class="token operator">=</span> func
  <span class="token function">startWifi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 初始化 WiFi 模块</span>
<span class="token keyword">function</span> <span class="token function">startWifi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  wx<span class="token punctuation">.</span><span class="token function">startWifi</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">success</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">getWifiListFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">fail</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;初始化WiFi失败&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">3000</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 请求获取 WiFi 列表</span>
<span class="token keyword">function</span> <span class="token function">getWifiListFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>platform <span class="token operator">==</span> <span class="token string">&#39;ios&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">getWifiList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    wx<span class="token punctuation">.</span><span class="token function">getSetting</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function">success</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//地理位置</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>res<span class="token punctuation">.</span>authSetting<span class="token punctuation">[</span><span class="token string">&#39;scope.userLocation&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          wx<span class="token punctuation">.</span><span class="token function">authorize</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">scope</span><span class="token operator">:</span> <span class="token string">&#39;scope.userLocation&#39;</span><span class="token punctuation">,</span>
            <span class="token function">success</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token function">getWifiList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token function">fail</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              wx<span class="token punctuation">.</span><span class="token function">showModal</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;提示&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;定位失败，您未开启定位权限，点击开启定位权限&#39;</span><span class="token punctuation">,</span>
                <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>confirm<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    wx<span class="token punctuation">.</span><span class="token function">openSetting</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                      <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>authSetting<span class="token punctuation">[</span><span class="token string">&#39;scope.userLocation&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                          <span class="token function">getWifiList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                          wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;用户未开启地理位置权限&#39;</span><span class="token punctuation">,</span>
                            <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
                            <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">3000</span>
                          <span class="token punctuation">}</span><span class="token punctuation">)</span>
                        <span class="token punctuation">}</span>
                      <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">getWifiList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getWifiList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  wx<span class="token punctuation">.</span><span class="token function">getWifiList</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 监听获取到 WiFi 列表数据事件</span>
      wx<span class="token punctuation">.</span><span class="token function">onGetWifiList</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        wifiList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">let</span> tmpList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>res <span class="token operator">&amp;&amp;</span> res<span class="token punctuation">.</span>wifiList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          res<span class="token punctuation">.</span>wifiList<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>tmpList<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token constant">SSID</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              tmpList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token constant">SSID</span><span class="token punctuation">)</span>
              wifiList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token function">callBackFunc</span><span class="token punctuation">(</span>wifiList<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;获取 Wi-Fi 列表数据失败&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">3000</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 连接 WiFi。若已知 WiFi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持</span>
<span class="token keyword">function</span> <span class="token function">connectWifi</span><span class="token punctuation">(</span><span class="token parameter">account<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> wifiCount <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">let</span> wifiTimer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      wifiCount<span class="token operator">++</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>wifiCount <span class="token operator">&gt;=</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">clearInterval</span><span class="token punctuation">(</span>wifiTimer<span class="token punctuation">)</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

    <span class="token comment">// 获取当前网络的名称</span>
    <span class="token function">getConnectedWifi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span><span class="token constant">SSID</span> <span class="token operator">==</span> account<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">clearInterval</span><span class="token punctuation">(</span>wifiTimer<span class="token punctuation">)</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 值得注意的是：ios 无论连网成功还是失败，都会走 success 方法，所以 ios 需要特别判断一下</span>
        wx<span class="token punctuation">.</span><span class="token function">connectWifi</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token constant">SSID</span><span class="token operator">:</span> account<span class="token punctuation">,</span>
          <span class="token literal-property property">password</span><span class="token operator">:</span> password<span class="token punctuation">,</span>
          <span class="token function">success</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// ios 判断当前手机已连网账号与要连网的账号是否一致，来确定是否连网成功</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>platform <span class="token operator">==</span> <span class="token string">&#39;ios&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// 6.监听连接上 WiFi 的事件</span>
              wx<span class="token punctuation">.</span><span class="token function">onWifiConnected</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">clearInterval</span><span class="token punctuation">(</span>wifiTimer<span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>wifi<span class="token punctuation">.</span><span class="token constant">SSID</span> <span class="token operator">==</span> account<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                  <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span>

              <span class="token comment">// wx.getConnectedWifi({</span>
              <span class="token comment">//   success: res =&gt; {</span>
              <span class="token comment">//     clearInterval(wifiTimer)</span>
              <span class="token comment">//     if (res.wifi.SSID == account) {</span>
              <span class="token comment">//       console.log(&#39;ios getConnectedWifi成功..........&#39;, account)</span>
              <span class="token comment">//       resolve()</span>
              <span class="token comment">//     } else {</span>
              <span class="token comment">//       console.log(&#39;ios getConnectedWifi失败..........&#39;, account)</span>
              <span class="token comment">//       reject()</span>
              <span class="token comment">//     }</span>
              <span class="token comment">//   },</span>
              <span class="token comment">//   fail: res =&gt; {</span>
              <span class="token comment">//     clearInterval(wifiTimer)</span>
              <span class="token comment">//     reject(res)</span>
              <span class="token comment">//   }</span>
              <span class="token comment">// })</span>

            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token function">clearInterval</span><span class="token punctuation">(</span>wifiTimer<span class="token punctuation">)</span>
              <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token function">fail</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">clearInterval</span><span class="token punctuation">(</span>wifiTimer<span class="token punctuation">)</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">clearInterval</span><span class="token punctuation">(</span>wifiTimer<span class="token punctuation">)</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 获取当前网络的名称</span>
<span class="token keyword">function</span> <span class="token function">getConnectedWifi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    wx<span class="token punctuation">.</span><span class="token function">getConnectedWifi</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>wifi<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">checkPlatform</span><span class="token operator">:</span> checkPlatform<span class="token punctuation">,</span> <span class="token comment">// 检测平台是否支持</span>
  <span class="token literal-property property">startConnectWifi</span><span class="token operator">:</span> startConnectWifi<span class="token punctuation">,</span> <span class="token comment">// 开始连接已知网络</span>
  <span class="token literal-property property">startSearchWifi</span><span class="token operator">:</span> startSearchWifi<span class="token punctuation">,</span> <span class="token comment">// 开始搜索周边网络</span>
  <span class="token literal-property property">connectWifi</span><span class="token operator">:</span> connectWifi<span class="token punctuation">,</span> <span class="token comment">// 连接网络</span>
  <span class="token literal-property property">getConnectedWifi</span><span class="token operator">:</span> getConnectedWifi <span class="token comment">// 获取当前网络的名称</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function l(u,r){return s(),a("div",null,[c,t(" more "),i])}const v=n(o,[["render",l],["__file","connect-wifi.html.vue"]]);export{v as default};
