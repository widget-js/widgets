import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.action";
//组件标题
const title = {"zh": "代办事项"};
//组件描述
const description = {"zh": ""};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
const lang = "zh"
const url = "/widget/action";
const configUrl = "/widget/config/action";
const width = 2;
const height = 2;
const minWidth = 2;
const maxWidth = 4;
const minHeight = 2;
const maxHeight = 4;
export const ActionWidgetDefine = new Widget({
    name,
    title,
    description,
    keywords,
    lang,
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    url,
    configUrl
})

export const ActionWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.clock" */ './ActionWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.clock.config" */ './ActionWidgetConfigView.vue')
    }
]


