---
title: 登录两步验证
date: 2026-11-18
category: 技术文章
tag:
  - 2fa
---

登录两步验证（2FA，Two-Factor Authentication），就是用户在完成账号密码验证后，还需要进行第二次身份验证，验证通过后才允许正式登录系统。

如果你是要在自己开发的网站、APP 或管理后台中接入两步验证，可以采用以下几种方案。

<!-- more -->

## **一、常见的两步验证方案**

| 验证方式               | 实现难度 | 使用成本 | 安全性 |
| ------------------ | ---- | ---- | --- |
| 邮箱验证码              | 低    | 较低   | 一般  |
| 手机短信验证码            | 低    | 按条收费 | 一般  |
| TOTP 动态验证码         | 中    | 免费   | 较高  |
| Passkey / WebAuthn | 较高   | 免费   | 高   |
| APP 登录确认           | 高    | 较低   | 较高  |

**比较推荐使用 TOTP 动态验证码方案。**

例如 GitHub、AWS 等平台支持的身份验证器验证码，就是基于这种方式实现的。

用户可以使用 Google Authenticator、Microsoft Authenticator、2FAS 等身份验证器，也可以使用支持验证码功能的密码管理器。不需要接入这些 APP 的 API，也不需要为每次验证付费。

## **二、完整的业务流程**

**首次绑定两步验证：**

``` mermaid
flowchart TD
    A[用户登录并进入账号安全设置] --> B[服务端生成随机 Secret]
    B --> C[前端展示绑定二维码]
    C --> D[用户使用身份验证器扫码]
    D --> E[用户输入6位动态验证码]
    E --> F{服务端校验验证码}
    F -->|验证失败| E
    F -->|验证成功| G[加密存储 Secret]
    G --> H[正式开启2FA]
    H --> I[生成并展示恢复码]
```

**开启之后的登录流程：**

``` mermaid
flowchart TD
    A[用户输入账号密码] --> B{服务端验证账号密码}
    B -->|验证失败| A
    B -->|验证成功| C{是否开启2FA}
    C -->|否| H[签发正式 Token]
    C -->|是| D[签发临时 Token]
    D --> E[进入二次验证页面]
    E --> F[输入6位动态验证码]
    F --> G{服务端校验验证码}
    G -->|验证失败| F
    G -->|验证成功| J[使临时 Token 失效]
    J --> H
    H --> I[登录成功]
```

这里有一个非常重要的地方：**账号密码验证成功后，如果用户开启了2FA，不能直接返回正式的 Access Token，而应该返回一个仅用于二次验证的临时凭证。**

## **三、代码实现（Vue3 + NestJS）**

下面以你比较熟悉的 Vue3 + NestJS 技术栈为例，采用自建 JWT 登录体系。

### **1. 安装依赖**

服务端安装：

``` sh
pnpm add otplib@13 qrcode
pnpm add -D @types/qrcode
```

- `otplib`：生成 Secret、验证动态验证码。
- `qrcode`：生成二维码。

这里使用 otplib v13 的 API，与网上很多 v12 的教程有所不同。

### **2. 数据库新增字段**

在用户表中添加以下字段：

``` sql
ALTER TABLE users
ADD COLUMN two_factor_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN two_factor_secret VARCHAR(512) DEFAULT NULL,
ADD COLUMN two_factor_last_step BIGINT DEFAULT NULL;
```

| 字段                   | 作用        |
| -------------------- | --------- |
| two_factor_enabled   | 是否开启两步验证  |
| two_factor_secret    | 加密后的密钥    |
| two_factor_last_step | 防止验证码重复使用 |

### **3. 服务端封装 2FA Service**

`two-factor.service.ts`

``` ts
import { Injectable } from '@nestjs/common';
import {
  generateSecret,
  generateURI,
  verify,
} from 'otplib';
import * as QRCode from 'qrcode';

@Injectable()
export class TwoFactorService {
  async generate(email: string) {
    const secret = generateSecret();

    const uri = generateURI({
      issuer: 'typeofNaN',
      label: email,
      secret,
    });

    const qrCode = await QRCode.toDataURL(uri);

    return {
      secret,
      qrCode,
    };
  }

  async verify(secret: string, code: string) {
    if (!/^\d{6}$/.test(code)) {
      return false;
    }

    const result = await verify({
      secret,
      token: code,
      epochTolerance: 30,
    });

    return result.valid;
  }
}
```

`issuer` 就是用户扫码后，在 Google Authenticator 中显示的平台名称。

### **4. 生成绑定二维码接口**

``` ts
@Post('2fa/setup')
@UseGuards(JwtAuthGuard)
async setup(@Req() req) {
  const user = req.user;

  const { secret, qrCode } =
    await this.twoFactorService.generate(user.email);

  // 将密钥加密后暂存，设置有效期
  await this.cacheService.set(
    `2fa:setup:${user.id}`,
    this.cryptoService.encrypt(secret),
    600,
  );

  return {
    qrCode,
    secret, // 用于用户手动绑定
  };
}
```

此时不要直接开启 2FA，必须等用户首次输入验证码并验证成功后再开启。

该接口应要求用户近期完成过身份验证，已经开启2FA的用户不能直接通过该接口覆盖原有密钥。

### **5. 前端展示二维码**

Vue3 示例：

