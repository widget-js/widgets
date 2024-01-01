import { WidgetData } from '@widget-js/core'

export class PhotoData extends WidgetData {
  directory = ''
  /**
   * 轮播时长，单位毫秒
   */
  duration = 5000
  random = false

  constructor(name: string, id?: string) {
    super(name, id)
  }
}
