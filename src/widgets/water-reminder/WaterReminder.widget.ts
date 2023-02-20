import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.water_reminder";
//组件标题
const title = {"zh": "喝水提醒"};
//组件描述
const description = {"zh": "每天N杯水，养成好习惯"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/water_reminder";
//配置页路由地址
const configUrl = "/widget/config/water_reminder";
//组件关键词
const WaterReminderWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh",
    previewImage: "/images/preview_water_reminder.png",
    width: 2,
    height: 2,
    backgroundThrottling: false,
    minWidth: 2,
    maxWidth: 2,
    minHeight: 2,
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

export default WaterReminderWidgetDefine;
