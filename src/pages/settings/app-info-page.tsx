import type { AppVersion } from '@/model/app-version'
import { ElectronUtils, SystemApi } from '@widget-js/core'
import consola from 'consola'
import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useAppRuntimeInfo } from '@/hooks/use-app-runtime-info'
import VersionUtils from '@/utils/version-utils'

export default function AppInfoPage() {
  const { t } = useTranslation()
  const { simpleInfo } = useAppRuntimeInfo()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [appVersion, setAppVersion] = useState<AppVersion | null>(null)
  const [hasNewVersion, setHasNewVersion] = useState(false)

  const checkNewVersion = () => {
    setLoading(true)
    setError(null)
    setAppVersion(null)
    setHasNewVersion(false)

    VersionUtils.checkNewVersion(
      (version: AppVersion) => {
        setAppVersion(version)
        setHasNewVersion(true)
      },
      (err: any) => {
        setError(err.message || 'Check update failed')
        consola.error(err)
      },
      () => {
        setLoading(false)
      },
    )
  }

  // Initial check on mount
  useEffect(() => {
    document.title = t('appInfo.title')
    checkNewVersion()
  }, [t])

  const upgrade = async () => {
    if (!appVersion) { return }
    setLoading(true)
    try {
      await ElectronUtils.getAPI().invoke('upgradeApp', JSON.stringify(appVersion))
    }
    catch (e) {
      consola.error(e)
      setError('Upgrade failed')
    }
    finally {
      setLoading(false)
    }
  }

  const renderValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value)
    }
    return String(value)
  }

  const copyInfo = () => {
    if (!simpleInfo) { return }
    const text = Object.entries(simpleInfo)
      .map(([key, value]) => `${key}: ${renderValue(value)}`)
      .join('\n')
    navigator.clipboard.writeText(text)
    toast.success(t('tray.infoCopied'))
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('appInfo.title')}</CardTitle>
          <Button variant="ghost" size="icon" onClick={copyInfo}>
            <Copy className="size-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {simpleInfo
              ? (
                  Object.keys(simpleInfo).map(key => (
                    <div key={key} className="grid grid-cols-[120px_1fr] items-start gap-4 text-sm">
                      <span className="font-medium text-muted-foreground text-right">
                        {key}
                        :
                      </span>
                      <span className="break-all font-mono">
                        {renderValue((simpleInfo as any)[key])}
                      </span>
                    </div>
                  ))
                )
              : (
                  <div className="flex justify-center p-4">
                    <Spinner className="size-6" />
                  </div>
                )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('update.windowTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[64px] flex items-center justify-center">
            {loading
              ? (
                  <Spinner className="size-6" />
                )
              : error
                ? (
                    <div className="text-destructive text-center w-full">{error}</div>
                  )
                : hasNewVersion && appVersion
                  ? (
                      <div className="space-y-4 w-full text-left">
                        <h4 className="font-medium text-lg">
                          {t('update.newVersionDetect')}
                          {' '}
                          {appVersion.version}
                        </h4>
                        <pre className="text-sm bg-muted p-4 rounded-md whitespace-pre-wrap font-sans">
                          {appVersion.releaseNote}
                        </pre>
                      </div>
                    )
                  : (
                      <div className="text-center text-muted-foreground w-full">
                        {t('update.alreadyLatestVersion')}
                      </div>
                    )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Button variant="outline" onClick={() => SystemApi.launchStoreDetailsPage()}>
            {t('update.storePage')}
          </Button>
          {!loading && (
            hasNewVersion
              ? (
                  <Button onClick={upgrade}>
                    {t('update.update')}
                  </Button>
                )
              : (
                  <Button onClick={checkNewVersion}>
                    {t('update.check')}
                  </Button>
                )
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
