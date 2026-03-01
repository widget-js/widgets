import type { AppRuntimeInfo } from '@widget-js/core'
import { AppApi } from '@widget-js/core'
import { useEffect, useMemo, useState } from 'react'

export type SimpleAppRuntimeInfo = Omit<AppRuntimeInfo, 'chrome' | 'node' | 'appPath' | 'platform' | 'v8'>

export function useAppRuntimeInfo() {
  const [info, setInfo] = useState<AppRuntimeInfo>()

  useEffect(() => {
    AppApi.getRuntimeInfo().then((data) => {
      const res = Object.keys(data).sort().reduce((obj: any, key: any) => {
        obj[key] = (data as any)[key]
        return obj
      }, {})
      setInfo(res as AppRuntimeInfo)
    })
  }, [])

  const simpleInfo = useMemo<SimpleAppRuntimeInfo | undefined>(() => {
    if (info) {
      const { ...simple } = info
      return simple
    }
    return undefined
  }, [info])

  return { info, simpleInfo }
}
