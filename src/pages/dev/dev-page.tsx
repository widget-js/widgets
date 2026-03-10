import { BrowserWindowApi, WidgetApi, WidgetPackageApi } from '@widget-js/core'
import { WebWidget } from '@widget-js/web-api'
import { Hammer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
import { SearchItem } from '@/pages/add/components/search-item'

export default function DevPage() {
  const { t } = useTranslation()
  const [widgets, setWidgets] = useState<WebWidget[]>([])
  const [loading, setLoading] = useState(true)

  const openDocs = () => {
    BrowserWindowApi.openUrl('https://widgetjs.cn/guide/', { external: true })
  }

  useEffect(() => {
    document.title = t('sidebar.dev')
  }, [t])

  useEffect(() => {
    const loadWidgets = async () => {
      try {
        const widgetPackages = await WidgetPackageApi.getPackages()
        const devPackages = widgetPackages.filter(it => it.development)
        const localWidgets = await WidgetApi.getWidgets()
        const devWidgets: WebWidget[] = []

        for (const widgetPackage of devPackages) {
          const matchingWidgets = localWidgets
            .map(it => WebWidget.fromObject(it))
            .filter(it => it.packageName === widgetPackage.name)
          devWidgets.push(...matchingWidgets)
        }
        setWidgets(devWidgets)
      }
      catch (e) {
        console.error('Failed to load widgets', e)
      }
      finally {
        setLoading(false)
      }
    }
    loadWidgets()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-8 text-muted-foreground" />
      </div>
    )
  }

  if (widgets.length > 0) {
    return (
      <div className="h-full w-full overflow-y-auto bg-background p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {widgets.map(widget => (
            <SearchItem key={widget.name} widget={widget} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Hammer />
          </EmptyMedia>
          <EmptyTitle>{t('dev.emptyTitle')}</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={openDocs}>{t('dev.viewDocs')}</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
