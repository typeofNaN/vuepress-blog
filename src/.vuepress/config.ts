import { defineUserConfig } from 'vuepress'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import theme from './theme.js'

export default defineUserConfig({
  base: '/vuepress-blog/',

  lang: 'zh-CN',
  title: 'typeofNaN',
  description: 'typeofNaN、六碗面、个人网站、前端技术开发、JavaScript 技术',
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `./favicon.png` }]
  ],

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page: any) => page.frontmatter.category,
          formatter: '分类：$content'
        },
        {
          getter: (page: any) => page.frontmatter.tag,
          formatter: '标签：$content'
        }
      ]
    })
  ]
})
