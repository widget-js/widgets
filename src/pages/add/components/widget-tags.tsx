import {
  Bot,
  Calendar,
  Clock,
  Download,
  Gamepad2,
  LayoutGrid,
  Newspaper,
  Sun,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WidgetTagsProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function WidgetTags({ value, onChange, className }: WidgetTagsProps) {
  const { t } = useTranslation()

  const tags = [
    { icon: LayoutGrid, label: t('tags.all', 'All'), value: '' },
    { icon: Bot, label: t('tags.ai', 'AI'), value: 'ai' },
    { icon: Wrench, label: t('tags.tools', 'Utilities'), value: 'utilities' },
    { icon: Zap, label: t('tags.productivity', 'Productivity'), value: 'productivity' },
    { icon: Newspaper, label: t('tags.news', 'News'), value: 'news' },
    { icon: Sun, label: t('tags.weather', 'Weather'), value: 'weather' },
    { icon: Gamepad2, label: t('tags.fun', 'Fun'), value: 'fun' },
    { icon: Calendar, label: t('tags.calendar', 'Calendar'), value: 'calendar' },
    { icon: Clock, label: t('tags.time', 'Time'), value: 'time' },
    { icon: TrendingUp, label: t('tags.finance', 'Finance'), value: 'finance' },
    { icon: Download, label: t('tags.installed', 'Installed'), value: 'installed' },
  ]

  return (
    <div className={cn('flex gap-2 overflow-x-auto pb-2 scrollbar-hide items-center h-[50px]', className)}>
      {tags.map(tag => (
        <Button
          key={tag.value}
          variant={value === tag.value ? 'default' : 'secondary'}
          size="sm"
          onClick={() => onChange(tag.value)}
          className={cn(
            'whitespace-nowrap rounded-full px-4 gap-2 transition-all duration-200',
            value === tag.value ? 'shadow-md' : 'hover:bg-secondary/80',
          )}
        >
          <tag.icon size={14} />
          {tag.label}
        </Button>
      ))}
    </div>
  )
}
