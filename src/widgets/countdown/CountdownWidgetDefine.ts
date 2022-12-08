import {Widget, WidgetKeyword} from "@widget-js/core";

const name = "com.wisdom.ticker.countdown";
const title = {"zh": "倒计时"};
const description = {"zh": "一个简单的倒计时插件"};
const keywords = [WidgetKeyword.COUNTDOWN, WidgetKeyword.TIMER];
const lang = "zh"
const url = "/widget/countdown";
const configUrl = "/widget/config/countdown";

export const CountdownWidgetDefine = new Widget({
    name, title, description, keywords, lang: lang, url, configUrl, width: 2, height: 2,
});

export const CountdownWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.ticker.countdown" */ './CountDownWidget.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.ticker.countdown.config" */ './CountDownConfig.vue')
    }
]
