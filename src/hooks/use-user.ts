import type { User } from '@supabase/supabase-js'
import { UserApi } from '@widget-js/core'
import consola from 'consola'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '@/api/supabase'

// Global state to mimic Vue's global ref behavior
let globalUser: User | null = null
const listeners = new Set<(user: User | null) => void>()

function notifyListeners() {
  listeners.forEach(listener => listener(globalUser))
}

function setGlobalUser(user: User | null) {
  globalUser = user
  notifyListeners()
}

// Initialize the auth listener once (outside the hook)
supabase.auth.onAuthStateChange((event, session) => {
  consola.info('onAuthStateChange', event, session)
  if (event === 'SIGNED_OUT') {
    setGlobalUser(null)
    UserApi.logout()
  }
  else if (event === 'USER_UPDATED') {
    setGlobalUser(session?.user ?? null)
    if (session?.user) {
      UserApi.updateUser(session.user)
    }
  }
  else if (event === 'SIGNED_IN') {
    setGlobalUser(session?.user ?? null)
    supabase.auth.startAutoRefresh()
    if (session) {
      UserApi.login(session)
    }
  }
  else if (event === 'TOKEN_REFRESHED') {
    if (session) {
      UserApi.updateSession(session)
    }
  }
})

export function useUser(onload?: (user?: User) => void) {
  const [user, setUser] = useState<User | null>(globalUser)
  const [loading, setLoading] = useState(false)

  // Use a ref for the callback to avoid re-triggering effects if the callback is unstable
  const onloadRef = useRef(onload)

  useEffect(() => {
    onloadRef.current = onload
  }, [onload])

  // Sync local state with global state
  useEffect(() => {
    const listener = (newUser: User | null) => {
      setUser(newUser)
    }
    listeners.add(listener)

    // Check if global state changed while we were setting up
    if (globalUser !== user) {
      setUser(globalUser)
    }

    return () => {
      listeners.delete(listener)
    }
  }, [user])

  const refreshUser = useCallback(() => {
    setLoading(true)
    supabase.auth.getUser().then(({ data }) => {
      setGlobalUser(data.user)
      onloadRef.current?.(data.user || undefined)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  // Initial refresh on mount
  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const nickname = useMemo(() => {
    if (user) {
      if (user.user_metadata?.nickname) {
        return user.user_metadata.nickname
      }
      if (user.email) {
        return user.email.split('@')[0]
      }
      return 'User'
    }
    return '未登录'
  }, [user])

  const userId = useMemo(() => {
    return user?.id || ''
  }, [user])

  const avatar = useMemo(() => {
    return user?.user_metadata?.avatar || ''
  }, [user])

  return { user, refreshUser, loading, nickname, avatar, userId }
}
