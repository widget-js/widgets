import type { BroadcastEvent } from '@widget-js/core'
import { DeployedWidgetApi, WidgetApiEvent } from '@widget-js/core'
import { useAppBroadcast, WindowControls } from '@widget-js/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { Field, FieldDescription, FieldTitle } from '@/components/ui/field'
import { Slider } from '@/components/ui/slider'

export default function SizePage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const widgetId = searchParams.get('widgetId')

  useAppBroadcast([WidgetApiEvent.WIDGET_REMOVED], (event: BroadcastEvent) => {
    if (event.event === WidgetApiEvent.WIDGET_REMOVED && event.payload?.widgetId === widgetId) {
      window.close()
    }
  })

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [minWidth, setMinWidth] = useState(50)
  const [maxWidth, setMaxWidth] = useState(1000)
  const [minHeight, setMinHeight] = useState(50)
  const [maxHeight, setMaxHeight] = useState(1000)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = t('sizePage.title', '组件大小设置')
  }, [t])

  useEffect(() => {
    const loadWidgetInfo = async () => {
      if (!widgetId) { return }

      try {
        const widget = await DeployedWidgetApi.getDeployedWidget(widgetId)
        if (widget) {
          setWidth(widget.width || 0)
          setHeight(widget.height || 0)

          if (widget.minWidth) { setMinWidth(widget.minWidth) }
          if (widget.maxWidth) { setMaxWidth(widget.maxWidth) }
          if (widget.minHeight) { setMinHeight(widget.minHeight) }
          if (widget.maxHeight) { setMaxHeight(widget.maxHeight) }
        }
      }
      catch (error) {
        console.error('Failed to load widget info:', error)
      }
      finally {
        setLoading(false)
      }
    }

    loadWidgetInfo()
  }, [widgetId])

  const handleWidthChange = async (value: number[]) => {
    const newWidth = value[0]
    setWidth(newWidth)
    if (widgetId) {
      await DeployedWidgetApi.setSize(widgetId, newWidth, height)
    }
  }

  const handleHeightChange = async (value: number[]) => {
    const newHeight = value[0]
    setHeight(newHeight)
    if (widgetId) {
      await DeployedWidgetApi.setSize(widgetId, width, newHeight)
    }
  }

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  if (!widgetId) {
    return <div className="p-4">Missing widgetId parameter</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="draggable-region flex h-[48px] shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2 px-4">
          <div className="font-bold text-sm">{t('sizePage.title', '组件大小设置')}</div>
        </div>
        <WindowControls />
      </header>

      <div className="flex flex-col gap-6 p-6 min-w-[400px] mx-auto w-full">
        <div className="flex flex-col gap-8">
          <Field className="w-full">
            <FieldTitle>{t('sizePage.width', '宽度 (Width)')}</FieldTitle>
            <FieldDescription>
              {t('sizePage.widthDesc', '设置组件的宽度 ({{value}} px)，取值范围 {{min}} - {{max}} px。', {
                value: width,
                min: minWidth,
                max: maxWidth,
              })}
            </FieldDescription>
            <Slider
              value={[width]}
              min={minWidth}
              max={maxWidth}
              step={10}
              onValueChange={handleWidthChange}
              className="mt-2 w-full"
            />
          </Field>

          <Field className="w-full">
            <FieldTitle>{t('sizePage.height', '高度 (Height)')}</FieldTitle>
            <FieldDescription>
              {t('sizePage.heightDesc', '设置组件的高度 ({{value}} px)，取值范围 {{min}} - {{max}} px。', {
                value: height,
                min: minHeight,
                max: maxHeight,
              })}
            </FieldDescription>
            <Slider
              value={[height]}
              min={minHeight}
              max={maxHeight}
              step={10}
              onValueChange={handleHeightChange}
              className="mt-2 w-full"
            />
          </Field>
        </div>
      </div>
    </div>
  )
}
