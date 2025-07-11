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
                'UnoCSS',
                'css-vertical-center',
                'css-style-ruler'
              ]
            },
            {
              text: 'JavaScript',
              prefix: 'js/',
              collapsible: true,
              children: [
                'timer',
                'node-sass-version',
                'vite-deploy-github-page-problem',
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
                'h-function',
                'jsx-in-vue',
                'vue-directives'
              ]
            },
            {
              text: '小程序',
              prefix: 'miniProgram',
              collapsible: true,
              children: [
                'connect-wifi'
              ]
            }
          ]
        },
        {
          text: '后端',
          prefix: 'back-end/',
          collapsible: true,
          children: [
            {
              text: 'Node.js',
              prefix: 'nodejs/',
              collapsible: true,
              children: [
                'keymetrics'
              ]
            }
          ]
        },
        {
          text: 'Git',
          prefix: 'git/',
          collapsible: true,
          children: [
            'git-command',
            'git-commit-ruler'
          ]
        },
        {
          text: '其他',
          prefix: 'other/',
          collapsible: true,
          children: [
            'github-emojis',
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
