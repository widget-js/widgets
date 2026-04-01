import type { AppTheme, ThemeColors } from '@widget-js/core'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FontFamilyPicker } from './font-family-picker'

interface AppThemeFormProps {
  value: AppTheme
  onChange: (value: AppTheme) => void
}

export function AppThemeForm({ value, onChange }: AppThemeFormProps) {
  const { t } = useTranslation()

  const handleNestedChange = (category: keyof AppTheme, key: string, val: any) => {
    const newTheme = value.copy({
      [category]: {
        [key]: val,
      },
    })
    onChange(newTheme)
  }

  const renderColorInput = (label: string, key: keyof ThemeColors) => (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-1" key={key}>
      <Label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-32 text-right font-mono truncate">
          {value.colors?.[key] as string}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="h-8 w-8 rounded-md border border-input overflow-hidden relative cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: value.colors?.[key] as string || '#000000' }}
            >
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto p-0 border-none bg-transparent shadow-none">
            <Sketch
              style={{ boxShadow: 'none' }}
              color={value.colors?.[key] as string || '#000000'}
              onChange={(color) => {
                // color.hexa always exists and contains the alpha channel if supported by the picker
                // e.g. "#00000080" for 50% opacity
                handleNestedChange('colors', key, color.hexa || color.hex)
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  const renderBoxShadowInput = (key: 'sm' | 'md' | 'lg', label: string) => {
    const shadow = value.shadow?.[key] || { offsetX: '0px', offsetY: '0px', blur: '0px' }

    const handleChange = (field: keyof typeof shadow, val: string) => {
      const newTheme = value.copy({
        shadow: {
          ...value.shadow,
          [key]: {
            ...shadow,
            [field]: val,
          },
        },
      })
      onChange(newTheme)
    }

    return (
      <div className="grid gap-2 border p-4 rounded-lg" key={key}>
        <Label className="font-semibold">{label}</Label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor={`shadow-${key}-offsetX`} className="text-xs text-muted-foreground">OffsetX</Label>
            <Input
              id={`shadow-${key}-offsetX`}
              value={shadow.offsetX}
              onChange={e => handleChange('offsetX', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`shadow-${key}-offsetY`} className="text-xs text-muted-foreground">OffsetY</Label>
            <Input
              id={`shadow-${key}-offsetY`}
              value={shadow.offsetY}
              onChange={e => handleChange('offsetY', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`shadow-${key}-blur`} className="text-xs text-muted-foreground">Blur</Label>
            <Input
              id={`shadow-${key}-blur`}
              value={shadow.blur}
              onChange={e => handleChange('blur', e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderSlider = (category: keyof AppTheme, key: string, label: string, min: number, max: number) => {
    const valStr = (value as any)[category]?.[key] as string || '0'
    const numVal = Number.parseFloat(valStr) || 0
    const unit = valStr.replace(/[0-9.]/g, '') || 'px'

    return (
      <div className="space-y-4" key={key}>
        <div className="flex items-center justify-between">
          <Label htmlFor={`${category}-${key}`}>{label}</Label>
          <span className="text-sm text-muted-foreground w-16 text-right">
            {numVal}
            {unit}
          </span>
        </div>
        <Slider
          id={`${category}-${key}`}
          min={min}
          max={max}
          step={1}
          value={[numVal]}
          onValueChange={([val]) => handleNestedChange(category, key, `${val}${unit}`)}
        />
      </div>
    )
  }

  return (
    <Tabs defaultValue="colors" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="colors">{t('theme.colors.title')}</TabsTrigger>
        <TabsTrigger value="typography">{t('theme.typography.title')}</TabsTrigger>
        <TabsTrigger value="radius">{t('theme.radius.title')}</TabsTrigger>
        <TabsTrigger value="shadow">{t('theme.shadow.title')}</TabsTrigger>
      </TabsList>

      <TabsContent value="colors" className="mt-4 h-full">
        <div className="grid gap-2">
          <h4 className="text-sm font-semibold mt-2 mb-1">{t('theme.colors.base')}</h4>
          {renderColorInput(t('theme.colors.background'), 'background')}
          {renderColorInput(t('theme.colors.foreground'), 'foreground')}
          {renderColorInput(t('theme.colors.border'), 'border')}
          {renderColorInput(t('theme.colors.shadow'), 'shadow')}
          {renderColorInput(t('theme.colors.innerShadow'), 'innerShadow')}

          <h4 className="text-sm font-semibold mt-4 mb-1">{t('theme.colors.primary')}</h4>
          {renderColorInput(t('theme.colors.primary'), 'primary')}
          {renderColorInput(t('theme.colors.primaryForeground'), 'primaryForeground')}

          <h4 className="text-sm font-semibold mt-4 mb-1">{t('theme.colors.secondary')}</h4>
          {renderColorInput(t('theme.colors.secondary'), 'secondary')}
          {renderColorInput(t('theme.colors.secondaryForeground'), 'secondaryForeground')}

          <h4 className="text-sm font-semibold mt-4 mb-1">{t('theme.colors.muted')}</h4>
          {renderColorInput(t('theme.colors.muted'), 'muted')}
          {renderColorInput(t('theme.colors.mutedForeground'), 'mutedForeground')}

          <h4 className="text-sm font-semibold mt-4 mb-1">{t('theme.colors.accent')}</h4>
          {renderColorInput(t('theme.colors.accent'), 'accent')}
          {renderColorInput(t('theme.colors.accentForeground'), 'accentForeground')}

          <h4 className="text-sm font-semibold mt-4 mb-1">{t('theme.colors.destructive')}</h4>
          {renderColorInput(t('theme.colors.destructive'), 'destructive')}
          {renderColorInput(t('theme.colors.destructiveForeground'), 'destructiveForeground')}

          <h4 className="text-sm font-semibold mt-4 mb-1">{t('theme.colors.cardPopover')}</h4>
          {renderColorInput(t('theme.colors.card'), 'card')}
          {renderColorInput(t('theme.colors.cardForeground'), 'cardForeground')}
          {renderColorInput(t('theme.colors.popover'), 'popover')}
          {renderColorInput(t('theme.colors.popoverForeground'), 'popoverForeground')}

          <h4 className="text-sm font-semibold mt-4 mb-1">{t('theme.colors.bordersInputs')}</h4>
          {renderColorInput(t('theme.colors.input'), 'input')}
          {renderColorInput(t('theme.colors.ring'), 'ring')}
        </div>
      </TabsContent>

      <TabsContent value="typography" className="mt-4">
        <div className="grid gap-6">
          <FontFamilyPicker
            label={t('theme.fontFamily')}
            value={(value as any).typography?.fontFamily || ''}
            onChange={val => handleNestedChange('typography', 'fontFamily', val)}
          />
          {renderSlider('typography', 'fontSize', t('theme.fontSize'), 8, 50)}
        </div>
      </TabsContent>

      <TabsContent value="radius" className="mt-4">
        <div className="grid gap-6">
          {renderSlider('radius', 'sm', t('theme.radius.sm'), 0, 50)}
          {renderSlider('radius', 'md', t('theme.radius.md'), 0, 50)}
          {renderSlider('radius', 'lg', t('theme.radius.lg'), 0, 50)}
          {renderSlider('radius', 'full', t('theme.radius.full'), 0, 9999)}
        </div>
      </TabsContent>

      <TabsContent value="shadow" className="mt-4">
        <div className="grid gap-4">
          {renderBoxShadowInput('sm', t('theme.shadow.sm'))}
          {renderBoxShadowInput('md', t('theme.shadow.md'))}
          {renderBoxShadowInput('lg', t('theme.shadow.lg'))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
