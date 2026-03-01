import type { WidgetTheme } from '@widget-js/core'
import { DefaultWidgetTheme } from '@widget-js/core'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export interface ThemeTag {
  name: string
  value: string
  theme: WidgetTheme
}

const translucent = DefaultWidgetTheme
const dark = DefaultWidgetTheme.copy({
  primaryColor: '#1890ff',
  backgroundColor: '#001529',
  backgroundBorderColor: 'rgba(255,255,255,0.25)',
  backgroundBoxShadowColor: 'rgba(255,255,255,0.25)',
  dividerColor: 'rgba(255,255,255,0.25)',
  color: '#fff',
})

const light = DefaultWidgetTheme.copy({
  primaryColor: '#1890ff',
  backgroundColor: '#ffffff',
  backgroundBorderColor: 'transparent',
  backgroundBoxShadowColor: 'transparent',
  dividerColor: 'rgba(0,0,0,0.1)',
  color: '#001529',
})

interface ThemeTagsProps {
  value: string
  onChange: (value: ThemeTag) => void
}

export function ThemeTags({ value, onChange }: ThemeTagsProps) {
  const { t } = useTranslation()

  const themes: ThemeTag[] = [
    { name: t('theme.translucent'), value: 'translucent', theme: translucent },
    { name: t('theme.dark'), value: 'dark', theme: dark },
    { name: t('theme.light'), value: 'light', theme: light },
  ]

  return (
    <div className="flex gap-2">
      {themes.map(item => (
        <button
          key={item.value}
          onClick={() => onChange(item)}
          className={cn(
            'inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
            value === item.value
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          )}
        >
          {item.name}
          {value === item.value && <Check className="ml-2 h-3.5 w-3.5" />}
        </button>
      ))}
    </div>
  )
}
