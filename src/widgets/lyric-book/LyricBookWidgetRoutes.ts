import LyricBookWidgetDefine from "./LyricBook.widget";

const url = LyricBookWidgetDefine.url;
const name = LyricBookWidgetDefine.name;

const configUrl = LyricBookWidgetDefine.configUrl!;

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
