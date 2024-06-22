import type { RouteRecordRaw } from 'vue-router'
import WaveProgressWidgetDefine from '@/widgets/wave-progress/WaveProgress.widget'

const WaveProgressRoute: RouteRecordRaw[] = [
  {
    path: WaveProgressWidgetDefine.path,
    name: `${WaveProgressWidgetDefine.name}`,
    component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.wave_progress" */ './WaveProgressWidgetView.vue'),
  },
  {
    path: WaveProgressWidgetDefine.configPagePath!.split('?')[0],
    name: `${WaveProgressWidgetDefine.name}.config`,
    component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.wave_progress.config" */ './WaveProgressConfigView.vue'),
  },
]

export default WaveProgressRoute
