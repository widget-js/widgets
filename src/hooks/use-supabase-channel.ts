import consola from 'consola'
import { useEffect, useMemo, useRef } from 'react'
import { supabase } from '@/api/supabase'

export function useSupabaseChannel(channelName: string, onCallback: (payload: any) => void) {
  // Use a ref to store the callback to avoid re-subscribing when the callback function changes
  const onCallbackRef = useRef(onCallback)

  // Update the ref whenever the callback changes
  useEffect(() => {
    onCallbackRef.current = onCallback
  }, [onCallback])

  // Create the channel instance using useMemo to keep it stable across renders
  // unless channelName changes.
  // If channelName is empty, we return null to skip subscription.
  const channel = useMemo(() => {
    if (!channelName) { return null }
    return supabase.channel(channelName)
  }, [channelName])

  useEffect(() => {
    if (!channel) { return }

    // Subscribe to the broadcast event
    channel
      .on('broadcast', { event: 'wechat-login' }, (payload) => {
        if (onCallbackRef.current) {
          onCallbackRef.current(payload)
        }
      })
      .subscribe((status) => {
        consola.log('Supabase channel subscription status:', status)
      })

    // Cleanup function to unsubscribe when component unmounts or channel changes
    return () => {
      channel.unsubscribe()
    }
  }, [channel])

  return {
    channel,
    // Provide a manual unsubscribe method if needed, similar to the 'teardown' in the Vue example
    unsubscribe: () => channel?.unsubscribe(),
  }
}
