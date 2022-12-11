import TimeProgressWidgetDefine from "@/widgets/time-progress/TimeProgress.widget";

const TimeProgressWidgetRoutes = [
    {
        path: TimeProgressWidgetDefine.url,
        name: `${TimeProgressWidgetDefine.name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.time_progress" */ './TimeProgressWidgetView.vue')
    },

    // {
    //     path: TimeProgressWidgetDefine.configUrl!,
    //     name: `${TimeProgressWidgetDefine.name}.config`,
    //     component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.time_progress.config" */ './TimeProgressConfig.vue')
    // }
];

export default TimeProgressWidgetRoutes;
