import { BrowserWindowApi, NotificationApi } from '@widget-js/core'
import consola from 'consola'
import { Lock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/api/supabase'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { useSupabaseChannel } from '@/hooks/use-supabase-channel'
import { useUser } from '@/hooks/use-user'

interface LoginCheckProps {
  children: React.ReactNode
}

export function LoginCheck({ children }: LoginCheckProps) {
  const { user, loading: userLoading } = useUser()
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
      toast.success('登录成功')
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

  if (!user && !userLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Lock className="h-6 w-6" />
            </EmptyMedia>
            <EmptyTitle>需要登录</EmptyTitle>
            <EmptyDescription>
              请先登录账号以继续使用
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={handleLogin}>
              立即登录
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return <>{children}</>
}
