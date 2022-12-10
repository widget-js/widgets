import {WidgetPackage} from "@widget-js/core";
import ZhihuWidgetDefine from "@/widgets/zhihu/Zhihu.widget";
import {ClockWidgetDefine} from "@/widgets/clock/ClockWidgetDefine";
import {LaborProgressWidgetDefine} from "@/widgets/labor-progress/LaborProgressWidgetDefine";
import {TimeProgressWidgetDefine} from "@/widgets/time-progress/TimeProgressWidgetDefine";

const widgetPackage = new WidgetPackage();
widgetPackage.name = "cn.widgetjs.widgets"
widgetPackage.author = "Widget JS"
widgetPackage.homepage = "https://zujian.fun"
const description = {"zh": "内置基础组件"};
widgetPackage.description = description;
widgetPackage.entry = "index.html"
widgetPackage.version = "0.0.1"
widgetPackage.debugUrl = "http://127.0.0.1:8088/#"

widgetPackage.widgets = [
    ZhihuWidgetDefine,
    ClockWidgetDefine,
    LaborProgressWidgetDefine,
    TimeProgressWidgetDefine
]

export default widgetPackage;
