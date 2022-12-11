import TimeProgressWidgetRoutes from "@/widgets/time-progress/TimeProgressRoutes";
import ZhihuWidgetRoutes from "@/widgets/zhihu/ZhihuWidgetRoutes";
import WaveProgressRoute from "@/widgets/wave-progress/WaveProgressRoute";
import LaborProgressWidgetRoutes from "@/widgets/labor-progress/LaborProgressRoutes";
import {ClockWidgetRoutes} from "@/widgets/clock/ClockWidgetRoutes";
import BirthdayListWidgetRoutes from "@/widgets/birthday-list/BirthdayListWidgetRoutes";
// IMPORT PLACE, DONT DELETE THIS LINE


const WidgetRouter = [
    ...LaborProgressWidgetRoutes,
    ...ZhihuWidgetRoutes,
    ...WaveProgressRoute,
    ...TimeProgressWidgetRoutes,
    ...ClockWidgetRoutes,
    ...BirthdayListWidgetRoutes
    // ROUTE PLACE, DONT DELETE THIS LINE
];
export default WidgetRouter
