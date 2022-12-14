import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.dynamic_island";
//组件标题
const title = {"zh": "灵动通知"};
//组件描述
const description = {"zh": "丝般顺滑的灵动通知组件"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/dynamic_island";
//配置页路由地址
const configUrl = "/widget/config/dynamic_island";
//组件关键词
const DynamicIslandWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh",
    url: url,
    configUrl: configUrl,
    width: 6,
    height: 4,
    minWidth: 6,
    maxWidth: 6,
    minHeight: 4,
    maxHeight: 4,
})

export default DynamicIslandWidgetDefine;
