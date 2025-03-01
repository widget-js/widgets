import type { RemotePackageUrlInfo } from '@widget-js/core'
import { NotificationApi, WidgetPackageApi } from '@widget-js/core'
import semver from 'semver'
import type { ComputedRef, Ref } from 'vue'
import { computed, reactive, ref, toRaw } from 'vue'
import consola from 'consola'

export interface UseWidgetPackageReturn {
  upgrading: ComputedRef<boolean>
  upgradable: Ref<boolean>
  checkUpgrade: () => Promise<boolean>
  upgradePackage: () => Promise<void>
}

const upgradablePackages = reactive<string[]>([])
const upgradingPackages = reactive<string[]>([])
const instanceCache = new Map<string, UseWidgetPackageReturn>()

export function useWidgetPackage(packageName: string, remoteVersion: string, remoteUrlInfo?: RemotePackageUrlInfo): UseWidgetPackageReturn {
  if (instanceCache.has(packageName)) {
    return instanceCache.get(packageName)!
  }
  const checking = ref(false)

  const upgrading = computed(() => {
    return upgradingPackages.includes(packageName)
  })

  const upgradable = ref(false)

  const checkUpgrade = async (): Promise<boolean> => {
    if (checking.value) {
      return false
    }
    checking.value = true
    try {
      const widgetPackage = await WidgetPackageApi.getPackage(packageName)
      if (widgetPackage) {
        if (widgetPackage.name == 'widget.js.fun') {
          consola.log(remoteVersion)
        }
        upgradable.value = semver.gt(remoteVersion, widgetPackage.version ?? '1.0.0')
        if (upgradable.value && !upgradablePackages.includes(packageName)) {
          upgradablePackages.push(packageName)
        }
        return upgradable.value
      }
      upgradablePackages.splice(upgradablePackages.indexOf(packageName), 1)
    }
    catch (e) {
      consola.error(e)
    }
    checking.value = false
    return false
  }

  const upgradePackage = async () => {
    upgradingPackages.push(packageName)
    try {
      if (!remoteUrlInfo) {
        NotificationApi.error('未配置组件包信息')
        return
      }
      await WidgetPackageApi.upgrade(packageName, toRaw(remoteUrlInfo))
      upgradingPackages.splice(upgradingPackages.indexOf(packageName), 1)
      upgradablePackages.splice(upgradablePackages.indexOf(packageName), 1)
      NotificationApi.success('组件包升级成功')
      upgradable.value = false
    }
    catch (e) {
      console.error(e)
    }
  }
  const instance: UseWidgetPackageReturn = { upgrading, upgradable, checkUpgrade, upgradePackage }
  instanceCache.set(packageName, instance)
  return instance
}
