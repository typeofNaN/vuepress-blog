import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as t,c as r,a as l,d as e,f as s,b as c,e as n}from"./app-154f1c07.js";const m={},p=e("p",null,"通过pm2能守护node.js程序永远在线，在实际应用中是非常有必要的。另外，pm2配合keymetrics能实时监控node.js程序的运行，达到监控node.js程序的目的。",-1),o=n(`<h2 id="安装pm2" tabindex="-1"><a class="header-anchor" href="#安装pm2" aria-hidden="true">#</a> 安装pm2</h2><p>pm2可以使我们的node.js或io.js程序永远在线。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> pm2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="启动一个node-js程序" tabindex="-1"><a class="header-anchor" href="#启动一个node-js程序" aria-hidden="true">#</a> 启动一个node.js程序</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入到app的目录去启动</span>
pm2 start index.js <span class="token parameter variable">--name</span> <span class="token string">&#39;appName&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>pm2 其他常用命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看pm2守护的app</span>
pm2 list

<span class="token comment"># 或者</span>
pm2 status

<span class="token comment"># 重启，restart后面跟--name后面指定的名字</span>
pm2 restart ghost

<span class="token comment"># 查看进程的使用资源情况</span>
pm2 monit

<span class="token comment"># 查看log</span>
pm2 logs ghost

<span class="token comment"># 查看app的更多详细信息，后面跟id</span>
pm2 describe <span class="token number">1</span>

<span class="token comment"># 升级pm2，升级完毕后自动加载之前运行中的所有app</span>
<span class="token function">npm</span> <span class="token function">install</span> pm2@latest <span class="token parameter variable">-g</span>
pm2 updatePM2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用Keymetrics可以配合pm2来监控node.js程序（也支持io.js程序的监控）。</p><h2 id="安装keymetrics" tabindex="-1"><a class="header-anchor" href="#安装keymetrics" aria-hidden="true">#</a> 安装Keymetrics</h2>`,9),v={href:"https://app.keymetrics.io/#/register",target:"_blank",rel:"noopener noreferrer"},u=n(`<p>登录后，通过new bucket新建，然后进入控制面板，可以看到分配的public key 和secret key。然后，在安装有pm2的服务器端输入以下命令:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 interact your-secret-key your-public-key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>监控成功后，会有类似下面的提示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Keymetrics.io] [Agent created] Agent ACTIVE - Web Access: https://app.keymetrics.io/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时，pm2会把收集到的统计信息实时地推送到Keymetrics，我们可以在Keymetrics的后台中实时地查看到node.js程序的运行信息，其中还有一些快捷操作，如重启node.js程序等。</p>`,5);function b(h,k){const a=d("ExternalLinkIcon");return t(),r("div",null,[p,l(" more "),o,e("p",null,[s("首先需要注册Keymetrics："),e("a",v,[s("Keymetrics"),c(a)])]),u])}const y=i(m,[["render",b],["__file","keymetrics.html.vue"]]);export{y as default};
