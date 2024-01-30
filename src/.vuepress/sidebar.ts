import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/': [
    {
      text: '技术文章',
      icon: 'book',
      collapsible: true,
      prefix: 'article/technology/',
      children: [
        {
          text: '设计模式',
          prefix: 'design-patterns/',
          collapsible: true,
          children: [
            'prototype-pattern'
          ]
        },
        {
          text: '前端',
          prefix: 'front-end/',
          collapsible: true,
          children: [
            {
              text: 'CSS',
              prefix: 'css/',
              collapsible: true,
              children: [
                'css-vertical-center',
                'css-style-ruler'
              ]
            },
            {
              text: 'JavaScript',
              prefix: 'js/',
              collapsible: true,
              children: [
                'vite-deploy-github-page-problem',
                'node-sass-version',
                'observer-api',
                'ECMAScript',
                'js-copy',
                'array-unique',
                'es6',
                'jquery-study-note',
              ]
            },
            {
              text: 'Vue',
              prefix: 'vue',
              collapsible: true,
              children: [
                'jsx-in-vue',
                'vue-directives'
              ]
            }
          ]
        },
        {
          text: 'Git',
          prefix: 'git/',
          collapsible: true,
          children: [
            'git-command'
          ]
        },
        {
          text: '其他',
          prefix: 'other/',
          collapsible: true,
          children: [
            'build-hexo-blog'
          ]
        }
      ]
    },
    {
      text: '生活感悟',
      icon: 'heart',
      prefix: 'article/life/',
      collapsible: true,
      children: [
        'warm-and-free',
        'their-18-year-old',
        'say-goodbye'
      ]
    }
  ]
})
