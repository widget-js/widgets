import type { RouteRecordRaw } from 'vue-router'
import ClipboardWidget from './Clipboard.widget'

const path = ClipboardWidget.path
const name = ClipboardWidget.name

const configUrl = ClipboardWidget.configPagePath!

const ClipboardWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.clipboard" */ './ClipboardWidgetView.vue'),
  },
  {
    path: configUrl,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.clipboard.config" */ './ClipboardConfigView.vue'),
  },
]

export default ClipboardWidgetRoutes
