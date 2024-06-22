import type { RouteRecordRaw } from 'vue-router'
import CountdownWidgetDefine from './Countdown.widget'

const url = CountdownWidgetDefine.path
const name = CountdownWidgetDefine.name

const configUrl = CountdownWidgetDefine.configPagePath!.split('?')[0]

const CountdownWidgetRoutes: RouteRecordRaw[] = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.countdown" */ './CountdownWidgetView.vue'),
  },
  {
    path: configUrl,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.countdown.config" */ './CountdownConfigView.vue'),
  },
]

export default CountdownWidgetRoutes
