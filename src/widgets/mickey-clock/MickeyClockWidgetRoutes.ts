import MickeyClockWidgetDefine from "./MickeyClock.widget";

const url = MickeyClockWidgetDefine.url;
const name = MickeyClockWidgetDefine.name;

const MickeyClockWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.mickey_clock" */ './MickeyClockWidgetView.vue')
    },
    {
        path: MickeyClockWidgetDefine.configUrl!,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.mickey_clock.config" */ './MickeyClockWidgetConfigView.vue')
    }
]

export default MickeyClockWidgetRoutes;
