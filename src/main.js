import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useVant } from '@/vant'

import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import './icons'

import './permission'
// rem
import useRem from '@/utils/rem.js'
// 全局组件
import { useComponent } from '@/components/common'

const app = createApp(App)
const pinia = createPinia()
// 注册全局elementPlus
useVant(app)
useRem()
useComponent(app)

app.use(router).use(pinia).mount('#app')
