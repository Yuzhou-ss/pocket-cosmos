import { createApp } from 'vue'
import "@/assets/style/global.scss"
import App from './App.vue'
import router from "@/router/index"
import Terminal from 'vue-web-terminal'
import 'aplayer/dist/APlayer.min.css';
import 'virtual:svg-icons-register'
import GlobalComponents from '@/plugin'
// 导入 pinia
import { createPinia } from 'pinia'

// 创建 pinia 实例
const pinia = createPinia()

// 挂载到根实例
const app = createApp(App)

app.use(GlobalComponents)
app.use(pinia)
app.use(Terminal)
app.use(router)
app.mount('#app')
