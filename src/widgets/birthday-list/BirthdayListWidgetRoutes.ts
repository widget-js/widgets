import BirthdayListWidgetDefine from "@/widgets/birthday-list/BirthdayList.widget";

const BirthdayListWidgetRoutes = [
    {
        path: BirthdayListWidgetDefine.url,
        name: `${BirthdayListWidgetDefine.name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.birthday_list" */ './BirthdayListWidgetView.vue')
    },
    {
        path: BirthdayListWidgetDefine.configUrl!.split("?")[0],
        name: `${BirthdayListWidgetDefine.name}.config`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.birthday_list.config" */ './BirthdayListConfigView.vue')
    }
]


export default BirthdayListWidgetRoutes;
