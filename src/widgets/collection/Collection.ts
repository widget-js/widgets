import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.collection";
//组件标题
const title = {"zh-CN": "分组"};
//组件描述
const description = {"zh-CN": ""};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/collection";
//配置页路由地址
const configUrl = "/widget/config/collection";
//组件关键词
const CollectionWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh-CN",
    width: 4,
    height: 4,
    minWidth: 2,
    maxWidth: 6,
    minHeight: 2,
    maxHeight: 6,
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

export default CollectionWidgetDefine;
