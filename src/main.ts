import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'animate.css';
import {WidgetJsPlugin} from "@widget-js/vue3";
import '@widget-js/vue3/dist/style.css'
import '@widget-js/vue3/dist/mingcute_icon/MingCute.css'
import {createPinia} from "pinia";
import {MotionPlugin} from '@vueuse/motion'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).use(WidgetJsPlugin).use(MotionPlugin)
    .use(router).use(createPinia()).mount('#app')

