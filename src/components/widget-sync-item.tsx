import type { Widget } from '@widget-js/core'
import { WidgetApi } from '@widget-js/core'
import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item'

interface WidgetSyncItemProps {
  widget: Widget
}

export default function WidgetSyncItem({ widget }: WidgetSyncItemProps) {
  const { i18n } = useTranslation()
  const [latestSyncAt, setLatestSyncAt] = useState<string>('')

  const getLocalizedText = (text: any) => {
    if (typeof text === 'string') { return text }
    if (!text) { return '' }
    return text[i18n.language] || text['zh-CN'] || Object.values(text)[0] || ''
  }

  useEffect(() => {
    WidgetApi.getSyncInfo(widget.name).then((it) => {
      if (it && it.latestSyncTime) {
        setLatestSyncAt(`${new Date(it.latestSyncTime).toLocaleString()}`)
      }
      else {
        setLatestSyncAt('暂无同步')
      }
    })
  }, [widget.name])

  return (
    <Item className="bg-muted/50 rounded-lg p-3">
      <ItemContent>
        <ItemHeader>
          <ItemTitle>{getLocalizedText(widget.title) || widget.name}</ItemTitle>

        </ItemHeader>
        <ItemDescription title={widget.name} className="text-xs">
          {widget.name}
        </ItemDescription>

      </ItemContent>
      <ItemActions>
        <div className="text-xs text-muted-foreground flex gap-1 items-center">
          <Clock className="w-3 h-3" />
          <span>{latestSyncAt}</span>
        </div>
      </ItemActions>
    </Item>
  )
}
