import { BrowserWindowApi } from '@widget-js/core'

export type SearchEngine = 'bing' | 'google' | 'baidu'

export interface SearchPlatform {
  title: string
  url: string
  value: SearchEngine
  icon: string
}

export const searchPlatformList: SearchPlatform[] = [
  {
    title: 'Google',
    url: 'https://www.google.com/search?q=%s',
    value: 'google',
    icon: '/images/logo/google.png',
  },
  {
    title: 'Bing',
    url: 'https://cn.bing.com/search?q=%s',
    value: 'bing',
    icon: '/images/logo/bing.png',
  },
  {
    title: '百度',
    url: 'https://www.baidu.com/s?wd=%s',
    value: 'baidu',
    icon: '/images/logo/baidu.png',
  },
]

export function search(se: SearchEngine, keyword: string) {
  const platform = searchPlatformList.find(item => item.value === se)
  if (platform) {
    const url = platform.url.replaceAll('%s', keyword)
    BrowserWindowApi.openUrl(url, { external: true })
  }
}
