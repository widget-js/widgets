import type { RouteRecordRaw } from 'vue-router'
import PhoneReminderWidgetDefine from './PhoneReminder.widget'

const url = PhoneReminderWidgetDefine.path
const name = PhoneReminderWidgetDefine.name

const configUrl = PhoneReminderWidgetDefine.configPagePath!.split('?')[0]

const PhoneReminderWidgetRoutes: RouteRecordRaw[] = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.phone_reminder" */ './PhoneReminderWidgetView.vue'),
  },
  {
    path: configUrl,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.phone_reminder.config" */ './PhoneReminderConfigView.vue'),
  },
]

export default PhoneReminderWidgetRoutes
