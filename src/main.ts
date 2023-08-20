import { createApp } from 'vue'
import "@/assets/style/global.css"
import App from './App.vue'
import router from "@/router/index"
import Terminal from 'vue-web-terminal'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入 pinia
import { createPinia } from 'pinia'
// 创建 pinia 实例
const pinia = createPinia()
// 挂载到根实例

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(Terminal)
app.use(router)
app.mount('#app')
