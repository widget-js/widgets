import type { RouteRecordRaw } from 'vue-router'
import TodoListWidgetRoutes from './todo-list/TodoListWidgetRoutes'
import CountdownWidgetRoutes from './countdown/CountdownWidgetRoutes'
import Countdown2WidgetRoutes from './countdown2/Countdown2WidgetRoutes'
import PhoneReminderWidgetRoutes from './phone-reminder/PhoneReminderWidgetRoutes'
import WaterReminderWidgetRoutes from './water-reminder/WaterReminderWidgetRoutes'
import KeyStrokeWidgetRoutes from './key-stroke/KeyStrokeWidgetRoutes'
import PhotoWidgetRoutes from './photo/PhotoWidgetRoutes'
import SitReminderWidgetRoutes from './sit-reminder/SitReminderWidgetRoutes'
import DynamicIslandWidgetRoutes from '@/widgets/dynamic-island/DynamicIslandWidgetRoutes'
import BirthdayListWidgetRoutes from '@/widgets/birthday-list/BirthdayListWidgetRoutes'
import LaborProgressWidgetRoutes from '@/widgets/labor-progress/LaborProgressRoutes'
import WaveProgressRoute from '@/widgets/wave-progress/WaveProgressRoute'
import TimeProgressWidgetRoutes from '@/widgets/time-progress/TimeProgressRoutes'

// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE

const WidgetRouter: RouteRecordRaw[] = [
  ...LaborProgressWidgetRoutes,
  ...WaveProgressRoute,
  ...TimeProgressWidgetRoutes,
  ...BirthdayListWidgetRoutes,
  ...DynamicIslandWidgetRoutes,
  ...TodoListWidgetRoutes,
  ...CountdownWidgetRoutes,
  ...Countdown2WidgetRoutes,
  ...PhoneReminderWidgetRoutes,
  ...WaterReminderWidgetRoutes,
  ...KeyStrokeWidgetRoutes,
  // ...CollectionWidgetRoutes,
  ...PhotoWidgetRoutes,
  ...SitReminderWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
