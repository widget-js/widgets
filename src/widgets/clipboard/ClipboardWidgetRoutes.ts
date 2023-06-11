import ClipboardWidgetDefine from "./Clipboard.widget";

const url = ClipboardWidgetDefine.getIndexRoute().url;
const name = ClipboardWidgetDefine.name;

// const configUrl = ClipboardWidgetDefine.getConfigRoute()!.url;

const ClipboardWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.clipboard" */ './ClipboardWidget.vue')
    },
    // {
    //     path: configUrl,
    //     name: `${name}.config`,
    //     component: () => import(/* webpackChunkName: "com.wisdom.widgets.clipboard.config" */ './ClipboardConfigView.vue')
    // }
]

export default ClipboardWidgetRoutes;
