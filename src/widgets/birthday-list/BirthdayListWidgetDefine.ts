import {Widget, WidgetKeyword} from "@widget-js/core";
//TODO 修改组件信息，标题，描述，关键词
const name = "cn.widgetjs.widgets.birthday_list";
//组件标题
const title = {"zh": "生日列表"};
//组件描述
const desc = {"zh": "自动倒计时的生日列表"};
//组件关键词
const keywords = [WidgetKeyword.RECOMMEND];
const lang = "zh"
const url = "/widget/birthday_list";
const configUrl = "/widget/config/birthday_list";
export const BirthdayListWidgetDefine = new Widget({
    name: name,
    title: title,
    description: desc,
    keywords: keywords,
    lang: "zh",
    url: url,
    configUrl: configUrl,
    width: 4,
    height: 4,
    minWidth: 3,
    maxWidth: 4,
    minHeight: 3,
    maxHeight: 6
})
export const BirthdayListWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.birthday_list" */ './BirthdayListWidgetView.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.birthday_list.config" */ './BirthdayListConfigView.vue')
    }
]


