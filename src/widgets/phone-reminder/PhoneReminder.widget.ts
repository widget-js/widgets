import {HostedMode, Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.phone_reminder";
//组件标题
const title = {"zh": "来电提醒"};
//组件描述
const description = {"zh": "用灵动通知加语音，提醒重要事项"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
//组件路由地址
const url = "/widget/phone_reminder";
//配置页路由地址
const configUrl = "/widget/config/phone_reminder?win_width=1000";
//组件关键词
const PhoneReminderWidgetDefine = new Widget({
    name: name,
    title: title,
    description: description,
    keywords: keywords,
    lang: "zh",
    url,
    configUrl,
    width: 6,
    height: 4,
    minWidth: 1,
    supportHostedMode: HostedMode.BACKGROUND,
    maxWidth: 2,
    minHeight: 2,
    maxHeight: 2
})

export default PhoneReminderWidgetDefine;
