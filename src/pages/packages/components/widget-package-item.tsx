import type { LanguageCode, Widget, WidgetPackage } from '@widget-js/core'
import { WidgetApi } from '@widget-js/core'
import { Image as ImageIcon, ImageOff } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Marquee } from '@/components/marquee'
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
import WidgetUtil from '@/utils/widget-util'

interface WidgetPackageItemProps {
  widgetPackage: WidgetPackage
  onUninstall: (pkg: WidgetPackage) => void
}

interface PreviewItem {
  widget: Widget
  url: string | null
  loading: boolean
  error: boolean
}

function usePreviewImages(widgetPackage: WidgetPackage) {
  const [items, setItems] = useState<PreviewItem[]>(() =>
    widgetPackage.widgets.map(widget => ({
      widget,
      url: null,
      loading: true,
      error: false,
    })),
  )

  useEffect(() => {
    const loadPreviews = async () => {
      const localWidgets = await WidgetApi.getWidgets()
      const widgets = localWidgets.filter(it => it.packageName === widgetPackage.name)

      const previewItems = await Promise.all(
        widgets.map(async (widget) => {
          const item: PreviewItem = {
            widget,
            url: null,
            loading: true,
            error: false,
          }

          if (!widget.previewImage) {
            item.loading = false
            return item
          }

          try {
            item.url = await WidgetUtil.resolvePreviewImageUrl(widget)
          }
          catch (e) {
            console.error('Failed to load preview image', e)
            item.error = true
          }
          finally {
            item.loading = false
          }

          return item
        }),
      )

      setItems(previewItems)
    }
    loadPreviews()
  }, [widgetPackage])

  return items
}

export function WidgetPackageItem({ widgetPackage, onUninstall }: WidgetPackageItemProps) {
  const { t } = useTranslation()
  const [languageCode] = useAppLanguage()
  const previewItems = usePreviewImages(widgetPackage)

  const validPreviews = useMemo(
    () => previewItems.filter(p => p.url || p.loading),
    [previewItems],
  )

  const useMarquee = validPreviews.length > 3

  const previewNodes = useMemo(
    () => validPreviews.map((item, idx) => (
      <div
        key={`${item.widget.name || idx}-${idx}`}
        className="shrink-0 w-32 h-24 rounded-md overflow-hidden relative flex items-center justify-center"
      >
        {item.url
          ? (
              <img
                src={item.url}
                alt={item.widget.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  ;(e.currentTarget.parentElement as HTMLElement).dataset.error = 'true'
                }}
              />
            )
          : null}

        {item.loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground animate-pulse">
            <ImageIcon size="20" className="mb-1" />
          </div>
        )}

        {!item.loading && (!item.url || item.error) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-muted/50">
            <ImageOff size="20" className="mb-1" />
          </div>
        )}
      </div>
    )),
    [validPreviews],
  )

  const getTitle = (): string => {
    if (typeof widgetPackage.getTitle === 'function') {
      return widgetPackage.getTitle(languageCode as LanguageCode) || widgetPackage.name
    }
    return widgetPackage.name
  }

  return (
    <Card className="p-3 shadow-sm hover:shadow-md transition-shadow">
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

        <div className="ml-auto flex items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
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

      {validPreviews.length > 0 && (
        <div className="mt-3 pt-3">
          <div className="group relative overflow-hidden rounded-md">
            {useMarquee
              ? <Marquee speed={10} direction={1}>{previewNodes}</Marquee>
              : <div className="flex gap-3">{previewNodes}</div>}

            {useMarquee && (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
              </>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
