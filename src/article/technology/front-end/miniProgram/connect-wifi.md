---
title: 微信小程序连接WIFI
date: 2022-09-10
category: 技术文章
tag:
    - MiniProgram
    - 微信小程序
---

微信小程序提供了支持 Wi-Fi 功能的多个 Api 接口。

<!-- more -->

最近项目中需要使用 Wi-Fi 相关功能。总结一下微信小程序 Wi-Fi 的使用方法，以及遇到的一些问题。

## 使用方法

### 连接 Wi-Fi

1. 初始化 Wi-Fi：`wx.startWifi()`
2. 连接 Wi-Fi：`wx.connectWifi()`

### 获取 Wi-Fi 列表

#### iOS

1. 初始化 Wi-Fi：`wx.startWifi()`
2. 请求获取 Wi-Fi 列表：`wx.getWifiList()`
3. 监听获取到 Wi-Fi 列表数据事件：`wx.onGetWifiList()`
4. 连接 Wi-Fi：`wx.connectWifi()`

#### Android

1. 初始化 Wi-Fi：`wx.startWifi()`
2. 授权用户地理位置：`scope.userLocation`
3. 请求获取 Wi-Fi 列表：`wx.getWifiList()`
4. 监听获取到 Wi-Fi 列表数据事件：`wx.onGetWifiList()`
5. 连接 Wi-Fi：`wx.connectWifi()`

## 实现代码

``` js
Page({
  data: {
    wifiInfo: {
      SSID: '',
      BSSID: '',
      password: ''
    }
  },

  connect() {
    // 检测手机型号
    wx.getSystemInfo({
      success: ({ platform, system }) => {
        let systemVersion = 0
        if (platform === 'android') {
          systemVersion = parseInt(system.substr(8))
        } else if (platform === 'ios') {
          systemVersion = parseInt(system.substr(4))
        }

        if ((platform === 'ios' && systemVersion < 11.2) || (platform === 'android' && systemVersion < 6)) {
          wx.showToast({
            title: '手机版本不支持！',
            icon: 'none'
          })
          return
        }
        this.startWifi()
      }
    })
  },

  startWifi() {
    wx.showToast({
      title: 'WIFI连接中...',
      icon: 'none'
    })
    wx.startWifi({
      success: () => {
        this.connectWifi()
      },
      fail: () => {
        wx.showToast({
          title: '接口调用失败！',
          icon: 'none'
        })
      }
    })
  },

  connectWifi() {
    wx.connectWifi({
      ...this.data.wifiInfo,
      success: () => {
        wx.showToast({
          title: 'WIFI连接成功！',
          icon: 'none'
        })
      },
      fail: ({ errCode }) => {
        let errMsg = ''
        switch (errCode) {
          case 12000:
            errMsg = '未初始化WIFI模块！'
            break
          case 12001:
            errMsg = '当前系统不支持相关能力！'
            break
          case 12002:
            errMsg = 'WIFI密码错误！'
            break
          case 12003:
            errMsg = '连接超时！'
            break
          case 12004:
            errMsg = '当前WIFI已连接，请勿重复链接WIFI！'
            break
          case 12005:
            errMsg = '您未打开WIFI开关，请先到设置中打开WIFI开关！'
            break
          case 12006:
            errMsg = '您未打开GPS定位开关，请先到设置中打开！'
            break
          case 12007:
            errMsg = '您拒绝了授权链接WIFI！'
            break
          case 12008:
            errMsg = '无效的SSID！'
            break
          case 12009:
            errMsg = '系统运营商配置拒绝连接WIFI！'
            break
          case 12010:
            errMsg = '系统错误！'
            break
          case 12011:
            errMsg = '应用在后台无法配置WIFI！'
            break
          case 12013:
            errMsg = '系统保存的WIFI配置过期！'
            break
          case 12014:
            errMsg = '无效的 WEP / WPA 密码！'
            break
          default:
            errMsg = 'WIFI连接失败，请尝试在设置中手动连接！'
            break
        }
        wx.showToast({
          title: errMsg,
          icon: 'none'
        })
      }
    })
  }
})
```
