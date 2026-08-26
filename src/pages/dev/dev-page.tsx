import { AppApi, BrowserWindowApi, WidgetApi, WidgetPackageApi } from '@widget-js/core'
import { WebWidget } from '@widget-js/web-api'
import { Hammer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
import TextType from '@/components/ui/text-type'
import { SearchItem } from '@/pages/add/components/search-item'
import { McpHeaderBadge } from './components/mcp-header-badge'

interface McpInfo {
  port: number
  url: string
  clientConfig: {
    mcpServers: {
      widgetjs: {
        transport: string
        url: string
      }
    }
  }
}

export default function DevPage() {
  const { t } = useTranslation()
  const [widgets, setWidgets] = useState<WebWidget[]>([])
  const [loading, setLoading] = useState(true)
  const [mcpInfo, setMcpInfo] = useState<McpInfo | null>(null)

  const openDocs = () => {
    BrowserWindowApi.openUrl('https://widgetjs.cn/guide/', { external: true })
  }

  const copyMcpConfig = () => {
    if (!mcpInfo) { return }
    const configText = JSON.stringify(mcpInfo.clientConfig, null, 2)
    navigator.clipboard.writeText(configText)
    toast.success(t('dev.mcpConfigCopied', 'MCP 配置已复制到剪贴板'))
  }

  useEffect(() => {
    document.title = t('sidebar.dev')
  }, [t])

  useEffect(() => {
    const loadMcpInfo = async () => {
      try {
        const info = await AppApi.getMcpServerInfo()
        setMcpInfo(info)
      }
      catch (e) {
        console.error('Failed to load MCP info', e)
      }
    }
    loadMcpInfo()
  }, [])

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
      <div className="relative flex h-full w-full items-center justify-center">
        <McpHeaderBadge mcpInfo={mcpInfo} onCopyConfig={copyMcpConfig} />
        <Spinner className="size-8 text-muted-foreground" />
      </div>
    )
  }

  if (widgets.length > 0) {
    return (
      <div className="relative h-full w-full overflow-y-auto bg-background p-4">
        <McpHeaderBadge mcpInfo={mcpInfo} onCopyConfig={copyMcpConfig} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {widgets.map(widget => (
            <SearchItem key={widget.name} widget={widget} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <McpHeaderBadge mcpInfo={mcpInfo} onCopyConfig={copyMcpConfig} />
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Hammer />
          </EmptyMedia>
          <EmptyTitle>{t('dev.emptyTitle')}</EmptyTitle>
          <div className="mt-4">
            <TextType
              text={t('dev.suggestions', { returnObjects: true }) as string[]}
              typingSpeed={40}
              pauseDuration={2500}
              deletingSpeed={20}
              showCursor
              cursorCharacter="▍"
              loop
              className="text-center text-sm text-muted-foreground leading-relaxed max-w-xl min-w-[500px]"
              cursorClassName="text-primary"
              highlightWords={[
                {
                  word: '/widget',
                  className: 'font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded',
                },
              ]}
            />
          </div>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={openDocs}>{t('dev.viewDocs')}</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
