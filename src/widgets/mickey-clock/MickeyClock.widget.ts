import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.mickey_clock";
//组件标题
const title = {"zh": "米奇表盘"};
//组件描述
const description = {"zh": "源自Apple Watch米奇表盘"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/mickey_clock";
//配置页路由地址
const configUrl = undefined;
//组件关键词
const MickeyClockWidgetDefine = new Widget({
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
    maxWidth: 2,
    minHeight: 2,
    maxHeight: 2
})

export default MickeyClockWidgetDefine;
