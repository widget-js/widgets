import QuickSearchWidgetDefine from "./QuickSearch";

const url = QuickSearchWidgetDefine.getIndexRoute().url;
const name = QuickSearchWidgetDefine.name;

const configUrl = QuickSearchWidgetDefine.getConfigRoute()!.url;

const QuickSearchWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.quick_search" */ './QuickSearchWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.quick_search.config" */ './QuickSearchConfigView.vue')
    }
]

export default QuickSearchWidgetRoutes;
