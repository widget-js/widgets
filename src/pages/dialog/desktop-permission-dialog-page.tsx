import type { DesktopPermissionResult } from '@widget-js/core'
import { DesktopApi, ElectronUtils } from '@widget-js/core'
import { Image, Monitor, ShieldAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const DIALOG_RESULT_CHANNEL = 'desktop-permission-dialog-result'
const DIALOG_SET_LOADING_CHANNEL = 'desktop-permission-dialog-set-loading'
const DIALOG_CLOSE_CHANNEL = 'desktop-permission-dialog-close'

export default function DesktopPermissionDialogPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const submittingRef = useRef(false)
  const action = searchParams.get('action')
  const widgetName = searchParams.get('widgetName')
  const isWidget = action === DesktopApi.PERMISSION_SET_WALLPAPER_WIDGET
  const validAction = isWidget || action === DesktopApi.PERMISSION_SET_WALLPAPER
  const title = t(isWidget ? 'desktopPermission.widgetTitle' : 'desktopPermission.wallpaperTitle')
  const TargetIcon = isWidget ? Monitor : Image

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    if (!ElectronUtils.hasElectronApi()) { return }
    const api = ElectronUtils.getAPI()
    const handleLoading = (value: boolean) => {
      submittingRef.current = value
      setLoading(value)
    }
    const handleClose = () => window.close()
    api.addIpcListener(DIALOG_SET_LOADING_CHANNEL, handleLoading)
    api.addIpcListener(DIALOG_CLOSE_CHANNEL, handleClose)
    return () => {
      api.removeIpcListener(DIALOG_SET_LOADING_CHANNEL, handleLoading)
      api.removeIpcListener(DIALOG_CLOSE_CHANNEL, handleClose)
    }
  }, [])

  const sendResult = (result: DesktopPermissionResult) => {
    if (submittingRef.current || !ElectronUtils.hasElectronApi()) { return }
    if (!validAction && result !== DesktopApi.RESULT_DENY) { return }
    submittingRef.current = true
    setLoading(true)
    ElectronUtils.getAPI().sendIpc(DIALOG_RESULT_CHANNEL, result)
  }

  return (
    <AlertDialog open>
      <AlertDialogContent
        onEscapeKeyDown={(event) => {
          event.preventDefault()
          sendResult(DesktopApi.RESULT_DENY)
        }}
        className="!inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !max-w-none !w-screen !h-screen rounded-none border-0 p-0 overflow-hidden !flex !flex-col !gap-0"
      >
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="px-6 py-6 max-w-3xl w-full mx-auto space-y-5 text-left">
            <div className="flex items-start gap-4">
              <div className="shrink-0 p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <ShieldAlert className="size-6" />
              </div>
              <div className="min-w-0 space-y-2">
                <AlertDialogTitle className="text-lg break-words">{title}</AlertDialogTitle>
                <AlertDialogDescription className="whitespace-pre-wrap break-words">
                  {t(isWidget ? 'desktopPermission.widgetMessage' : 'desktopPermission.wallpaperMessage', {
                    name: widgetName || t('desktopPermission.application'),
                  })}
                </AlertDialogDescription>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
              <TargetIcon className="size-5 shrink-0 text-muted-foreground mt-0.5" />
              <div className="min-w-0 space-y-1">
                <div className="text-xs text-muted-foreground">{t('desktopPermission.target')}</div>
                <div className="text-sm font-medium">{t(isWidget ? 'permissions.actions.setWallpaperWidget' : 'permissions.actions.setWallpaper')}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('desktopPermission.rememberHint')}</p>
            {!validAction && <p role="alert" className="text-sm text-destructive">{t('desktopPermission.invalidAction')}</p>}
          </div>
        </div>
        <AlertDialogFooter className="shrink-0 bg-muted/40 border-t px-4 py-3 justify-end gap-3 flex-row">
          <Button variant="outline" disabled={loading} onClick={() => sendResult(DesktopApi.RESULT_DENY)}>
            {t('desktopPermission.deny')}
          </Button>
          <Button variant="secondary" disabled={loading || !validAction} onClick={() => sendResult(DesktopApi.RESULT_ALLOW_ONCE)}>
            {t('desktopPermission.allowOnce')}
          </Button>
          <Button autoFocus disabled={loading || !validAction} onClick={() => sendResult(DesktopApi.RESULT_ALLOW)}>
            {loading && <Spinner />}
            {t('desktopPermission.allow')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
