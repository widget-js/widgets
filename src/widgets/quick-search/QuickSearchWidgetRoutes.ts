import QuickSearchWidgetDefine from "./QuickSearch";

const url = QuickSearchWidgetDefine.url;
const name = QuickSearchWidgetDefine.name;

const configUrl = QuickSearchWidgetDefine.configUrl!;

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
