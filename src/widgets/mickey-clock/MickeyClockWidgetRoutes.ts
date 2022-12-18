import MickeyClockWidgetDefine from "./MickeyClock.widget";

const url = MickeyClockWidgetDefine.url;
const name = MickeyClockWidgetDefine.name;

const MickeyClockWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.mickey_clock" */ './MickeyClockWidgetView.vue')
    }
]

export default MickeyClockWidgetRoutes;
