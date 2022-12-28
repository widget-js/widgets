import DynamicIslandWidgetDefine from "./DynamicIsland.widget";

const url = DynamicIslandWidgetDefine.url;
const name = DynamicIslandWidgetDefine.name;

const configUrl = DynamicIslandWidgetDefine.configUrl!;

const DynamicIslandWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.dynamic_island" */ './DynamicIslandWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.dynamic_island.config" */ './DynamicIslandConfigView.vue')
    },
    {
        path: '/widget/dynamic_island/call',
        name: `${name}.call`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.dynamic_island.call" */ './components/PhoneCallNotification.vue')
    }
]

export default DynamicIslandWidgetRoutes;
