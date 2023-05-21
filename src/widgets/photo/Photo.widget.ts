import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.photo";
//组件标题
const title = {"zh": "轮播相册"};
//组件描述
const description = {"zh": "轮播文件夹内的图片"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/photo";
//配置页路由地址
const configUrl = "/widget/config/photo";
//组件关键词
const PhotoWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh",
    width: 2,
    height: 2,
    minWidth: 1,
    maxWidth: 6,
    minHeight: 1,
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

export default PhotoWidgetDefine;
