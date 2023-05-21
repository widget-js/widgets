import { WidgetData } from '@widget-js/core'

export class PhotoData extends WidgetData {
  directory: string = ''

  constructor(name: string, id?: string) {
    super(name, id)
  }
}
