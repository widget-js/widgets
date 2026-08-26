import type { User } from '@supabase/supabase-js'
import { UserApi } from '@widget-js/core'
import consola from 'consola'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '@/api/supabase'

let globalUser: User | null = null
const listeners = new Set<(user: User | null) => void>()
let authListenerInitialized = false

function notifyListeners() {
  listeners.forEach(listener => listener(globalUser))
}

function setGlobalUser(user: User | null) {
  globalUser = user
  notifyListeners()
}

function initAuthListener() {
  if (authListenerInitialized) {
    return
  }
  authListenerInitialized = true

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
}

async function hydrateFromLocalSession() {
  try {
    const { data } = await supabase.auth.getSession()
    if (data.session?.user) {
      globalUser = data.session.user
    }
  }
  catch (e) {
    consola.warn('hydrate session failed', e)
  }
  finally {
    notifyListeners()
  }
}

initAuthListener()
hydrateFromLocalSession()

export function useUser(onload?: (user?: User) => void) {
  const [user, setUser] = useState<User | null>(globalUser)
  const [loading, setLoading] = useState(false)

  const onloadRef = useRef(onload)

  useEffect(() => {
    onloadRef.current = onload
  }, [onload])

  useEffect(() => {
    const listener = (newUser: User | null) => {
      setUser(newUser)
    }
    listeners.add(listener)

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

  useEffect(() => {
    const run = () => {
      if ('requestIdleCallback' in window) {
        const handle = window.requestIdleCallback(() => refreshUser(), { timeout: 3000 })
        return () => window.cancelIdleCallback(handle)
      }
      else {
        const timer = setTimeout(refreshUser, 600)
        return () => clearTimeout(timer)
      }
    }
    return run()
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
