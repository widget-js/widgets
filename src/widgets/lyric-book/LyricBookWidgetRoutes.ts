import LyricBookWidgetDefine from "./LyricBook";

const url = LyricBookWidgetDefine.getIndexRoute().url;
const name = LyricBookWidgetDefine.name;

const configUrl = LyricBookWidgetDefine.getConfigRoute()!.url;

const LyricBookWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.lyric_book" */ './LyricBookWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.lyric_book.config" */ './LyricBookConfigView.vue')
    }
]

export default LyricBookWidgetRoutes;
