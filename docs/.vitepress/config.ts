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
    logo: '/public/logo2.png',
    algolia: {
      appId: '61BYHAARMH',
      apiKey: '51ce6ea532fd1accd33d2216e04c4469',
      indexName: 'patient-h5'
    },
    nav: [
      { text: 'Vue3.0', link: '/vue3pre/' },
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
      '/vue3pre/': [
        {
          text: 'Vue3核心',
          items: [
            { text: '快速开始', link: '/vue3pre/' }, 
            { text: '组合API', link: '/vue3pre/composition' },
            { text: '综合案例', link: '/vue3pre/case' },
          ]
        }
      ],
    }
  }
}