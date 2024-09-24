import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './plugins/routerDefinition'
import axiosPlugin from './plugins/axiosPlugin'
const pinia = createPinia()

import './style.css'
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(axiosPlugin)
app.mount('#app')
