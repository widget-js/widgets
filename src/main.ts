import { MotionPlugin } from '@vueuse/motion'
import { WidgetJsPlugin } from '@widget-js/vue3'
import dayjs from 'dayjs'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { i18n } from '@/i18n/i18n'
import App from './App.vue'
import router from './router'
import 'animate.css'
import '@widget-js/vue3/dist/style.css'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn.js'
import 'virtual:uno.css'
import '@/assets/css/common.css'
import '@icon-park/vue-next/styles/index.css'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'

import 'element-plus/theme-chalk/src/loading.scss'

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
