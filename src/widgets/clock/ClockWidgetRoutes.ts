import ClockWidgetDefine from "@/widgets/clock/ClockWidget.widget";
export const ClockWidgetRoutes = [
    {
        path: ClockWidgetDefine.url,
        name: `${ClockWidgetDefine.name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.clock" */ './ClockWidgetView.vue')
    },
    {
        path: ClockWidgetDefine.configUrl!,
        name: `${ClockWidgetDefine.name}.config`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.clock.config" */ './ClockWidgetConfigView.vue')
    }
]

