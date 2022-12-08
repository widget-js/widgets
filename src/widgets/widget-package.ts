import {WidgetPackage} from "@widget-js/core";
import {ZhihuWidgetDefine} from "@/widgets/zhihu/ZhihuWidgetDefine";
import {WaveProgressWidgetDefine} from "@/widgets/wave-progress/WaveProgressWidgetDefine";
import {ClockWidgetDefine} from "@/widgets/clock/ClockWidgetDefine";
import {LaborProgressWidgetDefine} from "@/widgets/labor-progress/LaborProgressWidgetDefine";
import {TimeProgressWidgetDefine} from "@/widgets/time-progress/TimeProgressWidgetDefine";

const widgetPackage = new WidgetPackage();
widgetPackage.name = "fun.zujian.widgets"
widgetPackage.author = "Widget JS"
widgetPackage.homepage = "https://zujian.fun"
const description = {"zh": "内置基础组件"};
widgetPackage.description = description;
widgetPackage.entry = "index.html"
widgetPackage.version = "0.0.1"

widgetPackage.widgets = [
    ZhihuWidgetDefine,
    WaveProgressWidgetDefine,
    ClockWidgetDefine,
    LaborProgressWidgetDefine,
    TimeProgressWidgetDefine
]

export default widgetPackage;
