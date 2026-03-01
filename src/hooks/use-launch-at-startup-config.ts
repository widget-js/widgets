import { ApiConstants, AppApi } from '@widget-js/core'
import { useEffect, useRef, useState } from 'react'

export function useLaunchAtStartupConfig() {
  const [launchAtStartup, setLaunchAtStartup] = useState(true)
  const loadedRef = useRef(false)

  useEffect(() => {
    AppApi.getConfig(ApiConstants.CONFIG_LAUNCH_AT_STARTUP, true).then((startup) => {
      setLaunchAtStartup(startup as boolean)
      loadedRef.current = true
    })
  }, [])

  const updateLaunchAtStartup = async (newValue: boolean) => {
    setLaunchAtStartup(newValue)
    if (loadedRef.current) {
      await AppApi.setConfig(ApiConstants.CONFIG_LAUNCH_AT_STARTUP, newValue)
    }
  }

  return [launchAtStartup, updateLaunchAtStartup] as const
}
