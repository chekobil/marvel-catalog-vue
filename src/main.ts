import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axiosPlugin from './services/axiosPlugin'


const app = createApp(App)
app.use(axiosPlugin)
app.mount('#app')
