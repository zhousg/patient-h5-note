import DefaultTheme from 'vitepress/theme'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './custom.css'

export default { 
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Antd)
  }
}