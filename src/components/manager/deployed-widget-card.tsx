import type { DeployedWidget, Widget } from '@widget-js/core'
import { DeployedWidgetApi, WidgetApi } from '@widget-js/core'
import { Code, RefreshCw, Settings, X } from 'lucide-react'
import { useEffect, useState } from 'react'
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
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useDebugConfig } from '@/hooks/use-debug-config'

interface DeployedWidgetCardProps {
  deployedWidget: DeployedWidget
  onRemove: (widget: DeployedWidget) => void
}

export function DeployedWidgetCard({ deployedWidget, onRemove }: DeployedWidgetCardProps) {
  const { t, i18n } = useTranslation()
  const [widget, setWidget] = useState<Widget>()
  const [ignoreMouseEvents, setIgnoreMouseEvents] = useState(deployedWidget.isIgnoreMouseEvents ?? false)
  const [isDebugMode] = useDebugConfig()

  useEffect(() => {
    WidgetApi.getWidget(deployedWidget.name).then(setWidget)
  }, [deployedWidget.name])

  const getLocalizedText = (text: any) => {
    if (typeof text === 'string') { return text }
    if (!text) { return '' }
    return text[i18n.language] || text['zh-CN'] || Object.values(text)[0] || ''
  }

  const openSettings = () => {
    if (widget?.configPagePath) {
      DeployedWidgetApi.openConfigPage(deployedWidget.id)
    }
  }

  const openDevTools = () => {
    DeployedWidgetApi.openDevTools(deployedWidget.id)
  }

  const refresh = () => {
    WidgetApi.reload(deployedWidget.id)
  }

  const onIgnoreMouseEventChange = (checked: boolean) => {
    setIgnoreMouseEvents(checked)
    WidgetApi.setIgnoreMouseEvents(deployedWidget.id, checked)
  }

  return (
    <Card className="shadow-none bg-secondary/20 group relative gap-0 p-0">
      <CardHeader className="p-2 pb-2">
        <div className="flex flex-col gap-1 overflow-hidden flex-1 text-left">
          {widget && (
            <CardTitle className="text-sm">
              {getLocalizedText(widget.title)}
            </CardTitle>
          )}
          <CardDescription className="text-sm flex gap-2">
            {deployedWidget.name}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="p-2 flex flex-col gap-3 bg-muted/40 rounded-md">

        <div className="flex w-full items-center gap-2">
          <div className="flex items-center space-x-2 mr-auto">
            <Checkbox
              id={`ignore-mouse-${deployedWidget.id}`}
              checked={ignoreMouseEvents}
              onCheckedChange={onIgnoreMouseEventChange}
            />
            <label
              htmlFor={`ignore-mouse-${deployedWidget.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              鼠标穿透
            </label>
          </div>

          {isDebugMode && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={openDevTools}>
                  <Code className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>DevTools</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={refresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('tray.restartWidgets')}</p>
            </TooltipContent>
          </Tooltip>

          {widget?.configPagePath && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={openSettings}>
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('settings.title')}</p>
              </TooltipContent>
            </Tooltip>
          )}

          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive">
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('manager.remove')}</p>
              </TooltipContent>
            </Tooltip>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('manager.confirmRemove')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('manager.removeDesc', { name: widget ? getLocalizedText(widget.title) : deployedWidget.name })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('settings.widgetPackage.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => onRemove(deployedWidget)}>
                  {t('settings.widgetPackage.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  )
}
