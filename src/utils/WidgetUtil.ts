import type { SocialType } from '@widget-js/core'

export default class WidgetUtil {
  static getSocialLinkIcon(socialName: SocialType) {
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
}
