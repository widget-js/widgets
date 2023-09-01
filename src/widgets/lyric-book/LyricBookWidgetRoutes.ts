import LyricBookWidgetDefine from "./LyricBook";

const url = LyricBookWidgetDefine.path;
const name = LyricBookWidgetDefine.name;

const configUrl = LyricBookWidgetDefine.configPagePath;

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
