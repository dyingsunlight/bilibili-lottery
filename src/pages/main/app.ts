import { createApp } from "vue"
import { AppService } from "./services/app"
import AppMain from './components/main.vue'
import ElementPlus from 'element-plus'

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(AppMain)
  app.use(ElementPlus)
  app.provide('service', new AppService())
  app.mount('#app')
})
