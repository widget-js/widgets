import type { RemotePackageUrlInfo } from '@widget-js/core'
import { NotificationApi, WidgetPackageApi } from '@widget-js/core'
import consola from 'consola'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import semver from 'semver'

const upgradablePackages = new Set<string>()
const upgradingPackages = new Set<string>()
const checkingPackages = new Set<string>()
const listeners = new Map<string, Set<() => void>>()

function subscribe(packageName: string, callback: () => void) {
  if (!listeners.has(packageName)) {
    listeners.set(packageName, new Set())
  }
  listeners.get(packageName)!.add(callback)
}

function unsubscribe(packageName: string, callback: () => void) {
  const pkgListeners = listeners.get(packageName)
  if (pkgListeners) {
    pkgListeners.delete(callback)
    if (pkgListeners.size === 0) {
      listeners.delete(packageName)
    }
  }
}

function notify(packageName: string) {
  listeners.get(packageName)?.forEach(cb => cb())
}

export function useWidgetPackage(packageName: string, remoteVersion: string, remoteUrlInfo?: RemotePackageUrlInfo) {
  const { t } = useTranslation()
  const [upgradable, setUpgradable] = useState(upgradablePackages.has(packageName))
  const [upgrading, setUpgrading] = useState(upgradingPackages.has(packageName))
  // We don't necessarily need to expose 'checking' as a return value based on the Vue type,
  // but we can track it internally or use the global set to prevent double checking.

  useEffect(() => {
    const updateState = () => {
      setUpgradable(upgradablePackages.has(packageName))
      setUpgrading(upgradingPackages.has(packageName))
    }

    // Initial sync in case it changed before effect ran
    updateState()

    subscribe(packageName, updateState)
    return () => {
      unsubscribe(packageName, updateState)
    }
  }, [packageName])

  const checkUpgrade = useCallback(async () => {
    if (checkingPackages.has(packageName)) {
      return false
    }

    checkingPackages.add(packageName)
    // We don't trigger re-render for checking status as it's not in the return interface

    try {
      const widgetPackage = await WidgetPackageApi.getPackage(packageName)
      if (widgetPackage) {
        if (widgetPackage.name === 'widget.js.fun') {
          consola.log(remoteVersion)
        }

        const isUpgradable = semver.gt(remoteVersion, widgetPackage.version ?? '1.0.0')

        if (isUpgradable) {
          if (!upgradablePackages.has(packageName)) {
            upgradablePackages.add(packageName)
            notify(packageName)
          }
        }
        else {
          if (upgradablePackages.has(packageName)) {
            upgradablePackages.delete(packageName)
            notify(packageName)
          }
        }
        return isUpgradable
      }

      if (upgradablePackages.has(packageName)) {
        upgradablePackages.delete(packageName)
        notify(packageName)
      }
    }
    catch (e) {
      consola.error(e)
    }
    finally {
      checkingPackages.delete(packageName)
    }

    return false
  }, [packageName, remoteVersion])

  const upgradePackage = useCallback(async () => {
    upgradingPackages.add(packageName)
    notify(packageName)

    try {
      if (!remoteUrlInfo) {
        NotificationApi.error(t('update.packageNotConfigured'))
        return
      }

      await WidgetPackageApi.upgrade(packageName, remoteUrlInfo)

      upgradingPackages.delete(packageName)
      upgradablePackages.delete(packageName)
      NotificationApi.success(t('update.packageSuccess'))
      notify(packageName)
    }
    catch (e) {
      consola.error(e)
      // Remove from upgrading if failed
      upgradingPackages.delete(packageName)
      notify(packageName)
    }
  }, [packageName, remoteUrlInfo])

  return {
    upgradable,
    upgrading,
    checkUpgrade,
    upgradePackage,
  }
}
