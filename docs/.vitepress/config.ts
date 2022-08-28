// 注释
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '优医问诊H5',
  description: '最新Vue3技术栈,Vue3,TS,Pinia,Vant,在线问诊项目,H5',
  markdown: {
    lineNumbers: true
  },
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: './logo2.png' }]],
  base: '/patient-h5-note/',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo2.png',
    algolia: {
      appId: 'V5OB9FQ1RB',
      apiKey: '72c9c195bbe0b4ac381d9da952bfe289',
      indexName: 'patient-h5'
    },
    nav: [
      { text: 'vue3', link: '/vue/' },
      { text: 'TypeScript', link: '/ts/' },
      { text: 'Pinia', link: '/pinia/' },
      { text: '优医问诊', link: '/project/' },
    ],
    // search: true,
    socialLinks: [
      { icon: 'github', link: 'http://git.itcast.cn/heimaqianduan/consult-patients-h5-vue3' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Allen Zhou'
    },
    lastUpdatedText: '更新',
    sidebar: {
      '/vue/': [
        {
          text: 'Vue3核心',
          items: [
            { text: '快速开始', link: '/vue/' }, 
            { text: '组合式API', link: '/vue/composition' },
            { text: '综合案例', link: '/vue/case' },
          ]
        }
      ],
      '/ts/': [
        {
          text: 'TypeScript',
          items: [
            { text: 'TypeScript起步', link: '/ts/' }, 
            { text: 'TypeScript核心', link: '/ts/core' },
            { text: 'TypeScript应用', link: '/ts/pro' },
            { text: 'TS黑马头条案例', link: '/ts/case' },
          ]
        }
      ],
      '/pinia/': [
        {
          text: 'Pinia',
          items: [
            { text: 'Pinia 核心', link: '/pinia/' }, 
          ]
        }
      ],
      '/project/': [
        {
          text: '优医问诊H5项目课程',
          items: [
            { text: '1. 项目起步', link: '/project/' }, 
            { text: '2. 登录模块', link: '/project/login' }, 
            { text: '3. 用户模块', link: '/project/user' }, 
            { text: '4. 首页模块', link: '/project/home' }, 
            { text: '5. 极速问诊', link: '/project/consult' }, 
            { text: '6. 医生问诊室', link: '/project/room' }, 
            { text: '7. 问诊订单模块', link: '/project/consult-order' }, 
            { text: '8. 药品订单模块', link: '/project/order' }, 
            { text: '9. 其他扩展', link: '/project/end' }, 
            { text: '辅助-超级医生', link: '/project/super-doctor' },
          ]
        }
      ],
    }
  }
})
