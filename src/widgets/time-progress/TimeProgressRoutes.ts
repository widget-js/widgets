import TimeProgressWidgetDefine from "@/widgets/time-progress/TimeProgress.widget";

const TimeProgressWidgetRoutes = [
    {
        path: TimeProgressWidgetDefine.path,
        name: `${TimeProgressWidgetDefine.name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.time_progress" */ './TimeProgressWidgetView.vue')
    },

];

export default TimeProgressWidgetRoutes;
