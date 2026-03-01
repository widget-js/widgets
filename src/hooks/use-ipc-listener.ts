import type { Channel } from '@widget-js/core'
import { ElectronApi } from '@widget-js/core'
import { useEffect, useRef } from 'react'

export function useIpcListener(channel: Channel | string, callback: (...args: any[]) => void) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (...args: any[]) => {
      callbackRef.current(...args)
    }
    ElectronApi.addIpcListener(channel, handler)
    return () => {
      ElectronApi.removeIpcListener(channel)
    }
  }, [channel])
}
