---
title: Git 提交规范
date: 2018-11-13
category: 技术文章
tag:
    - Git
---

本文简述一下 Git 的提交规范。

<!-- more -->

## Git 代码规范

Git 每次提交代码，都是需要写 `Commit message`（提交说明）。一般 `Commit message` 的格式包含三个部分：

```
Header -----必填
  type ---必需
  scope --- 可选
  subject ---必需
Body ---- 可省略
Footer ---- 可省略
```

提交遵循原子性提交原则：每次尽可能最小量提交，仅包含一个不可分割的基本特性、问题修复或者优化提升，以便于code review / rollback / modification。

在实际提交实践的过程中，大部分时候仅包含了 `Herder`，提交最简、最重要的消息，即：

`Header` = 【`Type`】+【`Subject`】

### Type

* `feat`：提交新功能
* `fix`：修复了bug
* `docs`：只修改了文档
* `style`：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
* `refactor`：代码重构，既没修复bug也没有添加新功能
* `perf`：性能优化，提高性能的代码更改
* `test`：添加或修改代码测试
* `chore`：对构建流程或辅助工具和依赖库（如文档生成等）的更改
* `revert`: 回滚到上一版本

### Subject

标题是对变更的简明描述，三个注意点：

1. 使用祈使句，现在时态
2. 不要大写首字母
3. 结尾不要使用句号

### Body

正文是对标题的补充，不是必须的，其包含更详细的信息，如代码修改的动机、方式、与修改前的代码对比等等。

### Footer

注脚，通常是BREAKING CHANGE 或修复bug的链接。
