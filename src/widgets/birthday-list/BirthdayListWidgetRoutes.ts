import type { RouteRecordRaw } from 'vue-router'
import BirthdayListWidgetDefine from '@/widgets/birthday-list/BirthdayList.widget'

const BirthdayListWidgetRoutes: RouteRecordRaw[] = [
  {
    path: BirthdayListWidgetDefine.path,
    name: `${BirthdayListWidgetDefine.name}`,
    component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.birthday_list" */ './BirthdayListWidgetView.vue'),
  },
  {
    path: BirthdayListWidgetDefine.configPagePath!,
    name: `${BirthdayListWidgetDefine.name}.config`,
    component: () =>
      import(/* webpackChunkName: "cn.widgetjs.widgets.birthday_list.config" */ './BirthdayListConfigView.vue'),
  },
]

export default BirthdayListWidgetRoutes
