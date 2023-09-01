import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.countdown";
//组件标题
const title = {"zh-CN": "倒计时"};
//组件描述
const description = {"zh-CN": "简单的倒计时组件，支持农历"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/countdown";
//配置页路由地址
const configUrl = "/widget/config/countdown";
//组件关键词
const CountdownWidgetDefine = new Widget({
    path: url,
    configPagePath:configUrl,
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh-CN",
    previewImage: "/images/preview_countdown.png",
    width: 2,
    height: 2,
    minWidth: 2,
    maxWidth: 4,
    minHeight: 2,
    maxHeight: 4
})

export default CountdownWidgetDefine;
