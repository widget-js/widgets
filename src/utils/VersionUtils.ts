import axios from 'axios'
import semver from 'semver'
import { AppApi } from '@widget-js/core'
import consola from 'consola'
import type { AppVersion } from '@/model/AppVersion'

export default class VersionUtils {
  static checkNewVersion(onNewVersion: (version: AppVersion) => void, onError?: (error) => void, onFinally?: () => void) {
    axios.get('https://widget-fun.oss-cn-hangzhou.aliyuncs.com/version/version.json')
      .then(async (response) => {
        // handle success
        if (response.status == 200) {
          const data = response.data as AppVersion
          const currentVersion = await AppApi.getVersion()
          consola.info('current:', currentVersion, 'server:', data.version)
          if (semver.gt(data.version, currentVersion)) {
            consola.info('New version detected:', data.version)
            consola.info('Download Link:', data.downloadLink)
            onNewVersion(data)
          }
        }
      })
      .catch((error) => {
        onError?.(error)
      })
      .finally(() => {
        onFinally?.()
      })
  }
}
