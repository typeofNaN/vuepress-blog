import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as d,c as i,a as o,d as c,e as a}from"./app-6bdd7319.js";const r={},t=c("p",null,"本文简述一下 Git 的提交规范。",-1),l=a(`<h2 id="git-代码规范" tabindex="-1"><a class="header-anchor" href="#git-代码规范" aria-hidden="true">#</a> Git 代码规范</h2><p>Git 每次提交代码，都是需要写 <code>Commit message</code>（提交说明）。一般 <code>Commit message</code> 的格式包含三个部分：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Header -----必填
  type ---必需
  scope --- 可选
  subject ---必需
Body ---- 可省略
Footer ---- 可省略
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提交遵循原子性提交原则：每次尽可能最小量提交，仅包含一个不可分割的基本特性、问题修复或者优化提升，以便于code review / rollback / modification。</p><p>在实际提交实践的过程中，大部分时候仅包含了 <code>Herder</code>，提交最简、最重要的消息，即：</p><p><code>Header</code> = 【<code>Type</code>】+【<code>Subject</code>】</p><h3 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> Type</h3><ul><li><code>feat</code>：提交新功能</li><li><code>fix</code>：修复了bug</li><li><code>docs</code>：只修改了文档</li><li><code>style</code>：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）</li><li><code>refactor</code>：代码重构，既没修复bug也没有添加新功能</li><li><code>perf</code>：性能优化，提高性能的代码更改</li><li><code>test</code>：添加或修改代码测试</li><li><code>chore</code>：对构建流程或辅助工具和依赖库（如文档生成等）的更改</li><li><code>revert</code>: 回滚到上一版本</li></ul><h3 id="subject" tabindex="-1"><a class="header-anchor" href="#subject" aria-hidden="true">#</a> Subject</h3><p>标题是对变更的简明描述，三个注意点：</p><ol><li>使用祈使句，现在时态</li><li>不要大写首字母</li><li>结尾不要使用句号</li></ol><h3 id="body" tabindex="-1"><a class="header-anchor" href="#body" aria-hidden="true">#</a> Body</h3><p>正文是对标题的补充，不是必须的，其包含更详细的信息，如代码修改的动机、方式、与修改前的代码对比等等。</p><h3 id="footer" tabindex="-1"><a class="header-anchor" href="#footer" aria-hidden="true">#</a> Footer</h3><p>注脚，通常是BREAKING CHANGE 或修复bug的链接。</p>`,15);function s(n,h){return d(),i("div",null,[t,o(" more "),l])}const p=e(r,[["render",s],["__file","git-commit-ruler.html.vue"]]);export{p as default};