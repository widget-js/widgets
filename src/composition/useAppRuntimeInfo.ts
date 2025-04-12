import type { AppRuntimeInfo } from '@widget-js/core'
import { AppApi } from '@widget-js/core'
import { computed, ref } from 'vue'

export type SimpleAppRuntimeInfo = Omit<AppRuntimeInfo, 'chrome' | 'node' | 'appPath' | 'platform' | 'v8'>
export function useAppRuntimeInfo() {
  const info = ref<AppRuntimeInfo>()

  AppApi.getRuntimeInfo().then((data) => {
    // sort keys
    const res = Object.keys(data).sort().reduce((obj, key) => {
      obj[key] = data[key]
      return obj
    }, {})
    info.value = res as AppRuntimeInfo
  })

  const simpleInfo = computed<SimpleAppRuntimeInfo | undefined>(() => {
    if (info.value) {
      const simple: SimpleAppRuntimeInfo = {
        app: info.value.app,
        cpuModel: info.value.cpuModel,
        arch: info.value.arch,
        electron: info.value.electron,
        release: info.value.release,
        isWindowsStore: info.value.isWindowsStore,
        totalMem: info.value.totalMem,
        systemName: info.value.systemName,
      }
      return simple
    }
    return undefined
  })

  return { info, simpleInfo }
}
