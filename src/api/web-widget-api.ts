import type { WidgetSearchOptions } from '@widget-js/web-api'
import request from '@/lib/request'

export const WebWidgetApi = {
  search: (options: WidgetSearchOptions) => {
    return request.get('/widget', {
      params: options,
    })
  },
}
