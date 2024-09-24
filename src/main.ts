import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/routerDefinition'
import axiosPlugin from './plugins/axiosPlugin'

import './style.css'
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace'

const app = createApp(App)
app.use(router)
app.use(axiosPlugin)
app.mount('#app')
