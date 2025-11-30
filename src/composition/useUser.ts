import type { User } from '@supabase/auth-js'
import { UserApi } from '@widget-js/core'
import consola from 'consola'
import { computed, ref } from 'vue'
import { supabase } from '@/api/supabase'

const user = ref<User | null>(null)

supabase.auth.onAuthStateChange((event, session) => {
  consola.info('onAuthStateChange', event, session)
  if (event === 'SIGNED_OUT') {
    user.value = null
    UserApi.logout()
  }
  else if (event === 'USER_UPDATED') {
    user.value = session!.user
    UserApi.updateUser(session!.user)
  }
  else if (event === 'SIGNED_IN') {
    user.value = session!.user
    supabase.auth.startAutoRefresh()
    UserApi.login(session!)
  }
  else if (event === 'TOKEN_REFRESHED') {
    UserApi.updateSession(session!)
  }
})

export function useUser(onload?: (user?: User) => void) {
  const loading = ref(false)
  const nickname = computed(() => {
    if (user.value) {
      if (user.value.user_metadata.nickname) {
        return user.value.user_metadata.nickname
      }
      if (user.value.email) {
        return user.value.email.split('@')[0]
      }
      return 'User'
    }
    return '未登录'
  })

  const userId = computed(() => {
    return user.value?.id || ''
  })

  const avatar = computed(() => {
    return user.value?.user_metadata?.avatar || ''
  })

  function refreshUser() {
    loading.value = true
    supabase.auth.getUser().then(({ data }) => {
      user.value = data.user
      onload?.(data.user || undefined)
    }).finally(() => {
      loading.value = false
    })
  }

  refreshUser()
  return { user, refreshUser, loading, nickname, avatar, userId }
}
