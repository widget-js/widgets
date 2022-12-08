import {Widget, WidgetKeyword} from "@widget-js/core";
const name = "fun.zujian.widgets.clock";
//组件标题
const title = {"zh":"时钟"};
//组件描述
const description = {"zh":"带动画的时钟"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
const url = "/widget/clock";
const configUrl = "/widget/config/clock";
export const ClockWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh",
    url: url,
    configUrl: configUrl,
    width: 2,
    height: 2,
    minWidth: 2,
    maxWidth: 4,
    minHeight: 2,
    maxHeight: 4
})

export const ClockWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "fun.zujian.widgets.clock" */ './ClockWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "fun.zujian.widgets.clock.config" */ './ClockWidgetConfigView.vue')
    }
]


