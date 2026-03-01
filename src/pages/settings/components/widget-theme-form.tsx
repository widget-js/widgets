import type { WidgetTheme } from '@widget-js/core'
import { Sketch } from '@uiw/react-color'
import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface WidgetThemeFormProps {
  value: WidgetTheme
  onChange: (value: WidgetTheme) => void
}

export function WidgetThemeForm({ value, onChange }: WidgetThemeFormProps) {
  const { t } = useTranslation()

  const handleChange = (key: keyof WidgetTheme, val: any) => {
    // Create a new instance to ensure React detects the change
    const newTheme = value.copy({ [key]: val })
    onChange(newTheme)
  }

  const renderColorInput = (label: string, key: keyof WidgetTheme) => (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
      <Label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-16 text-right font-mono truncate">
          {value[key] as string}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="h-8 w-8 rounded-md border border-input overflow-hidden relative cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: value[key] as string || '#000000' }}
            >
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto p-0 border-none bg-transparent shadow-none">
            <Sketch
              style={{ boxShadow: 'none' }}
              color={value[key] as string || '#000000'}
              onChange={(color) => {
                // Determine which format to use based on alpha
                const { r, g, b, a } = color.rgb as any

                // If the color has transparency, use rgba string
                if (a !== undefined && a < 1) {
                  handleChange(key, `rgba(${r}, ${g}, ${b}, ${a})`)
                }
                else {
                  handleChange(key, color.hex)
                }
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="grid gap-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="fontSize">{t('theme.fontSize')}</Label>
          <span className="text-sm text-muted-foreground w-12 text-right">
            {Number.parseInt(value.fontSize as string)}
            px
          </span>
        </div>
        <Slider
          id="fontSize"
          min={8}
          max={50}
          step={1}
          value={[Number.parseInt(value.fontSize as string)]}
          onValueChange={([val]) => handleChange('fontSize', `${val}px`)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="borderRadius">{t('theme.borderRadius')}</Label>
          <span className="text-sm text-muted-foreground w-12 text-right">
            {Number.parseInt(value.borderRadius as string || '0')}
            px
          </span>
        </div>
        <Slider
          id="borderRadius"
          min={0}
          max={50}
          step={1}
          value={[Number.parseInt(value.borderRadius as string || '0')]}
          onValueChange={([val]) => handleChange('borderRadius', `${val}px`)}
        />
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fontFamily">{t('theme.fontFamily')}</Label>
          <Input
            id="fontFamily"
            value={value.fontFamily || ''}
            onChange={e => handleChange('fontFamily', e.target.value)}
            placeholder={t('theme.systemDefault')}
          />
        </div>

        {renderColorInput(t('theme.primaryColor'), 'primaryColor')}
        {renderColorInput(t('theme.textColor'), 'color')}
        {renderColorInput(t('theme.backgroundColor'), 'backgroundColor')}
        {renderColorInput(t('theme.borderColor'), 'backgroundBorderColor')}
        {renderColorInput(t('theme.shadowColor'), 'backgroundBoxShadowColor')}
        {renderColorInput(t('theme.dividerColor'), 'dividerColor')}
      </div>
    </div>
  )
}
