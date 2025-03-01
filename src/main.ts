import { createApp } from 'vue'
import dayjs from 'dayjs'
import 'animate.css'
import { WidgetJsPlugin } from '@widget-js/vue3'
import '@widget-js/vue3/dist/style.css'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import ElementPlus from 'element-plus'
import './index.css'
import router from './router'
import 'dayjs/locale/zh-cn.js'
import App from './App.vue'
import 'virtual:uno.css'
import '@icon-park/vue-next/styles/index.css'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/loading.scss'

import { i18n } from '@/i18n/i18n'

dayjs.locale('cn')

const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(WidgetJsPlugin)
app.use(MotionPlugin)
app.use(i18n)
app.use(router)
app.use(pinia)
app.mount('#app')
