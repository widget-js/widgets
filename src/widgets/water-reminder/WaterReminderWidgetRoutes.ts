import type { RouteRecordRaw } from 'vue-router'
import WaterReminderWidget from './WaterReminder.widget'

const url = WaterReminderWidget.path
const name = WaterReminderWidget.name

const configUrl = WaterReminderWidget.configPagePath!.split('?')[0]

const WaterReminderWidgetRoutes: RouteRecordRaw[] = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.water_reminder" */ './WaterReminderWidgetView.vue'),
  },
  {
    path: configUrl!,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.water_reminder.config" */ './WaterReminderConfigView.vue'),
  },
]

export default WaterReminderWidgetRoutes
