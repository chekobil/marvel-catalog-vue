import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './plugins/routerDefinition'
import axiosPlugin from './plugins/axiosPlugin'


const app = createApp(App)
app.use(router)
app.use(axiosPlugin)
app.mount('#app')
