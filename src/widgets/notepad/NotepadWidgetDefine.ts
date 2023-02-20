import {Widget, WidgetKeyword} from "@widget-js/core";

const name = "cn.widgetjs.widgets.notepad";
//组件标题
const title = {"zh": "记事本"};
//组件描述
const description = {"zh": ""};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
const lang = "zh"
const url = "/widget/notepad";
const configUrl = "/widget/config/notepad";
const width = 2;
const height = 2;
const minWidth = 2;
const maxWidth = 4;
const minHeight = 2;
const maxHeight = 4;
export const NotepadWidgetDefine = new Widget({
    name, title, description, keywords, lang, width, height, maxWidth, maxHeight, minWidth, minHeight,
    routes: [
        {
            url: url,
            name: 'index'
        },
        {
            url: configUrl,
            name: 'config'
        },
    ]
})

export const NotepadWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.clock" */ './NotepadWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.clock.config" */ './NotepadWidgetConfigView.vue')
    }
]


