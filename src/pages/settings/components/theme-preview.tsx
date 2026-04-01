import type { AppTheme } from '@widget-js/core'
import { useTranslation } from 'react-i18next'
import wallpaper from '@/assets/images/wallpaper.jpg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface ThemePreviewProps {
  theme: AppTheme
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  const { t } = useTranslation()
  // Convert theme object to inline styles for the preview container
  const cssVars = theme.toCSSVariables('--widget')

  return (
    <div
      className={cn('w-full rounded-lg bg-background text-foreground overflow-hidden p-4 bg-cover bg-center', theme.mode === 'dark' ? 'dark' : '')}
      style={{
        ...cssVars as React.CSSProperties,
        backgroundImage: `url(${wallpaper})`,
      }}
    >
      {/* We apply the custom CSS variables to this specific container */}
      <div
        className="grid gap-6"
        style={{
          // Mapping standard UI variables to the preview variables so the internal shadcn ui components pick them up
          '--background': 'var(--widget-colors-background)',
          '--foreground': 'var(--widget-colors-foreground)',
          '--card': 'var(--widget-colors-card)',
          '--card-foreground': 'var(--widget-colors-card-foreground)',
          '--popover': 'var(--widget-colors-popover)',
          '--popover-foreground': 'var(--widget-colors-popover-foreground)',
          '--primary': 'var(--widget-colors-primary)',
          '--primary-foreground': 'var(--widget-colors-primary-foreground)',
          '--secondary': 'var(--widget-colors-secondary)',
          '--secondary-foreground': 'var(--widget-colors-secondary-foreground)',
          '--muted': 'var(--widget-colors-muted)',
          '--muted-foreground': 'var(--widget-colors-muted-foreground)',
          '--accent': 'var(--widget-colors-accent)',
          '--accent-foreground': 'var(--widget-colors-accent-foreground)',
          '--destructive': 'var(--widget-colors-destructive)',
          '--destructive-foreground': 'var(--widget-colors-destructive-foreground)',
          '--border': 'var(--widget-colors-border)',
          '--input': 'var(--widget-colors-input)',
          '--ring': 'var(--widget-colors-ring)',
          '--radius': 'var(--widget-radius-md)',
          'fontFamily': 'var(--widget-typography-font-family)',
          'fontSize': 'var(--widget-typography-font-size)',
        } as React.CSSProperties}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example Form Preview */}
          <div
            className="space-y-6 border"
            style={{
              backgroundColor: 'var(--widget-colors-background)',
              color: 'var(--widget-colors-foreground)',
              borderColor: 'var(--widget-colors-border)',
              borderRadius: 'var(--widget-radius-lg)',
              boxShadow: 'var(--widget-shadow-md)',
              padding: 'var(--widget-spacing, 1.5rem)',
            }}
          >
            <div className="space-y-2">
              <h4 className="font-semibold tracking-tight">{t('theme.preview.cardTitle')}</h4>
              <p className="text-sm text-muted-foreground">{t('theme.preview.cardDesc')}</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preview-input">{t('theme.preview.email')}</Label>
                <Input id="preview-input" placeholder={t('theme.preview.emailPlaceholder')} className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="preview-switch" />
                <Label htmlFor="preview-switch">{t('theme.preview.enableNotifications')}</Label>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline">{t('theme.preview.cancel')}</Button>
              <Button>{t('theme.preview.save')}</Button>
            </div>
          </div>

          {/* Interactive Elements Preview */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">{t('theme.preview.buttons')}</h4>
              <div className="flex flex-wrap gap-2">
                <Button>{t('theme.preview.primary')}</Button>
                <Button variant="secondary">{t('theme.preview.secondary')}</Button>
                <Button variant="destructive">{t('theme.preview.destructive')}</Button>
                <Button variant="outline">{t('theme.preview.outline')}</Button>
                <Button variant="ghost">{t('theme.preview.ghost')}</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">{t('theme.preview.inputRing')}</h4>
              <div className="space-y-2">
                <Input
                  placeholder={t('theme.preview.inputPlaceholder')}
                  className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">{t('theme.preview.slider')}</h4>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
