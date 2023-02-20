import ClockWidgetDefine from "@/widgets/clock/ClockWidget.widget";
export const ClockWidgetRoutes = [
    {
        path: ClockWidgetDefine.getIndexRoute().url,
        name: `${ClockWidgetDefine.name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.clock" */ './ClockWidgetView.vue')
    },
    {
        path: ClockWidgetDefine.getConfigRoute()!.url,
        name: `${ClockWidgetDefine.name}.config`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.clock.config" */ './ClockWidgetConfigView.vue')
    }
]

