import { WidgetData } from '@widget-js/core'

export enum ProgressType {
  today = 0,
  toWeek = 1,
  toMonth = 2,
  toYear = 3,
  custom = 4,
}

export class WaveProgressData extends WidgetData {
  // 类型
  progressType: ProgressType = ProgressType.today

  // 事件名称
  eventName = '今天'

  startDate?: Date

  endDate?: Date

  isLunar?: boolean
}
