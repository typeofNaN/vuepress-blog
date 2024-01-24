import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/': [
    {
      text: '文章',
      icon: 'book',
      prefix: 'article/',
      children: [
        'vite-deploy-github-page-problem',
        'node-sass-version',
        'jsx-in-vue',
        'observer-api',
        'vue-directives',
        'ECMAScript',
        'js-copy',
        'array-unique',
        'git-command',
        'es6',
        'css-vertical-center',
        'prototype-pattern',
        'jquery-study-note',
        'css-style-ruler',
        'build-hexo-blog'
      ]
    }
  ]
})
