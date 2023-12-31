import type { RouteRecordRaw } from 'vue-router'
import LaborProgressWidgetDefine from '@/widgets/labor-progress/LaborProgress.widget'

const LaborProgressWidgetRoutes: RouteRecordRaw[] = [
  {
    path: LaborProgressWidgetDefine.path,
    name: `${LaborProgressWidgetDefine.name}`,
    component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.labor_progress" */ './LaborProgressWidgetView.vue'),
  },
  {
    path: LaborProgressWidgetDefine.configPagePath!,
    name: `${LaborProgressWidgetDefine.name}.config`,
    component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.labor_progress.config" */ './LaborProgressConfigView.vue'),
  },
]

export default LaborProgressWidgetRoutes
