import type { RouteRecordRaw } from 'vue-router'
import MickeyClockWidgetDefine from './MickeyClock.widget'

const url = MickeyClockWidgetDefine.path
const name = MickeyClockWidgetDefine.name

const MickeyClockWidgetRoutes: RouteRecordRaw[] = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.mickey_clock" */ './MickeyClockWidgetView.vue'),
  },
]

export default MickeyClockWidgetRoutes
