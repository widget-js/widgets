import { WidgetData } from '@widget-js/core'
import dayjs from 'dayjs'
import WaterReminderWidget from '@/widgets/water-reminder/WaterReminder.widget'

export class WaterReminderModel extends WidgetData {
  targetCup = 8
  /**
   * 提醒间隔
   */
  interval = 30
  history: Record<string, number> = {}
  lastReminderAt: string = dayjs().toISOString()
  enableReminder = true

  constructor(id?: string) {
    super(WaterReminderWidget.name, id)
  }

  getTodayKey(): string {
    return dayjs().format('YYYY/MM/DD')
  }

  getTodayHistory(): number {
    const history = this.history[this.getTodayKey()]
    if (history) {
      return history
    }

    return 0
  }
}
