import KeyStrokeWidgetDefine from "./KeyStroke.widget";

const url = KeyStrokeWidgetDefine.path;
const name = KeyStrokeWidgetDefine.name;

const KeyStrokeWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.key_stroke" */ './KeyStrokeWidgetView.vue')
    }
]

export default KeyStrokeWidgetRoutes;
