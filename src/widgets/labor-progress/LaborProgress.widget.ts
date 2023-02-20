import {Widget, WidgetKeyword} from "@widget-js/core";

const name = "cn.widgetjs.widgets.labor_progress";
//组件标题
const title = {"zh": "打工进度"};
//组件描述
const description = {"zh": "打工人，打工魂"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
const url = "/widget/labor_progress";
const configUrl = "/widget/config/labor_progress";

//组件关键词
const LaborProgressWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh",
    width: 4,
    height: 1,
    minWidth: 3,
    maxWidth: 6,
    minHeight: 1,
    maxHeight: 2,
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


export default LaborProgressWidgetDefine
