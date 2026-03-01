import { AppApi, BrowserWindowApi, NotificationApi, WidgetApi } from '@widget-js/core'
import consola from 'consola'
import { LogOut, Plus, Power, RefreshCcw, Settings, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/api/supabase'
import DeployedWidgetList from '@/components/manager/deployed-widget-list'
import { SocialLinks } from '@/components/tray/social-links'
import { TrayMenuItem } from '@/components/tray/tray-menu-item'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { TooltipProvider } from '@/components/ui/tooltip'
import UserAvatar from '@/components/user-avatar'
import { useAppRuntimeInfo } from '@/hooks/use-app-runtime-info'
import { useSupabaseChannel } from '@/hooks/use-supabase-channel'
import { useUser } from '@/hooks/use-user'

export default function TrayPage() {
  const { t } = useTranslation()
  const { simpleInfo } = useAppRuntimeInfo()
  const [appVersion, setAppVersion] = useState<string>()
  const { loading, user, nickname, avatar } = useUser()
  const [loginState, setLoginState] = useState('')

  useEffect(() => {
    AppApi.getVersion('app').then(setAppVersion)
    const storedState = localStorage.getItem('wechat_login_state')
    if (storedState) { setLoginState(storedState) }
  }, [])

  const shareApp = () => {
    navigator.clipboard.writeText('https://widgetjs.cn')
    NotificationApi.success(t('tray.downloadLinkCopied'))
  }

  const copyAndReport = () => {
    const text = JSON.stringify(simpleInfo, null, 2)
    navigator.clipboard.writeText(text)
    NotificationApi.success(t('tray.infoCopied'))
    BrowserWindowApi.openUrl('https://faq.widgetjs.cn', { external: true })
  }

  const restartWidgets = () => {
    WidgetApi.restartWidgets()
  }

  // Handle Supabase channel for login
  useSupabaseChannel(loginState ? `wechat-login-${loginState}` : '', async (payload: any) => {
    consola.info(payload)
    const currentSession = payload.payload.session
    const loginRes = await supabase.auth.setSession(currentSession)
    if (loginRes.error) {
      NotificationApi.error(loginRes.error.message)
    }
    else {
      AppApi.showAppWindow('/user/profile', {
        width: 1200,
        height: 800,
      })
    }
  })

  const loginPage = () => {
    if (user) {
      AppApi.showAppWindow('/user/profile', {
        width: 1200,
        height: 800,
      })
    }
    else {
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
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background text-foreground select-none overflow-hidden">
        {/* Header */}
        <div className="flex items-center w-full p-4 bg-muted/30">
          <div className="flex w-full gap-2">
            <div
              className="flex gap-2 cursor-pointer items-center hover:opacity-80 transition-opacity"
              onClick={loginPage}
            >
              <UserAvatar src={avatar} className="w-10 h-10 rounded-lg bg-primary" />
              <div className="w-24 truncate font-medium text-sm flex items-center">
                {loading ? t('appInfo.loading') : nickname}
              </div>
            </div>
            <div className="ml-auto flex flex-col items-end text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={() => AppApi.openRuntimeInfoWindow()}>
              <div>
                {t('tray.appVersion')}
                :
                {appVersion}
              </div>
              <div>
                {t('tray.systemVersion')}
                :
                {simpleInfo?.systemName?.replaceAll('Windows', 'Win')}
              </div>
            </div>
          </div>
        </div>

        {/* Widgets List */}
        <div className="flex flex-col gap-2 border-b flex-1 overflow-hidden">
          <div className="px-4 py-2 text-sm font-bold text-muted-foreground">
            {t('tray.runningWidgets')}
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-2 scrollbar-hide">
            <DeployedWidgetList />
          </div>
        </div>

        {/* Menus */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-background">
          <TrayMenuItem
            icon={Plus}
            label={t('tray.addWidget')}
            onClick={() => AppApi.showAppWindow('/widget/search', { width: 1200, height: 800 })}
          />
          <TrayMenuItem
            icon={Settings}
            label={t('tray.settings.title')}
            onClick={() => AppApi.openSettingWindow()}
          />
          <TrayMenuItem
            icon={RefreshCcw}
            label={t('tray.checkUpdates')}
            onClick={() => AppApi.openCheckUpdateWindow()}
          />
          <TrayMenuItem
            icon={Share2}
            label={t('tray.shareApp')}
            onClick={shareApp}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <TrayMenuItem
                icon={Power}
                label={t('tray.restartWidgets')}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('tray.restartWidgets')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('tray.restartWidgetsConfirm')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('tray.no')}</AlertDialogCancel>
                <AlertDialogAction onClick={restartWidgets}>{t('tray.yes')}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <TrayMenuItem
            icon={LogOut}
            label={t('tray.exit')}
            onClick={() => AppApi.exit()}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center py-2 px-4 bg-muted/30 text-sm">
          <SocialLinks />
          <div className="ml-auto cursor-pointer hover:underline text-muted-foreground hover:text-primary" onClick={copyAndReport}>
            {t('tray.suggestions')}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
