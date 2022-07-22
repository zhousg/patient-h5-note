import DefaultTheme from 'vitepress/theme'
// import Antd from 'ant-design-vue';
import './custom.css'
// import 'ant-design-vue/dist/antd.css';

import SuperDoctor from './components/SuperDoctor.vue'
import CodeEditor from './components/CodeEditor.vue'

export default { 
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.use(Antd)
    app.component('SuperDoctor', SuperDoctor)
    app.component('CodeEditor', CodeEditor)
  }
}