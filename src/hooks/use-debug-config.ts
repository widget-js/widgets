import { AppApi } from '@widget-js/core'
import { useEffect, useRef, useState } from 'react'

export function useDebugConfig(onLoad?: (debug: boolean) => void) {
  const [debugMode, setDebugMode] = useState(false)
  const loadedRef = useRef(false)

  useEffect(() => {
    AppApi.getDevMode().then((mode) => {
      setDebugMode(mode)
      loadedRef.current = true
      onLoad?.(mode)
    })
  }, [onLoad])

  const updateDebugMode = async (newMode: boolean) => {
    setDebugMode(newMode)
    if (loadedRef.current) {
      await AppApi.setDevMode(newMode)
    }
  }

  return [debugMode, updateDebugMode] as const
}
