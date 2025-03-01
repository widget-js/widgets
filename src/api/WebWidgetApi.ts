import type { Pagination, WebWidget, WidgetSearchOptions } from '@widget-js/web-api'
import { widgetServerApi } from '@/api/axios'

export class WebWidgetApi {
  static search(options: WidgetSearchOptions): Promise<Pagination<WebWidget>> {
    return widgetServerApi.get('/widget', { params: options })
  }
}
