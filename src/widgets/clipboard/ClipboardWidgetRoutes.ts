import ClipboardWidgetDefine from "./Clipboard.widget";

const path = ClipboardWidgetDefine.path;
const name = ClipboardWidgetDefine.name;

// const configUrl = ClipboardWidgetDefine.getConfigRoute()!.path;

const ClipboardWidgetRoutes = [
    {
        path: path,
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
