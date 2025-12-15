import { createApp } from 'vue'
import './style.css'
import './assets/styles/variables.css' // 引入样式变量
import App from './App.vue'
import router from './router' // 引入路由

const app = createApp(App)
app.use(router) // 使用路由
app.mount('#app')
