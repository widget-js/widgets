import LaborProgressWidgetDefine from "@/widgets/labor-progress/LaborProgress.widget";

const LaborProgressWidgetRoutes = [
    {
        path: LaborProgressWidgetDefine.getIndexRoute().url,
        name: `${LaborProgressWidgetDefine.name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.labor_progress" */ './LaborProgressWidgetView.vue')
    },
    {
        path: LaborProgressWidgetDefine.getConfigRoute()!.url,
        name: `${LaborProgressWidgetDefine.name}.config`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.labor_progress.config" */ './LaborProgressConfigView.vue')
    }
];

export default LaborProgressWidgetRoutes;
