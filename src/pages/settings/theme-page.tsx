import type { ThemeTag } from '@/pages/settings/components/theme-tags'
import { AppApi, WidgetTheme } from '@widget-js/core'
import consola from 'consola'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingSection } from '@/components/setting-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDebounce } from '@/hooks/use-debounce'
import { ThemeTags } from '@/pages/settings/components/theme-tags'
import { WidgetThemeForm } from '@/pages/settings/components/widget-theme-form'

export default function ThemePage() {
  const { t } = useTranslation()
  const [widgetTheme, setWidgetTheme] = useState<WidgetTheme>(new WidgetTheme({
    fontSize: '16px',
    borderRadius: '8px',
  }))
  const [selectedThemeTag, setSelectedThemeTag] = useState('translucent')
  const isFirstRun = useRef(true)

  // Use debounced theme for saving to avoid excessive API calls
  const debouncedTheme = useDebounce(widgetTheme, 500)

  // Load initial theme
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const css = await AppApi.getThemeCSS()
        if (css) {
          const loadedTheme = WidgetTheme.fromCSS(css)
          setWidgetTheme(loadedTheme)
          consola.info('Loaded widget theme:', loadedTheme)
        }

        // Load selected theme tag preference if stored (optional implementation)
        const storedTag = localStorage.getItem('selectTheme')
        if (storedTag) {
          setSelectedThemeTag(storedTag)
        }
      }
      catch (error) {
        consola.error('Failed to load theme:', error)
      }
      finally {
        isFirstRun.current = false
      }
    }
    loadTheme()
  }, [])

  // Save theme when it changes (debounced)
  useEffect(() => {
    if (isFirstRun.current) { return }

    const saveTheme = async () => {
      try {
        const css = debouncedTheme.toCSS(':root')
        consola.info('Saving new CSS:', css)
        await AppApi.setThemeCSS(css)
      }
      catch (error) {
        consola.error('Failed to save theme:', error)
      }
    }
    saveTheme()
  }, [debouncedTheme])

  const handleThemeTagChange = (tag: ThemeTag) => {
    setSelectedThemeTag(tag.value)
    localStorage.setItem('selectTheme', tag.value)

    // Merge the tag's theme into current theme
    // We need to create a new object to trigger React updates
    // Using Object.assign on the current instance might not trigger re-render if reference doesn't change
    // But WidgetTheme is a class, so we should be careful.
    // The safest way with class instances in React state is to clone.
    const newTheme = widgetTheme.copy(tag.theme)
    setWidgetTheme(newTheme)
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>{t('theme.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <SettingSection title={t('theme.presets')}>
            <ThemeTags
              value={selectedThemeTag}
              onChange={handleThemeTagChange}
            />
          </SettingSection>

          <SettingSection title={t('theme.customization')}>
            <WidgetThemeForm
              value={widgetTheme}
              onChange={setWidgetTheme}
            />
          </SettingSection>
        </CardContent>
      </Card>
    </div>
  )
}
