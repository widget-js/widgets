import type { LanguageCode, Widget, WidgetPackage } from '@widget-js/core'
import { WidgetPackageApi } from '@widget-js/core'
import { ImageOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
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
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAppLanguage } from '@/hooks/use-app-language'
import { useWidgetPreviewImage } from '@/hooks/use-widget-preview-image'
import './widget-package-item.css'

interface WidgetPackageItemProps {
  widgetPackage: WidgetPackage
  widgets: Widget[]
  onUninstall: (pkg: WidgetPackage) => void
}

function WidgetPreview({ widget, widgetPackage, title }: { widget: Widget, widgetPackage: WidgetPackage, title: string }) {
  const previewInfo = useMemo(() => ({
    previewImage: widget.previewImage,
    packageName: widgetPackage.name,
    package: widgetPackage,
  }), [widget.previewImage, widgetPackage])
  const { previewImage: src, error: failed, setError } = useWidgetPreviewImage(previewInfo)

  return (
    <figure className="w-40 shrink-0 rounded-lg border bg-muted/30 p-2">
      <div className="flex h-28 items-center justify-center">
        {src && !failed
          ? <img src={src} alt={title} loading="lazy" className="h-full w-full object-contain" onError={() => setError(true)} />
          : <ImageOff className="h-8 w-8 text-muted-foreground" aria-hidden="true" />}
      </div>
      <figcaption className="mt-2 truncate text-center text-xs" title={title}>{title}</figcaption>
    </figure>
  )
}

export function WidgetPackageItem({ widgetPackage, widgets, onUninstall }: WidgetPackageItemProps) {
  const { t } = useTranslation()
  const [languageCode] = useAppLanguage()
  const [clearing, setClearing] = useState(false)
  const handleClearData = async () => {
    if (clearing) {
      return
    }
    setClearing(true)
    try {
      await WidgetPackageApi.clearData(widgetPackage.name)
      toast.success(t('settings.widgetPackage.clearDataSuccess'))
    }
    catch {
      toast.error(t('settings.widgetPackage.clearDataFailed'))
    }
    finally {
      setClearing(false)
    }
  }

  const getTitle = (): string => {
    if (typeof widgetPackage.getTitle === 'function') {
      return widgetPackage.getTitle(languageCode as LanguageCode) || widgetPackage.name
    }
    return widgetPackage.name
  }

  return (
    <Card className="min-w-0 p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold shrink-0">{t('settings.widgetPackage.title')}</span>
            <span className="truncate">{getTitle()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold shrink-0">{t('settings.widgetPackage.name')}</span>
            <span className="truncate text-muted-foreground">{widgetPackage.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold shrink-0">{t('settings.widgetPackage.installPath')}</span>
            <span className="truncate text-muted-foreground max-w-[400px]" title={widgetPackage.url}>
              {widgetPackage.url}
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" disabled={clearing}>
                {t(clearing ? 'settings.widgetPackage.clearingData' : 'settings.widgetPackage.clearData')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('settings.widgetPackage.clearDataConfirm')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('settings.widgetPackage.clearDataDesc', { name: getTitle() })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('settings.widgetPackage.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearData} disabled={clearing}>
                  {t('settings.widgetPackage.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={clearing}>
                {t('settings.widgetPackage.uninstall')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('settings.widgetPackage.uninstallConfirm')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('settings.widgetPackage.uninstallDesc', { name: getTitle() })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('settings.widgetPackage.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => onUninstall(widgetPackage)}>
                  {t('settings.widgetPackage.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {widgets.length > 0 && (
        <div className="widget-preview-marquee mt-3 min-w-0 overflow-hidden border-t pt-3" role="region" aria-label={getTitle()}>
          <div className="widget-preview-track" style={{ animationDuration: `${Math.max(40, widgets.length * 8)}s` }}>
            {[0, 1].map(copy => (
              <div key={copy} className="widget-preview-group" aria-hidden={copy === 1 ? true : undefined}>
                {widgets.map((widget) => {
                  const title = widget.getTitle(languageCode as LanguageCode) || widget.name
                  return <WidgetPreview key={`${widget.name}:${widget.previewImage ?? ''}`} widget={widget} widgetPackage={widgetPackage} title={title} />
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
