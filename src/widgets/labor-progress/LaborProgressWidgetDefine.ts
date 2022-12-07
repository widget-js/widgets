import {Widget, WidgetKeyword, WidgetParams} from "@widget-js/core";

const name = "com.wisdom.widgets.labor_progress";
//组件标题
const title = {"zh": "打工进度"};
//组件描述
const description = {"zh": "打工人，打工魂"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
const url = "/widget/labor_progress";
const configUrl = "/widget/config/labor_progress";

//组件关键词
export const LaborProgressWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh",
    url: url,
    configUrl: configUrl,
    width: 4,
    height: 1,
    minWidth: 3,
    maxWidth: 6,
    minHeight: 1,
    maxHeight: 2,
})

export const     LaborProgressDebugParams = new WidgetParams();
LaborProgressDebugParams.width = 4;
LaborProgressDebugParams.height = 1;
export const LaborProgressWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.labor_progress" */ './LaborProgressWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.labor_progress.config" */ './LaborProgressConfigView.vue')
    }
]


