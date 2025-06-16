import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as p,d as e,e as t}from"./app-a5aaa6db.js";const o={},i=e("p",null,"微信小程序提供了支持 Wi-Fi 功能的多个 Api 接口。",-1),c=t(`<p>最近项目中需要使用 Wi-Fi 相关功能。总结一下微信小程序 Wi-Fi 的使用方法，以及遇到的一些问题。</p><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2><h3 id="连接-wi-fi" tabindex="-1"><a class="header-anchor" href="#连接-wi-fi" aria-hidden="true">#</a> 连接 Wi-Fi</h3><ol><li>初始化 Wi-Fi：<code>wx.startWifi()</code></li><li>连接 Wi-Fi：<code>wx.connectWifi()</code></li></ol><h3 id="获取-wi-fi-列表" tabindex="-1"><a class="header-anchor" href="#获取-wi-fi-列表" aria-hidden="true">#</a> 获取 Wi-Fi 列表</h3><h4 id="ios" tabindex="-1"><a class="header-anchor" href="#ios" aria-hidden="true">#</a> iOS</h4><ol><li>初始化 Wi-Fi：<code>wx.startWifi()</code></li><li>请求获取 Wi-Fi 列表：<code>wx.getWifiList()</code></li><li>监听获取到 Wi-Fi 列表数据事件：<code>wx.onGetWifiList()</code></li><li>连接 Wi-Fi：<code>wx.connectWifi()</code></li></ol><h4 id="android" tabindex="-1"><a class="header-anchor" href="#android" aria-hidden="true">#</a> Android</h4><ol><li>初始化 Wi-Fi：<code>wx.startWifi()</code></li><li>授权用户地理位置：<code>scope.userLocation</code></li><li>请求获取 Wi-Fi 列表：<code>wx.getWifiList()</code></li><li>监听获取到 Wi-Fi 列表数据事件：<code>wx.onGetWifiList()</code></li><li>连接 Wi-Fi：<code>wx.connectWifi()</code></li></ol><h2 id="实现代码" tabindex="-1"><a class="header-anchor" href="#实现代码" aria-hidden="true">#</a> 实现代码</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">Page</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">wifiInfo</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token constant">SSID</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
      <span class="token constant">BSSID</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 检测手机型号</span>
    wx<span class="token punctuation">.</span><span class="token function">getSystemInfo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> platform<span class="token punctuation">,</span> system <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> systemVersion <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>platform <span class="token operator">===</span> <span class="token string">&#39;android&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          systemVersion <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>system<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>platform <span class="token operator">===</span> <span class="token string">&#39;ios&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          systemVersion <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>system<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>platform <span class="token operator">===</span> <span class="token string">&#39;ios&#39;</span> <span class="token operator">&amp;&amp;</span> systemVersion <span class="token operator">&lt;</span> <span class="token number">11.2</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>platform <span class="token operator">===</span> <span class="token string">&#39;android&#39;</span> <span class="token operator">&amp;&amp;</span> systemVersion <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;手机版本不支持！&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">startWifi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">startWifi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;WIFI连接中...&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    wx<span class="token punctuation">.</span><span class="token function">startWifi</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">connectWifi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;接口调用失败！&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">connectWifi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    wx<span class="token punctuation">.</span><span class="token function">connectWifi</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>wifiInfo<span class="token punctuation">,</span>
      <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;WIFI连接成功！&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> errCode <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> errMsg <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>errCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">case</span> <span class="token number">12000</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;未初始化WIFI模块！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12001</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;当前系统不支持相关能力！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12002</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;WIFI密码错误！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12003</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;连接超时！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12004</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;当前WIFI已连接，请勿重复链接WIFI！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12005</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;您未打开WIFI开关，请先到设置中打开WIFI开关！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12006</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;您未打开GPS定位开关，请先到设置中打开！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12007</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;您拒绝了授权链接WIFI！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12008</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;无效的SSID！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12009</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;系统运营商配置拒绝连接WIFI！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12010</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;系统错误！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12011</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;应用在后台无法配置WIFI！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12013</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;系统保存的WIFI配置过期！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">case</span> <span class="token number">12014</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;无效的 WEP / WPA 密码！&#39;</span>
            <span class="token keyword">break</span>
          <span class="token keyword">default</span><span class="token operator">:</span>
            errMsg <span class="token operator">=</span> <span class="token string">&#39;WIFI连接失败，请尝试在设置中手动连接！&#39;</span>
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        wx<span class="token punctuation">.</span><span class="token function">showToast</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">title</span><span class="token operator">:</span> errMsg<span class="token punctuation">,</span>
          <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function l(r,u){return s(),a("div",null,[i,p(" more "),c])}const v=n(o,[["render",l],["__file","connect-wifi.html.vue"]]);export{v as default};
