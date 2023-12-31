import { WidgetData } from '@widget-js/core'
import dayjs from 'dayjs'

export class WaterReminderModel extends WidgetData {
  targetCup = 8
  /**
   * 提醒间隔
   */
  interval = 30
  history: Record<string, number> = {}
  lastReminderAt: string = dayjs().toISOString()
  enableReminder = true

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
