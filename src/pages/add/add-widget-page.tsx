import type { WidgetSearchOptions } from '@widget-js/web-api'
import { AppApi, NotificationApi, WidgetApi, WidgetPackageApi } from '@widget-js/core'
import { WebWidget } from '@widget-js/web-api'
import consola from 'consola'
import { FolderDown, Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { WebWidgetApi } from '@/api/web-widget-api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDebounce } from '@/hooks/use-debounce'

import { SearchItem } from './components/search-item'
import { WidgetTags } from './components/widget-tags'

export default function AddWidgetPage() {
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [widgets, setWidgets] = useState<WebWidget[]>([])
  const [_loading, setLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const debouncedKeyword = useDebounce(keyword, 1000)

  const search = useCallback(async () => {
    setLoading(true)
    setWidgets([])

    try {
      if (selectedCategory === 'installed') {
        const widgetPackages = await WidgetPackageApi.getPackages()
        const installedPackages = widgetPackages.filter(it => !it.url.startsWith('http') || it.development)
        const localWidgets = await WidgetApi.getWidgets()
        const newWidgets: WebWidget[] = []

        for (const widgetPackage of installedPackages) {
          newWidgets.push(
            ...localWidgets
              .map(it => WebWidget.fromObject(it))
              .filter(it => it.packageName === widgetPackage.name),
          )
        }
        setWidgets(newWidgets)
        setLoading(false)
        return
      }

      const version = await AppApi.getVersion()
      const options: WidgetSearchOptions = {
        page: 1,
        pageSize: 50,
        category: selectedCategory,
        keyword: debouncedKeyword,
        appVersion: version,
      }

      let localWidgets = (await WidgetApi.getWidgets()).filter(it => !it.disabled)

      if (selectedCategory) {
        localWidgets = localWidgets.filter(it => it.categories && it.categories.includes(selectedCategory as any))
      }

      if (debouncedKeyword) {
        localWidgets = localWidgets.filter((it) => {
          const title = JSON.stringify(it.title)
          const description = JSON.stringify(it.description)
          return title.includes(debouncedKeyword) || description.includes(debouncedKeyword)
        })
      }

      try {
        const res = await WebWidgetApi.search(options)
        const remoteWidgets = res.data
          .map((it: any) => WebWidget.fromObject(it))
          .filter((it: any) => it.name !== 'cn.widgetjs.widgets.dynamic_island')

        const mergedWidgets = [...remoteWidgets]

        for (const localWidget of localWidgets) {
          if (mergedWidgets.some(it => it.name === localWidget.name)) {
            continue
          }
          mergedWidgets.push(WebWidget.fromObject(localWidget))
        }
        setWidgets(mergedWidgets)
      }
      catch (e) {
        setWidgets(localWidgets.map(it => WebWidget.fromObject(it)))
      }
    }
    catch (e) {
      consola.error(e)
    }
    finally {
      setLoading(false)
    }
  }, [selectedCategory, debouncedKeyword])

  useEffect(() => {
    search()
  }, [search])

  useEffect(() => {
    document.title = t('search.title')
  }, [t])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) { return }

    try {
      consola.info(`开始安装组件包: `, file)
      await WidgetPackageApi.install((file as any).path)
      await NotificationApi.success('安装成功')
      window.location.reload()
    }
    catch (e: any) {
      toast.error(`安装失败: ${e.message}`)
    }
    event.target.value = ''
  }

  return (
    <div className="h-full bg-background flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="h-[54px] px-4 flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder={t('search.placeholder')}
            className="pl-9"
            onKeyDown={e => e.key === 'Enter' && search()}
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".zip"
          onChange={handleFileChange}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <FolderDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('search.installOffline')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="px-4 pb-2">
        <WidgetTags value={selectedCategory} onChange={setSelectedCategory} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {widgets.map(widget => (
              <SearchItem key={widget.name} widget={widget} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
