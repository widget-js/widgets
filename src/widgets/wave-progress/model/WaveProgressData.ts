export enum ProgressType {
  today = 0,
  toWeek = 1,
  toMonth = 2,
  toYear = 3,
  custom = 4,
}

export interface WaveProgressData {
  // 类型
  progressType: ProgressType

  // 事件名称
  eventName: string

  startDate?: string

  endDate?: string
}

export const DefaultWaveProgressData: WaveProgressData = {
  progressType: ProgressType.today,
  eventName: '今天',
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
}
