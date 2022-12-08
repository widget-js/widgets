import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "fun.zujian.widgets.wave_progress";
const title = {"zh": "波浪进度"};
//组件标题
const description = {"zh": "用波浪显示事件进度"};
//组件描述
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
const lang = "zh"
const url = "/widget/wave_progress";
const configUrl = "/widget/config/wave_progress";
const width = 1;
const height = 2;
const minWidth = 1;
const maxWidth = 3;
const minHeight = 2;
const maxHeight = 3;
export const WaveProgressWidgetDefine = new Widget({
    name, title, description, keywords, lang, width, height, maxWidth, maxHeight, minWidth, minHeight, url, configUrl
})

export const WaveProgressWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com. wisdom.widgets.wave_progress" */ './WaveProgressWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "fun.zujian.widgets.wave_progress.config" */ './WaveProgressConfigView.vue')
    }
]


