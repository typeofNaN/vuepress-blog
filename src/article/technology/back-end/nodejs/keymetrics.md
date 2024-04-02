---
title: 使用keymetrics实时监控Node.js程序
date: 2023-02-16
category: 技术文章
tag:
    - keymetrics
    - Node.js
    - pm2
---

通过pm2能守护node.js程序永远在线，在实际应用中是非常有必要的。另外，pm2配合keymetrics能实时监控node.js程序的运行，达到监控node.js程序的目的。

<!-- more -->

## 安装pm2

pm2可以使我们的node.js或io.js程序永远在线。

``` sh
npm install -g pm2
```

## 启动一个node.js程序

``` sh
# 进入到app的目录去启动
pm2 start index.js --name <appName>
```

pm2 其他常用命令

``` sh
# 查看pm2守护的app
pm2 list

# 或者
pm2 status

# 重启，restart后面跟--name后面指定的名字
pm2 restart <appName>

# 查看进程的使用资源情况
pm2 monit

# 查看log
pm2 logs <appName>

# 查看app的更多详细信息，后面跟id
pm2 describe 1

# 升级pm2，升级完毕后自动加载之前运行中的所有app
npm install pm2@latest -g
pm2 updatePM2
```

使用Keymetrics可以配合pm2来监控node.js程序（也支持io.js程序的监控）。

## 安装Keymetrics

<!-- 首先需要注册Keymetrics：[Keymetrics](https://app.keymetrics.io/#/register) -->
首先需要注册Keymetrics：[Keymetrics](https://pm2.io/)

登录后，通过`new bucket`新建，然后进入控制面板，可以看到分配的`public key` 和`secret key`。然后，在安装有pm2的服务器端输入以下命令:

<!-- pm2 interact your-secret-key your-public-key -->

``` sh
pm2 link your-secret-key your-public-key
```

监控成功后，会有类似下面的提示：

```
[Keymetrics.io] [Agent created] Agent ACTIVE - Web Access: https://app.keymetrics.io/
```

此时，pm2会把收集到的统计信息实时地推送到Keymetrics，我们可以在Keymetrics的后台中实时地查看到node.js程序的运行信息，其中还有一些快捷操作，如重启node.js程序等。
