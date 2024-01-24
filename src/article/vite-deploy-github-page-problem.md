---
title: 将 vite 项目部署到 Github Page 的资源404问题
date: 2024-01-24 15:39:49
category: 技术文章
tag:
    - vite
    - Github Page
---

最近将一个 `vite` 项目部署到 `Github Page` 上进行访问时，发现打包生成的`_plugin-vue_export-helper.js` 文件访问不到，网络请求显示404。

<!-- more -->

## 原因

`Github Pages` 阻止了以下划线字符结尾的文件，所以会导致这个文件拜访返回404。

## 解决方案

修改配置 vite.config.ts，重写打包的方案：

``` ts
export default defineConfig({
  build: {
    reportCompressedSize: false,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: false
    },
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 2000, // 解决包大小超过500kb的正告
    rollupOptions: {
      output: {
        manualChunks: {},
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // 解决文件名中的非法字符
        sanitizeFileName: (name) => {
          const match = DRIVE_LETTER_REGEX.exec(name)
          const driveLetter = match ? match[0] : ''
          return (
            driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
          )
        }
      }
    }
  }
})
```