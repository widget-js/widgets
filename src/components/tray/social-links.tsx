import { AppApi, NotificationApi } from '@widget-js/core'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import bilibili from '@/assets/images/bilibili_logo_red.png'
import douyin from '@/assets/images/douyin.png'
import githubMark from '@/assets/images/github-mark.png'
import logo from '@/assets/images/logo.png'
import qq from '@/assets/images/qq.png'

interface SocialLinksProps {
  iconSize?: number
}

function useLongPress(callback: () => void, delay: number = 3000) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      callback()
    }, delay)
  }, [callback, delay])

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  }
}

export function SocialLinks({ iconSize = 20 }: SocialLinksProps) {
  const { t } = useTranslation()

  const handleEnableDevMode = useCallback(async () => {
    NotificationApi.info(t('notification.enableDevMode'))
    await AppApi.setConfig('debug', true)
  }, [t])

  const longPressProps = useLongPress(handleEnableDevMode, 3000)

  const links = [
    {
      name: 'Widget',
      url: 'https://widgetjs.cn/',
      icon: logo,
    },
    {
      name: 'TikTok',
      url: 'https://v.douyin.com/YhuNAb8/',
      icon: douyin,
    },
    {
      name: 'QQ',
      url: 'https://jq.qq.com/?_wv=1027&k=TgO2mUQe',
      icon: qq,
    },
    {
      name: 'Bilibili',
      url: 'https://space.bilibili.com/207395767',
      icon: bilibili,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/widget-js/widgets',
      icon: githubMark,
      ...longPressProps, // Apply long press to GitHub only
    },
  ]

  return (
    <div className="flex items-center justify-start gap-[0.8rem]">
      {links.map(link => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary no-underline leading-none hover:opacity-80 transition-opacity"
          {...(link.name === 'GitHub' ? longPressProps : {})}
        >
          <img
            src={link.icon}
            alt={link.name}
            style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            className="object-contain"
          />
        </a>
      ))}
    </div>
  )
}
