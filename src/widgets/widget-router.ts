import {LaborProgressWidgetRoutes} from "@/widgets/labor-progress/LaborProgressWidgetDefine";
import {ZhihuWidgetRoutes} from "@/widgets/zhihu/ZhihuWidgetDefine";
import {WaveProgressWidgetRoutes} from "@/widgets/wave-progress/WaveProgressWidgetDefine";
import {TimeProgressWidgetRoutes} from "@/widgets/time-progress/TimeProgressWidgetDefine";
import {ClockWidgetRoutes} from "@/widgets/clock/ClockWidgetDefine";
// IMPORT PLACE, DONT DELETE THIS LINE

const WidgetRouter = [
    ...LaborProgressWidgetRoutes,
    ...ZhihuWidgetRoutes,
    ...WaveProgressWidgetRoutes,
    ...TimeProgressWidgetRoutes,
    ...ClockWidgetRoutes
    // ROUTE PLACE, DONT DELETE THIS LINE
];
export default WidgetRouter
