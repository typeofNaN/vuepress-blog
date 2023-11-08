import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
  base: '/vuepress-blog/',

  lang: 'zh-CN',
  title: 'typeofNaN',
  description: 'typeofNaN、六碗面、个人网站、前端技术开发、JavaScript 技术',
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `./favicon.png` }]
  ],

  theme

  // Enable it with pwa
  // shouldPrefetch: false,
})
