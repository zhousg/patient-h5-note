import DefaultTheme from 'vitepress/theme'
// import Antd from 'ant-design-vue';
import './custom.css'
// import 'ant-design-vue/dist/antd.css';

export default { 
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.use(Antd)
  }
}