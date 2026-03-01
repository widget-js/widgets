import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingSection } from '@/components/setting-section'
import { SocialLinks } from '@/components/tray/social-links'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useAppLanguage } from '@/hooks/use-app-language'
import { useCellSizeConfig } from '@/hooks/use-cell-size-config'
import { useDebugConfig } from '@/hooks/use-debug-config'
import { useLaunchAtStartupConfig } from '@/hooks/use-launch-at-startup-config'

interface Language {
  baseName: string
  language: string
  nativeName: string
  region: string
}

const languages: Language[] = [
  { baseName: 'zh-CN', language: 'zh', nativeName: '简体中文', region: 'CN' },
  { baseName: 'en-US', language: 'en', nativeName: 'English', region: 'US' },
]

export default function GeneralPage() {
  const { t, i18n } = useTranslation()
  const [launchAtStartup, setLaunchAtStartup] = useLaunchAtStartupConfig()
  const [languageCode, setLanguageCode] = useAppLanguage({
    onLoad: (lang) => {
      if (lang !== i18n.language) {
        i18n.changeLanguage(lang)
      }
    },
  })
  const [debugMode, setDebugMode] = useDebugConfig()
  const [gridSize, setGridSize] = useCellSizeConfig()

  useEffect(() => {
    document.title = t('general.title')
  }, [t])

  useEffect(() => {
    if (languageCode !== i18n.language) {
      i18n.changeLanguage(languageCode)
    }
  }, [languageCode, i18n])

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>{t('general.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Field orientation="horizontal" className="justify-between">
            <FieldLabel>{t('general.language')}</FieldLabel>
            <Select value={languageCode} onValueChange={setLanguageCode}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('general.selectLanguage')} />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.baseName} value={lang.language}>
                    {lang.nativeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {gridSize != null && (
            <Field orientation="horizontal" className="justify-between">
              <FieldLabel>{t('general.gridSize')}</FieldLabel>
              <RadioGroup
                value={(gridSize || 60).toString()}
                onValueChange={val => setGridSize(Number.parseInt(val, 10))}
                className="flex gap-4"
              >
                {[60, 70, 80, 90].map(size => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size.toString()} id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`}>
                      {size}
                      px
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Field>
          )}

          <Field orientation="horizontal" className="justify-between">
            <FieldLabel>{t('general.launchAtStartup')}</FieldLabel>
            <Switch
              id="launch-startup"
              checked={launchAtStartup}
              onCheckedChange={setLaunchAtStartup}
            />
          </Field>

          <Field orientation="horizontal" className="justify-between">
            <FieldLabel>{t('general.developerMode')}</FieldLabel>
            <Switch
              id="debug-mode"
              checked={debugMode}
              onCheckedChange={setDebugMode}
            />
          </Field>

          <SettingSection title="交个朋友">
            <SocialLinks />
          </SettingSection>
        </CardContent>
      </Card>
    </div>
  )
}
