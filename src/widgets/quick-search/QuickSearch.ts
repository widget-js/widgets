import {HostedMode, Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.quick_search";
//组件标题
const title = {"zh": "快捷搜索"};
//组件描述
const description = {"zh": ""};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/quick_search";
//配置页路由地址
const configUrl = "/widget/config/quick_search";
//组件关键词
const QuickSearchWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh",
    width: 2,
    height: 2,
    minWidth: 2,
    maxWidth: 2,
    minHeight: 2,
    maxHeight: 2,
    routes: []
})

export default QuickSearchWidgetDefine;
