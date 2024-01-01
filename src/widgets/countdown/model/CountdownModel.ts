import { WidgetData } from '@widget-js/core'
import dayjs from 'dayjs'
import { DateType } from '@/countdown/Event'

export class CountdownModel extends WidgetData {
  static DEFAULT_DATE = dayjs().set('year', dayjs().get('year') + 1).set('month', 0).set('date', 1).toDate()
  title = '新年'
  date: string = CountdownModel.DEFAULT_DATE.toISOString()
  dateType = DateType.SOLAR

  constructor(name: string, id?: string) {
    super(name, id)
    this.theme.backgroundColor = '#FFF'
    this.theme.primaryColor = '#FFC455'
  }
}
