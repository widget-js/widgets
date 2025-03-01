import type { LanguageCode } from '@widget-js/core'
import { AppApi } from '@widget-js/core'
import { onMounted, ref, watch } from 'vue'

export function useDebugConfig(onLoad?: (debug: boolean) => void) {
  const debugMode = ref(false)
  onMounted(async () => {
    debugMode.value = await AppApi.getDevMode()
    onLoad?.(debugMode.value)
    watch(debugMode, async (newValue) => {
      await AppApi.setDevMode(newValue)
    })
  })
  return debugMode
}

export function useCellSizeConfig() {
  const gridSize = ref(80)
  onMounted(async () => {
    gridSize.value = await AppApi.getGridCellSize()
    watch(gridSize, async (newValue) => {
      await AppApi.setGridCellSize(newValue)
    })
  })

  return gridSize
}

export function useLanguageConfig() {
  const languageCode = ref(navigator.language)
  let inited = false
  AppApi.getLanguageCode().then((result) => {
    languageCode.value = result
    inited = true
  })

  watch(languageCode, async (newValue) => {
    if (inited) {
      await AppApi.setLanguageCode(newValue as LanguageCode)
    }
  })
  return languageCode
}
