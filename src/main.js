import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import router from './router'
import { createPinia } from 'pinia'
import "bootstrap-icons/font/bootstrap-icons.css"

const pinia = createPinia()
const app = createApp(App)
app.use(bootstrap)
app.use(router)
app.use(pinia)
app.mount('#app')
