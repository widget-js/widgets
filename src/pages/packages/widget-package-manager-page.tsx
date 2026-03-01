import { WidgetPackage, WidgetPackageApi } from '@widget-js/core'
import consola from 'consola'
import { useEffect, useState } from 'react'
import { WidgetPackageItem } from './components/widget-package-item'

export default function WidgetPackageManagerPage() {
  const [packages, setPackages] = useState<WidgetPackage[]>([])

  const loadPackages = async () => {
    try {
      const list = await WidgetPackageApi.getPackages()
      const parsedList = list.map((it) => {
        if (WidgetPackage.parseObject) {
          return WidgetPackage.parseObject(it)
        }
        return it as unknown as WidgetPackage
      })
      setPackages(parsedList)
    }
    catch (e) {
      consola.error('Failed to load packages', e)
    }
  }

  const handleUninstall = async (pkg: WidgetPackage) => {
    try {
      await WidgetPackageApi.uninstall(pkg.name)
      setPackages(prev => prev.filter(it => it.name !== pkg.name))
    }
    catch (e) {
      consola.error('Failed to uninstall package', e)
    }
  }

  useEffect(() => {
    loadPackages()
  }, [])

  return (
    <div className="flex flex-col gap-6 mb-4 px-4 w-full">
      <div className="flex flex-col gap-2">
        {packages
          .filter(item => item.name !== 'cn.widgetjs.widgets')
          .map(item => (
            <WidgetPackageItem
              key={item.name}
              widgetPackage={item}
              onUninstall={handleUninstall}
            />
          ))}
      </div>
    </div>
  )
}
