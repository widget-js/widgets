import {LaborProgressWidgetRoutes} from "@/widgets/labor-progress/LaborProgressWidgetDefine";
import {TimeProgressWidgetRoutes} from "@/widgets/time-progress/TimeProgressWidgetDefine";
import {ClockWidgetRoutes} from "@/widgets/clock/ClockWidgetDefine";
import WaveProgressWidgetDefine from "@/widgets/wave-progress/WaveProgress.widget";
import ZhihuWidgetDefine from "@/widgets/zhihu/Zhihu.widget";
// IMPORT PLACE, DONT DELETE THIS LINE
const WaveProgressRoute = [
    {
        path: WaveProgressWidgetDefine.url,
        name: `${WaveProgressWidgetDefine.name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.wave_progress" */ './wave-progress/WaveProgressWidgetView.vue')
    },
    {
        path: WaveProgressWidgetDefine.configUrl!,
        name: `${WaveProgressWidgetDefine.name}.config`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.wave_progress.config" */ './wave-progress/WaveProgressConfigView.vue')
    },
]

const ZhihuWidgetRoutes = [
    {
        path: ZhihuWidgetDefine.url,
        name: `${ZhihuWidgetDefine.name}`,
        component: () => import(/* webpackChunkName: "cn.widgetjs.widgets.zhihu" */ './zhihu/ZhihuWidgetView.vue')
    }
]

const WidgetRouter = [
    ...LaborProgressWidgetRoutes,
    ...ZhihuWidgetRoutes,
    ...WaveProgressRoute,
    ...TimeProgressWidgetRoutes,
    ...ClockWidgetRoutes
    // ROUTE PLACE, DONT DELETE THIS LINE
];
export default WidgetRouter
