import BirthdayListWidgetDefine from "@/widgets/birthday-list/BirthdayList.widget";

const BirthdayListWidgetRoutes = [
    {
        path: BirthdayListWidgetDefine.getIndexRoute().url,
        name: `${BirthdayListWidgetDefine.name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.birthday_list" */ './BirthdayListWidgetView.vue')
    },
    {
        path: BirthdayListWidgetDefine.getConfigRoute()!.url.split("?")[0],
        name: `${BirthdayListWidgetDefine.name}.config`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.birthday_list.config" */ './BirthdayListConfigView.vue')
    }
]


export default BirthdayListWidgetRoutes;
