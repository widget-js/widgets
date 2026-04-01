import type { FormEvent } from 'react'
import { AppTheme } from '@widget-js/core'
import { Check, Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface ThemeTag {
  name: string
  value: string
  theme: AppTheme
}

const dark = new AppTheme({
  useGlobalTheme: true,
  mode: 'dark',
  colors: {
    background: '#000026',
    foreground: '#f1f1f1',
    card: '#111113',
    cardForeground: '#FAFAFA',
    popover: '#111113',
    popoverForeground: '#FAFAFA',
    primary: '#7C8CF8',
    primaryForeground: '#0E0E10',
    secondary: '#1A1A1D',
    secondaryForeground: '#E4E4E7',
    muted: '#1A1A1D',
    mutedForeground: '#A1A1AA',
    accent: '#1E1F25',
    accentForeground: '#C7D2FE',
    destructive: '#FF6369',
    destructiveForeground: '#0E0E10',
    border: '#6f6f94',
    input: '#27272A',
    ring: '#7C8CF8',
    shadow: 'rgba(0,0,0,0.5)',
    innerShadow: 'rgb(0 0 0 / 0.11)',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    full: '9999px',
  },
  typography: {
    fontFamily: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    fontSize: '14px',
  },
  shadow: {
    sm: { offsetX: '0px', offsetY: '1px', blur: '2px' },
    md: { offsetX: '0px', offsetY: '6px', blur: '20px' },
    lg: { offsetX: '0px', offsetY: '20px', blur: '40px' },
  },
  spacing: '0.25rem',
})
const light = new AppTheme({
  useGlobalTheme: true,
  mode: 'light',
  colors: {
    background: '#ffffff',
    foreground: '#272e39',
    card: '#FFFFFF',
    cardForeground: '#0A0A0A',
    popover: '#FFFFFF',
    popoverForeground: '#0A0A0A',
    primary: '#5E6AD2',
    primaryForeground: '#FFFFFF',
    secondary: '#F4F4F5',
    secondaryForeground: '#18181B',
    muted: '#F9F9FB',
    mutedForeground: '#71717A',
    accent: '#EEF2FF',
    accentForeground: '#4338CA',
    destructive: '#E5484D',
    destructiveForeground: '#FFFFFF',
    border: '#E4E4E7',
    input: '#E4E4E7',
    ring: '#5E6AD2',
    shadow: 'rgba(0,0,0,0.04)',
    innerShadow: 'rgba(0,0,0,0.02)',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    full: '9999px',
  },
  typography: {
    fontFamily: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    fontSize: '14px',
  },
  shadow: {
    sm: { offsetX: '0px', offsetY: '1px', blur: '2px' },
    md: { offsetX: '0px', offsetY: '4px', blur: '12px' },
    lg: { offsetX: '0px', offsetY: '10px', blur: '30px' },
  },
  spacing: '0.25rem',
})
const semiTransparent = new AppTheme({
  mode: 'dark',
  colors: {
    background: 'rgba(0, 0, 0, 0.5)',
    card: 'rgba(0, 0, 0, 0.5)',
    popover: 'rgba(0, 0, 0, 0.5)',
    border: 'rgb(145 145 145 / 0.5)',
    innerShadow: 'rgb(208 208 208 / 0.25)',
  },
})

interface ThemeTagsProps {
  value: string
  presets: ThemeTag[]
  onChange: (value: ThemeTag) => void
  onCreatePreset: (name: string) => boolean
}

export function ThemeTags({ value, presets, onChange, onCreatePreset }: ThemeTagsProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [presetName, setPresetName] = useState('')

  const themes: ThemeTag[] = [
    ...presets,
    { name: t('theme.dark', '深色'), value: 'dark', theme: dark },
    { name: t('theme.light', '浅色'), value: 'light', theme: light },
    { name: t('theme.translucent', '半透明'), value: 'semi-transparent', theme: semiTransparent },
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (onCreatePreset(presetName)) {
      setOpen(false)
      setPresetName('')
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          if (!nextOpen) {
            setPresetName('')
          }
        }}
      >
        <Button
          variant="secondary"
          size="icon-sm"
          type="button"
          className="rounded-full"
          onClick={() => setOpen(true)}
          aria-label={t('theme.createPreset.button')}
        >
          <Plus />
        </Button>
        <DialogContent className="sm:max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{t('theme.createPreset.title')}</DialogTitle>
              <DialogDescription>{t('theme.createPreset.description')}</DialogDescription>
            </DialogHeader>
            <Input
              value={presetName}
              onChange={event => setPresetName(event.target.value)}
              placeholder={t('theme.createPreset.namePlaceholder')}
              autoFocus
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {t('theme.createPreset.cancel')}
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!presetName.trim()}>
                {t('theme.createPreset.confirm')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
