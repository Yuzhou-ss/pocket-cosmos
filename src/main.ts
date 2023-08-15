import { createApp } from 'vue'
import "@/assets/style/global.css"
import App from './App.vue'
import router from "@/router/index"
import Terminal from 'vue-web-terminal'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(Terminal)
app.use(router)
app.mount('#app')
