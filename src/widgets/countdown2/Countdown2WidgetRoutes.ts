import type { RouteRecordRaw } from 'vue-router'
import Countdown2WidgetDefine from './Countdown2.widget'

const url = Countdown2WidgetDefine.path
const name = Countdown2WidgetDefine.name

const configUrl = Countdown2WidgetDefine.configPagePath

const Countdown2WidgetRoutes: RouteRecordRaw[] = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.countdown2" */ './Countdown2WidgetView.vue'),
  },
  {
    path: configUrl!,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.countdown2.config" */ './Countdown2ConfigView.vue'),
  },
]

export default Countdown2WidgetRoutes
