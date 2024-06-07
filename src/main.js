import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI/index'
import router from './router/router'
import Vintersection from './components/directives/Vintersection'
import directives from './components/directives'

const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(router).mount('#app')
