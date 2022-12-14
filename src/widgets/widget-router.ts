import TimeProgressWidgetRoutes from "@/widgets/time-progress/TimeProgressRoutes";
import ZhihuWidgetRoutes from "@/widgets/zhihu/ZhihuWidgetRoutes";
import WaveProgressRoute from "@/widgets/wave-progress/WaveProgressRoute";
import LaborProgressWidgetRoutes from "@/widgets/labor-progress/LaborProgressRoutes";
import {ClockWidgetRoutes} from "@/widgets/clock/ClockWidgetRoutes";
import BirthdayListWidgetRoutes from "@/widgets/birthday-list/BirthdayListWidgetRoutes";
import GlitchWidgetRoutes from "./glitch/GlitchWidgetRoutes";
import DynamicIslandWidgetRoutes from "@/widgets/dynamic-island/DynamicIslandWidgetRoutes";
import MickeyClockWidgetRoutes from "@/widgets/mickey-clock/MickeyClockWidgetRoutes";
import LyricBookWidgetRoutes from "@/widgets/lyric-book/LyricBookWidgetRoutes";
import TodoListWidgetRoutes from "./todo-list/TodoListWidgetRoutes";
import CountdownWidgetRoutes from "./countdown/CountdownWidgetRoutes";
//FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE


const WidgetRouter = [
    ...LaborProgressWidgetRoutes,
    ...ZhihuWidgetRoutes,
    ...WaveProgressRoute,
    ...TimeProgressWidgetRoutes,
    ...ClockWidgetRoutes,
    ...BirthdayListWidgetRoutes,
    ...GlitchWidgetRoutes,
    ...DynamicIslandWidgetRoutes,
    ...MickeyClockWidgetRoutes,
    ...LyricBookWidgetRoutes,
    ...TodoListWidgetRoutes,
    ...CountdownWidgetRoutes,
    //FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
];
export default WidgetRouter
