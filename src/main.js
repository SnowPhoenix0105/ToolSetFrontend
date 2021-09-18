import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import "element-theme-chalk"
import router from './router'
import axios from 'axios'
import { initStore } from './store'



const store = initStore();

const app = createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(store)
app.config.globalProperties.$axios = axios

app.mount('#app')
