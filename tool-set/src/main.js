import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import { initStore } from './store'



const store = initStore();

const app = createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(store)


app.config.globalProperties.$axios = axios

app.mount('#app')
