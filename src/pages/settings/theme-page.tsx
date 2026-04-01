import type { IAppTheme } from '@widget-js/core'
import type { ThemeTag } from '@/pages/settings/components/theme-tags'
import { AppApi, AppTheme } from '@widget-js/core'
import consola from 'consola'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDebounce } from '@/hooks/use-debounce'
import { AppThemeForm } from '@/pages/settings/components/app-theme-form'
import { ThemePreview } from '@/pages/settings/components/theme-preview'
import { ThemeTags } from '@/pages/settings/components/theme-tags'

interface StoredThemeTag {
  name: string
  value: string
  theme: IAppTheme
}

const SELECT_THEME_STORAGE_KEY = 'selectTheme'
const THEME_PRESETS_STORAGE_KEY = 'widget.theme.presets'

function loadStoredThemeTags() {
  try {
    const storedValue = localStorage.getItem(THEME_PRESETS_STORAGE_KEY)
    if (!storedValue) {
      return []
    }

    const parsed = JSON.parse(storedValue) as StoredThemeTag[]

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.map(item => ({
      name: item.name,
      value: item.value,
      theme: new AppTheme(item.theme),
    }))
  }
  catch (error) {
    consola.error('Failed to load theme presets:', error)
    return []
  }
}

function saveStoredThemeTags(tags: ThemeTag[]) {
  const payload: StoredThemeTag[] = tags.map(tag => ({
    name: tag.name,
    value: tag.value,
    theme: JSON.parse(JSON.stringify(tag.theme)) as IAppTheme,
  }))

  localStorage.setItem(THEME_PRESETS_STORAGE_KEY, JSON.stringify(payload))
}

export default function ThemePage() {
  const { t } = useTranslation()
  const [appTheme, setAppTheme] = useState<AppTheme>(new AppTheme())
  const [customThemeTags, setCustomThemeTags] = useState<ThemeTag[]>([])
  const [selectedThemeTag, setSelectedThemeTag] = useState('dark')
  const isFirstRun = useRef(true)

  // Use debounced theme for saving to avoid excessive API calls
  const debouncedTheme = useDebounce(appTheme, 500)

  // Load initial theme
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const css = await AppApi.getThemeCSS()
        if (css) {
          const loadedTheme = AppTheme.fromCSS(css)
          setAppTheme(loadedTheme)
          consola.info('Loaded app theme:', loadedTheme)
        }

        const storedThemeTags = loadStoredThemeTags()
        setCustomThemeTags(storedThemeTags)

        const storedTag = localStorage.getItem(SELECT_THEME_STORAGE_KEY)
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
    localStorage.setItem(SELECT_THEME_STORAGE_KEY, tag.value)

    const newTheme = appTheme.copy(tag.theme)
    setAppTheme(newTheme)
  }

  const handleThemeChange = (newTheme: AppTheme) => {
    setAppTheme(newTheme)

    setCustomThemeTags((prevTags) => {
      const isCustomPreset = prevTags.some(tag => tag.value === selectedThemeTag)
      if (isCustomPreset) {
        const nextTags = prevTags.map(tag =>
          tag.value === selectedThemeTag ? { ...tag, theme: newTheme.copy() } : tag,
        )
        saveStoredThemeTags(nextTags)
        return nextTags
      }
      return prevTags
    })
  }

  const handleCreateThemePreset = (name: string) => {
    const presetName = name.trim()

    if (!presetName) {
      toast.error(t('theme.createPreset.emptyName'))
      return false
    }

    const hasSameName = customThemeTags.some(tag => tag.name.toLocaleLowerCase() === presetName.toLocaleLowerCase())
    if (hasSameName) {
      toast.error(t('theme.createPreset.duplicateName'))
      return false
    }

    const newPreset: ThemeTag = {
      name: presetName,
      value: `preset-${Date.now()}`,
      theme: appTheme.copy(),
    }

    const nextThemeTags = [...customThemeTags, newPreset]
    setCustomThemeTags(nextThemeTags)
    saveStoredThemeTags(nextThemeTags)
    setSelectedThemeTag(newPreset.value)
    localStorage.setItem(SELECT_THEME_STORAGE_KEY, newPreset.value)
    toast.success(t('theme.createPreset.success'))
    return true
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col gap-6 max-w-5xl mx-auto min-h-full pb-4 w-[700px]">
        <Card className="w-full shrink-0">
          <CardHeader className="shrink-0">
            <CardTitle>{t('theme.preview.title')}</CardTitle>
            <CardDescription>
              {t('theme.preview.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemePreview theme={appTheme} />
          </CardContent>
        </Card>
        <Card className="flex-1 flex flex-col">
          <CardHeader className="shrink-0">
            <CardTitle className="mb-2">{t('theme.presets')}</CardTitle>
            <ThemeTags
              value={selectedThemeTag}
              presets={customThemeTags}
              onChange={handleThemeTagChange}
              onCreatePreset={handleCreateThemePreset}
            />
          </CardHeader>
          <CardContent className="space-y-8 flex-1">
            <div className="flex flex-col gap-8">
              <div className="w-full space-y-8">
                <AppThemeForm
                  value={appTheme}
                  onChange={handleThemeChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