``` html
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const qrCode = ref('')
const secret = ref('')
const code = ref('')

async function setup() {
  const { data } = await axios.post('/auth/2fa/setup')

  qrCode.value = data.qrCode
  secret.value = data.secret
}

async function enable() {
  await axios.post('/auth/2fa/enable', {
    code: code.value,
  })

  alert('两步验证开启成功')
}
</script>

<template>
  <button @click="setup">
    开启两步验证
  </button>

  <div v-if="qrCode">
    <img :src="qrCode" />

    <p>请使用身份验证器扫描二维码</p>

    <p>手动绑定密钥：{{ secret }}</p>

    <input
      v-model="code"
      inputmode="numeric"
      maxlength="6"
      placeholder="请输入6位验证码"
    />

    <button @click="enable">
      确认开启
    </button>
  </div>
</template>
```

### **6. 确认开启两步验证**

``` ts
@Post('2fa/enable')
@UseGuards(JwtAuthGuard)
async enable(@Req() req, @Body('code') code: string) {
  const userId = req.user.id;

  const encryptedSecret = await this.cacheService.get(
    `2fa:setup:${userId}`,
  );

  if (!encryptedSecret) {
    throw new BadRequestException('绑定已过期');
  }

  const secret =
    this.cryptoService.decrypt(encryptedSecret);

  const valid = await this.twoFactorService.verify(
    secret,
    code,
  );

  if (!valid) {
    throw new BadRequestException('验证码错误');
  }

  await this.userService.update(userId, {
    twoFactorEnabled: true,
    twoFactorSecret: encryptedSecret,
  });

  await this.cacheService.del(`2fa:setup:${userId}`);

  return {
    success: true,
  };
}
```

### **7. 修改原有登录接口**

``` ts
@Post('login')
async login(@Body() dto: LoginDto) {
  const user = await this.authService.validateUser(
    dto.email,
    dto.password,
  );

  if (user.twoFactorEnabled) {
    const tempToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        purpose: '2fa',
      },
      {
        expiresIn: '5m',
        audience: '2fa',
      },
    );

    return {
      require2FA: true,
      tempToken,
    };
  }

  return {
    require2FA: false,
    accessToken: await this.authService.signToken(user),
  };
}
```

前端根据 `require2FA` 判断是否需要跳转至二次验证页面。

### **8. 二次验证登录接口**

``` ts
@Post('2fa/login')
async loginWith2FA(@Body() dto: TwoFactorLoginDto) {
  const payload = await this.jwtService.verifyAsync(
    dto.tempToken,
    {
      audience: '2fa',
    },
  );

  if (payload.purpose !== '2fa') {
    throw new UnauthorizedException();
  }

  const user = await this.userService.findById(
    payload.sub,
  );

  if (!user?.twoFactorEnabled) {
    throw new UnauthorizedException();
  }

  const secret = this.cryptoService.decrypt(
    user.twoFactorSecret,
  );

  const valid = await this.twoFactorService.verify(
    secret,
    dto.code,
  );

  if (!valid) {
    throw new UnauthorizedException('验证码错误');
  }

  return {
    accessToken: await this.authService.signToken(user),
  };
}
```

以上是核心逻辑示例，省略了 DTO 定义、依赖注入、缓存实现、原子性校验以及限流等代码，不能直接作为完整的生产环境认证模块使用。

## **四、完整的接口设计**

| 请求方式 | 接口                              | 用途      |
| ---- | ------------------------------- | ------- |
| POST | `/auth/login`                   | 普通登录    |
| POST | `/auth/2fa/setup`               | 生成二维码   |
| POST | `/auth/2fa/enable`              | 开启2FA   |
| POST | `/auth/2fa/login`               | 二次验证登录  |
| POST | `/auth/2fa/disable`             | 关闭2FA   |
| GET  | `/auth/2fa/status`              | 获取开启状态  |
| POST | `/auth/2fa/recovery`            | 恢复码登录   |
| POST | `/auth/2fa/recovery/regenerate` | 重新生成恢复码 |

## **五、如果用户手机丢失了怎么办？**

需要实现 Recovery Codes（恢复码）机制。

在用户首次开启2FA时，生成10组随机恢复码，让用户自行保存。当用户无法使用身份验证器时，可以通过恢复码进行登录。

恢复码应该使用安全随机数生成，数据库只保存其哈希值，每组恢复码只能使用一次，重新生成后原有恢复码全部失效。

## **六、上线前需要注意的安全问题**

- **密钥加密**：Secret 使用 AES-256-GCM 等方式加密存储，加密密钥独立保管。
- **防止暴力破解**：例如连续输错5次，限制验证5分钟，并对账号、IP进行限流。
- **防止重复验证**：记录已使用的 TOTP 时间步，通过数据库原子操作防止重复使用。
- **临时 Token 隔离**：普通业务接口必须拒绝2FA临时 Token，临时凭证验证成功后应立即失效。
- **关闭2FA**：必须重新验证身份，不能仅凭当前登录 Token 关闭。
- **时间同步**：保持服务器时间准确。
- **防止绕过**：Google、Apple、Facebook 等其他登录入口也需要执行相同的2FA策略。

相关开源库：[otplib](https://github.com/yeojz/otplib?utm_source=chatgpt.com) · [node-qrcode](https://github.com/soldair/node-qrcode?utm_source=chatgpt.com)
