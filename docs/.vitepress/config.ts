// 注释
module.exports = {
  title: '优医问诊H5',
  description: '最新Vue3技术栈,Vue3,TS,Pinia,Vant,在线问诊项目,H5',
  markdown: {
    lineNumbers: true
  },
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
      { text: 'Vue3.0', link: '/vue/' },
      { text: 'TypeScript', link: '/ts/' },
      { text: '优医问诊', link: '/project/' },
    ],
    search: true,
    socialLinks: [
      { icon: 'github', link: 'http://git.itcast.cn/heimaqianduan/consult-patients-h5-vue3' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Allen Zhou'
    },
    themeConfig: {
      lastUpdatedText: 'Updated Date'
    },
    sidebar: {
      '/vue/': [
        {
          text: 'Vue3核心',
          items: [
            { text: '快速开始', link: '/vue/' }, 
            { text: '组合API', link: '/vue/composition' },
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
            { text: 'TypeScript泛型', link: '/ts/generic' },
            { text: 'TS和Vue3', link: '/ts/vue' },
            { text: 'TS类型声明文件', link: '/ts/file' },
          ]
        }
      ],
      '/project/': [
        {
          text: '在线问诊H5个人端',
          items: [
            { text: '项目起步', link: '/project/' }, 
            { text: '超级医生', link: '/project/super-doctor' },
          ]
        }
      ],
    }
  }
}
