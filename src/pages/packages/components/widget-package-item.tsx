import type { LanguageCode, WidgetPackage } from '@widget-js/core'
import { useTranslation } from 'react-i18next'
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

interface WidgetPackageItemProps {
  widgetPackage: WidgetPackage
  onUninstall: (pkg: WidgetPackage) => void
}

export function WidgetPackageItem({ widgetPackage, onUninstall }: WidgetPackageItemProps) {
  const { t } = useTranslation()
  const [languageCode] = useAppLanguage()

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
    </Card>
  )
}
