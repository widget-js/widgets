import type { BroadcastEvent, LanguageCode } from '@widget-js/core'
import { AppApi, AppApiEvent } from '@widget-js/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppBroadcast } from './use-app-broadcast'

export interface UseAppLanguageOption {
  onLoad?: (code: string) => void
  onChange?: (code: string) => void
}

export function useAppLanguage(options?: UseAppLanguageOption) {
  const [languageCode, setLanguageCode] = useState<string>(navigator.language)
  const loadedRef = useRef(false)

  useEffect(() => {
    AppApi.getLanguageCode().then((result) => {
      setLanguageCode(result)
      loadedRef.current = true
      options?.onLoad?.(result)
    })
  }, []) // Empty dependency array means this runs once on mount

  const handleBroadcast = useCallback((event: BroadcastEvent) => {
    if (event.event === AppApiEvent.LANGUAGE_CHANGED) {
      if (languageCode !== event.payload && typeof event.payload === 'string') {
        setLanguageCode(event.payload)
        options?.onChange?.(event.payload)
      }
    }
  }, [languageCode, options])

  useAppBroadcast([AppApiEvent.LANGUAGE_CHANGED], handleBroadcast)

  const updateLanguageCode = async (newCode: string) => {
    setLanguageCode(newCode)
    if (loadedRef.current) {
      await AppApi.setLanguageCode(newCode as LanguageCode)
    }
  }

  return [languageCode, updateLanguageCode] as const
}
