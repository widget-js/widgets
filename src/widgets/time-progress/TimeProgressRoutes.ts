import type { RouteRecordRaw } from 'vue-router'
import TimeProgressWidgetDefine from '@/widgets/time-progress/TimeProgress.widget'

const url = TimeProgressWidgetDefine.path
const name = TimeProgressWidgetDefine.name

const configUrl = TimeProgressWidgetDefine.configPagePath!.split('?')[0]

const TimeProgressWidgetDefineRoutes: RouteRecordRaw[] = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.time_progress" */ './TimeProgressWidgetView.vue'),
  },
  {
    path: configUrl!,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.time_progress.config" */ './TimeProgressConfig.vue'),
  },
]

export default TimeProgressWidgetDefineRoutes
