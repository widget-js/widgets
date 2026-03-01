import type { DeployedWidget } from '@widget-js/core'
import { BrowserWindowApi, DeployedWidgetApi } from '@widget-js/core'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DeployedWidgetCard } from './deployed-widget-card'

export default function DeployedWidgetList() {
  const [widgets, setWidgets] = useState<DeployedWidget[]>([])
  const { t } = useTranslation()

  const refreshWidgets = () => {
    DeployedWidgetApi.getDeployedWidgets().then(setWidgets)
  }

  useEffect(() => {
    refreshWidgets()
    BrowserWindowApi.setAlwaysOnTop(true)

    // Listen for window focus to refresh list
    window.addEventListener('focus', refreshWidgets)
    return () => {
      window.removeEventListener('focus', refreshWidgets)
    }
  }, [])

  const removeWidget = async (widget: DeployedWidget) => {
    await DeployedWidgetApi.removeDeployedWidget(widget.id)
    setWidgets(prev => prev.filter(w => w.id !== widget.id))
  }

  return (
    <div className="flex flex-col gap-2">
      {widgets.map(widget => (
        <DeployedWidgetCard
          key={widget.id}
          deployedWidget={widget}
          onRemove={() => removeWidget(widget)}
        />
      ))}
      {widgets.length === 0 && (
        <div className="text-center text-muted-foreground text-xs py-4">
          {t('tray.runningWidgets')}
          {' '}
          (0)
        </div>
      )}
    </div>
  )
}
