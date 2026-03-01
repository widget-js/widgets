import type { BroadcastEvent, BroadcastEventType } from '@widget-js/core'
import { BroadcastApi, Channel } from '@widget-js/core'
import { useEffect, useRef } from 'react'
import { useIpcListener } from './use-ipc-listener'

export function useAppBroadcast(
  events: BroadcastEventType[],
  callback: (event: BroadcastEvent) => void,
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    BroadcastApi.register(...events)
    return () => {
      BroadcastApi.unregister(...events)
    }
  }, [JSON.stringify(events)])

  useIpcListener(Channel.BROADCAST, (...args: any[]) => {
    const event = args[0] as BroadcastEvent
    if (events.includes(event.event)) {
      callbackRef.current(event)
    }
  })
}
