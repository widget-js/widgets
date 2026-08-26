import type { RemotePackageUrlInfo, SocialType } from '@widget-js/core'
import { WidgetPackageApi } from '@widget-js/core'

export interface WidgetPreviewInfo {
  previewImage?: string
  packageName?: string | null
  package?: {
    version?: string
    remote?: RemotePackageUrlInfo
  }
}

export default class WidgetUtil {
  static getSocialLinkIcon(socialName: SocialType | string) {
    switch (socialName) {
      case 'github':
        return 'https://widgetjs.cn/image/logo/github.png'
      case 'bilibili':
        return 'https://widgetjs.cn/image/logo/bilibili.png'
      case 'discord':
        return 'https://widgetjs.cn/image/logo/discord.png'
      case 'tiktok':
      case 'douyin':
        return 'https://widgetjs.cn/image/logo/douyin.png'
      case 'email':
        return 'https://widgetjs.cn/image/logo/email.png'
      case 'qq':
        return 'https://widgetjs.cn/image/logo/qq.png'
      case 'gitee':
        return 'https://widgetjs.cn/image/logo/gitee.png'
      case 'youtube':
        return 'https://widgetjs.cn/image/logo/youtube.png'
      case 'wechat':
        return 'https://widgetjs.cn/image/logo/wechat.png'
      default:
        return ''
    }
  }

  static async resolvePreviewImageUrl(widget: WidgetPreviewInfo): Promise<string | null> {
    if (!widget.previewImage) {
      return null
    }

    if (widget.package && widget.package.remote) {
      const remote = widget.package.remote
      return `https://${remote.hostname}${remote.base}${widget.previewImage}`
    }

    if (widget.packageName) {
      const baseUrl = await WidgetPackageApi.getIndexUrl(widget.packageName)
      return baseUrl + widget.previewImage
    }

    return null
  }
}
