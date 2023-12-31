import { WidgetData } from '@widget-js/core'
import SitReminderWidgetDefine from '@/widgets/sit-reminder/SitReminder.widget'

export class SitReminder extends WidgetData {
  enable = true
  breakInterval = 5
  sitInterval = 30
  mouseCheckInterval = 5
  name = SitReminderWidgetDefine.name

  constructor() {
    super(SitReminderWidgetDefine.name)
  }

  getThemeProperties(): Record<string, string> {
    return super.getThemeProperties()
  }

  injectThemeProperties() {
    super.injectThemeProperties()
  }
}
