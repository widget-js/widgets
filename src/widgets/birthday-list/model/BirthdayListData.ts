import { WidgetData } from '@widget-js/core'
import BirthdayListWidgetDefine from '@/widgets/birthday-list/BirthdayList.widget'

export interface BirthdayPeople {
  name: string
  month: number
  day: number
  type: string
  qty: number
  /**
   * 创建的时间戳，用于排序使用
   */
  createdAt: number
}

export default class BirthdayListData extends WidgetData {
  peopleList: BirthdayPeople[] = []
  title = '生日列表'

  constructor() {
    super(BirthdayListWidgetDefine.name)
    this.theme.backgroundColor = '#FB604B'
  }
}
