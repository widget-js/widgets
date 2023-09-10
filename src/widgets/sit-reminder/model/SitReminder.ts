import { WidgetData } from '@widget-js/core'
import SitReminderWidgetDefine from "@/widgets/sit-reminder/SitReminder.widget";

export class SitReminder extends WidgetData {
  enable = true
  breakInterval = 5
  sitInterval = 30
  mouseCheckInterval = 5

  constructor() {
    super(SitReminderWidgetDefine.name)
  }
}
