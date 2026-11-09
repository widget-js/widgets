import type { WallpaperState } from '@widget-js/core'
import type { WebWidget } from '@widget-js/web-api'
import {
  AppApi,
  BrowserWindowApi,
  DeployedWidgetApi,
  DeployMode,
  DesktopApi,
  ElectronUtils,
  NotificationApi,
  WidgetApi,
  WidgetPackageUtils,
} from '@widget-js/core'
import { ArrowUpCircle, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import semver from 'semver'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDebugConfig } from '@/hooks/use-debug-config'
import { useWidgetPackage } from '@/hooks/use-widget-package'
import WidgetUtil from '@/utils/widget-util'
import WidgetContainer from './widget-container'

interface SearchItemProps {
  widget: WebWidget
}

export function SearchItem({ widget }: SearchItemProps) {
  const { t, i18n } = useTranslation()
  const [isDev] = useDebugConfig()
  const [isWidgetHosted, setIsWidgetHosted] = useState(false)
  const [adding, setAdding] = useState(false)
  const [wallpaperState, setWallpaperState] = useState<WallpaperState>({ status: 'idle', recoveryAttempts: 0, revision: -1 })
  const isWallpaper = widget.supportDeployMode === DeployMode.WALLPAPER
  // WebWidget may inherit an older SDK implementation that only checks configPagePath.
  const isConfigurable = !!(widget.configPage?.path || widget.configPagePath)
  const wallpaperActive = wallpaperState.widgetName === widget.name
    && ['loading', 'running', 'recovering'].includes(wallpaperState.status)

  useEffect(() => {
    if (!isWallpaper || !ElectronUtils.hasElectronApi()) { return }
    let disposed = false
    const update = (state: WallpaperState) => {
      if (!disposed && state) { setWallpaperState(previous => state.revision >= previous.revision ? state : previous) }
    }
    const unsubscribe = DesktopApi.onStateChanged(update)
    DesktopApi.getState().then(update).catch(console.error)
    return () => {
      disposed = true
      unsubscribe()
    }
  }, [isWallpaper])

  const closeWallpaper = async () => {
    try {
      const permission = await DesktopApi.requestPermission({ action: DesktopApi.PERMISSION_SET_WALLPAPER_WIDGET })
      if (permission === DesktopApi.RESULT_DENY) { return }
      await DesktopApi.close(widget.name)
    }
    catch (error) { NotificationApi.error(String(error)) }
  }

  const updateWidgetAdd = useCallback(async () => {
    if (widget.isSupportBackground()) {
      // @ts-ignore
      const widgets = await DeployedWidgetApi.getDeployedWidgets(widget.name)
      if (widgets) {
        setIsWidgetHosted(widgets.length > 0)
      }
      else {
        setIsWidgetHosted(false)
      }
    }
  }, [widget])

  useEffect(() => {
    updateWidgetAdd()
  }, [updateWidgetAdd])

  const remotePackage = widget.package
  const { upgradable, upgrading, checkUpgrade, upgradePackage } = useWidgetPackage(
    widget.packageName!,
    remotePackage?.version ?? '0.0.0',
    remotePackage?.remote,
  )

  useEffect(() => {
    checkUpgrade()
  }, [checkUpgrade])

  const removeWidget = async () => {
    await DeployedWidgetApi.removeDeployedWidgetByName(widget.name)
    await updateWidgetAdd()
  }

  const openDevTools = () => {
    if (isWallpaper) {
      DesktopApi.openDevTools(widget.name).catch(error => NotificationApi.error(String(error)))
    }
    else { DeployedWidgetApi.openDevTools(widget.name) }
  }

  const addWidget = async (mode: DeployMode) => {
    try {
      setAdding(true)
      let versionPass = true
      const appVersion = await AppApi.getVersion('app')

      if (widget.requiredAppVersion && appVersion) {
        if (semver.gte(appVersion, widget.requiredAppVersion)) {
          versionPass = true
        }
        else {
          versionPass = false
          NotificationApi.error(t('update.upgradeToNew', 'Please upgrade app'))
        }
      }

      if (versionPass) {
        const url = widget.package?.remote
          ? WidgetPackageUtils.getRemotePackageJsonUrl(widget.package?.remote)
          : undefined

        if (mode === DeployMode.WALLPAPER) {
          const permission = await DesktopApi.requestPermission({ action: DesktopApi.PERMISSION_SET_WALLPAPER_WIDGET })
          if (permission === DesktopApi.RESULT_DENY) { return }
          await DesktopApi.setWallpaperWidget({ widgetName: widget.name, packageJsonUrl: url })
          return
        }
        await DeployedWidgetApi.addWidget({
          widgetName: widget.name,
          deployMode: mode,
          packageJsonUrl: url,
        })
      }
    }
    catch (error) {
      NotificationApi.error(String(error))
    }
    finally {
      setAdding(false)
    }
  }

  const addBackgroundWidget = async () => {
    await addWidget(DeployMode.BACKGROUND)
    await updateWidgetAdd()
  }

  const openBackgroundWidgetSettings = async () => {
    WidgetApi.openConfigPageByName(widget.name)
  }

  const onClickAddNormal = async () => {
    await addWidget(DeployMode.NORMAL)
  }

  // Helper to get localized text
  const getLocalizedText = (obj: any) => {
    if (typeof obj === 'string') { return obj }
    if (!obj) { return '' }
    return obj[i18n.language] || obj.en || Object.values(obj)[0] || ''
  }

  const title = getLocalizedText(widget.title)
  const description = getLocalizedText(widget.description)

  return (
    <Card className="flex flex-col p-4 rounded-xl mb-5 items-center relative shadow-sm">
      {adding && (
        <div className="absolute inset-0 bg-card/50 flex items-center justify-center z-10 rounded-xl backdrop-blur-[1px]">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      )}

      <div className="flex w-full">
        <div className="flex flex-col items-start">
          <span className="text-base font-bold mb-2">{title}</span>
          <span className="text-muted-foreground text-sm">{description}</span>
        </div>
        {widget.socialLinks && (
          <div className="ml-auto flex gap-2">
            {widget.socialLinks.slice(0, 3).map((social: any) => (
              <img
                key={social.name}
                className="cursor-pointer h-6 w-6 object-contain hover:opacity-80 transition-opacity"
                src={WidgetUtil.getSocialLinkIcon(social.name)}
                alt={social.name}
                onClick={() => BrowserWindowApi.openUrl(social.link, { external: true })}
              />
            ))}
          </div>
        )}
      </div>

      <WidgetContainer className="m-4 w-full border-none shadow-none" widget={widget} />

      <div className="flex gap-4 flex-wrap justify-center">
        <div className="flex gap-2 flex-wrap justify-center">
          {isWallpaper
            ? (
                <>
                  {isConfigurable && (
                    <Button onClick={openBackgroundWidgetSettings} className="rounded-full">
                      {t('settings.title', 'Settings')}
                    </Button>
                  )}
                  <Button
                    variant={wallpaperActive ? 'destructive' : 'default'}
                    disabled={adding || (wallpaperActive && wallpaperState.status !== 'running')}
                    onClick={wallpaperActive ? closeWallpaper : () => addWidget(DeployMode.WALLPAPER)}
                    className="rounded-full"
                  >
                    {wallpaperActive ? (wallpaperState.status === 'running' ? '关闭' : '加载中…') : '壁纸'}
                  </Button>
                  {wallpaperActive && (
                    <Button variant="outline" onClick={openDevTools} className="rounded-full border-yellow-500 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10">
                      DevTools
                    </Button>
                  )}
                </>
              )
            : widget.isSupportBackground()
              ? (
                  <>
                    {isConfigurable && (
                      <Button onClick={openBackgroundWidgetSettings} className="rounded-full">
                        {t('settings.title', 'Settings')}
                      </Button>
                    )}
                    {!isWidgetHosted
                      ? (
                          <Button onClick={addBackgroundWidget} className="rounded-full">
                            {t('search.enable', 'Enable')}
                          </Button>
                        )
                      : (
                          <Button variant="destructive" onClick={removeWidget} className="rounded-full">
                            {t('search.disable', 'Disable')}
                          </Button>
                        )}
                    {isWidgetHosted && isDev && (
                      <Button variant="outline" onClick={openDevTools} className="rounded-full border-yellow-500 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10">
                        DevTools
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => DeployedWidgetApi.createDesktopShortcut(widget.name)} className="rounded-full">
                      {t('search.desktopShortcut', '桌面图标')}
                    </Button>
                  </>
                )
              : (
                  <>
                    {widget.isSupportNormal() && (
                      <Button onClick={onClickAddNormal} className="rounded-full">
                        {t('search.desktop', 'Desktop')}
                      </Button>
                    )}
                    {widget.isSupportOverlap() && (
                      <Button onClick={() => addWidget(DeployMode.OVERLAP)} className="rounded-full">
                        {t('search.overlap', 'Overlap')}
                      </Button>
                    )}
                    {widget.isSupportTray() && (
                      <Button onClick={() => addWidget(DeployMode.TRAY)} className="rounded-full">
                        {t('search.tray', 'Tray')}
                      </Button>
                    )}
                  </>
                )}
        </div>

        {upgradable && (
          <Button
            variant="secondary"
            className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={upgradePackage}
            disabled={upgrading}
          >
            {upgrading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowUpCircle className="mr-2 h-4 w-4" />}
            {t('search.upgrade', 'Upgrade')}
          </Button>
        )}
      </div>
    </Card>
  )
}
