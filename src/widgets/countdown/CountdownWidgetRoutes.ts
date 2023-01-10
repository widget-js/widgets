import CountdownWidgetDefine from "./Countdown.widget";

const url = CountdownWidgetDefine.url;
const name = CountdownWidgetDefine.name;

const configUrl = CountdownWidgetDefine.configUrl!;

const CountdownWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.countdown" */ './CountdownWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.countdown.config" */ './CountdownConfigView.vue')
    }
]

export default CountdownWidgetRoutes;
