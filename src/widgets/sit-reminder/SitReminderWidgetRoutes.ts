import SitReminderWidgetDefine from "./SitReminder.widget";

const url = SitReminderWidgetDefine.path;
const name = SitReminderWidgetDefine.name;

const configUrl = SitReminderWidgetDefine.configPagePath;

const SitReminderWidgetRoutes = [
  {
    path: url,
    name: `${name}`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.sit_reminder" */ './SitReminderWidgetView.vue')
  },
  {
    path: configUrl,
    name: `${name}.config`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.sit_reminder.config" */ './SitReminderConfigView.vue')
  },
  {
    path: '/widget/sit_reminder/break',
    name: `${name}.break`,
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.dynamic_island.break" */ './BreakView.vue')
  }
]

export default SitReminderWidgetRoutes;
