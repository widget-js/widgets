import consola from 'consola'
import { supabase } from '@/api/supabase'

export function useSupabaseChannel(channelName: string, onCallback: (payload: any) => void) {
  const channel = supabase.channel(channelName)
  channel.on('broadcast', { event: 'wechat-login' }, (payload) => {
    onCallback(payload)
  }).subscribe((status) => {
    consola.log('Supabase channel subscription status:', status)
  })
  return { channel, teardown: channel.teardown }
}
