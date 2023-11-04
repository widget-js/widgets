import { WidgetData } from '@widget-js/core'

export class PhotoData extends WidgetData {
  directory: string = ''
  /**
   * 轮播时长，单位毫秒
   */
  duration: number = 5000

  constructor(name: string, id?: string) {
    super(name, id)
  }
}
