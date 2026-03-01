import type { LucideIcon } from 'lucide-react'
import { BrowserWindowApi, NotificationApi } from '@widget-js/core'
import consola from 'consola'
import {
  ChevronsUpDown,

} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '@/api/supabase'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import UserAvatar from '@/components/user-avatar'
import { useSupabaseChannel } from '@/hooks/use-supabase-channel'

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar?: string
    icon?: LucideIcon
  }
}) {
  const navigate = useNavigate()
  const [loginState, setLoginState] = useState('')

  useEffect(() => {
    const storedState = localStorage.getItem('wechat_login_state')
    if (storedState) { setLoginState(storedState) }
  }, [])

  // Handle Supabase channel for login
  useSupabaseChannel(loginState ? `wechat-login-${loginState}` : '', async (payload: any) => {
    consola.info(payload)
    const currentSession = payload.payload.session
    const loginRes = await supabase.auth.setSession(currentSession)
    if (loginRes.error) {
      NotificationApi.error(loginRes.error.message)
    }
    else {
      navigate('/user/profile')
    }
  })

  const handleLogin = () => {
    const newState = crypto.randomUUID().replace(/-/g, '')
    setLoginState(newState)
    localStorage.setItem('wechat_login_state', newState)

    BrowserWindowApi.openUrl(`https://open.weixin.qq.com/connect/qrconnect?appid=wxf91b19da281f23a9&redirect_uri=https%3A%2F%2Fwidgetjs.cn%2Fapi%2Fv1%2Fuser%2Flogin%2Fwechat%2Fcallback&response_type=code&scope=snsapi_login&state=${newState}#wechat_redirect`, {
      width: 800,
      height: 600,
      frame: true,
      transparent: false,
      titleBarStyle: 'default',
    })
  }

  const handleClick = () => {
    if (user.email) {
      navigate('/user/profile')
    }
    else {
      handleLogin()
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          onClick={handleClick}
        >
          <UserAvatar
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
