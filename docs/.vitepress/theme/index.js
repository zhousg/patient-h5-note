import DefaultTheme from 'vitepress/theme'
import './custom.css'

import SuperDoctor from './components/SuperDoctor.vue'

export default { 
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('SuperDoctor', SuperDoctor)
  }
}