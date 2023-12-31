import type { Ref } from 'vue'
import { ref } from 'vue'
import { WidgetData } from '@widget-js/core'

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function useWidgetF(): Ref<WidgetData> {
  const widgetData = ref(new WidgetData('asd'))
  return widgetData
}
