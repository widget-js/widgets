import GlitchWidgetDefine from "./Glitch.widget";

const url = GlitchWidgetDefine.url;
const name = GlitchWidgetDefine.name;

const configUrl = GlitchWidgetDefine.configUrl;

const GlitchWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.glitch" */ './GlitchWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.glitch.config" */ './GlitchConfigView.vue')
    }
]

export default GlitchWidgetRoutes;
