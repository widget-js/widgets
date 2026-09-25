import type { ProxyConfig } from '@widget-js/core'
import { AppApi } from '@widget-js/core'
import consola from 'consola'
import { AlertTriangle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingSection } from '@/components/setting-section'
import { SocialLinks } from '@/components/tray/social-links'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
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
import { useDebounce } from '@/hooks/use-debounce'
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

  const [protocol, setProtocol] = useState('http')
  const [hostname, setHostname] = useState('')
  const [port, setPort] = useState('')

  const debouncedProtocol = useDebounce(protocol, 1000)
  const debouncedHostname = useDebounce(hostname, 1000)
  const debouncedPort = useDebounce(port, 1000)

  useEffect(() => {
    document.title = t('general.title')
  }, [t])

  useEffect(() => {
    if (languageCode !== i18n.language) {
      i18n.changeLanguage(languageCode)
    }
  }, [languageCode, i18n])

  useEffect(() => {
    AppApi.getProxy().then((value) => {
      consola.info('proxy', value)
      if (value && value.proxyRules) {
        try {
          const url = new URL(value.proxyRules)
          setProtocol(url.protocol.replace(':', ''))
          setHostname(url.hostname)
          setPort(url.port)
        }
        catch (e) {
          consola.error(e)
        }
      }
    })
  }, [])

  useEffect(() => {
    const updateProxy = async () => {
      if (debouncedProtocol && debouncedHostname && debouncedPort) {
        const proxyRules = `${debouncedProtocol}://${debouncedHostname}:${debouncedPort}`
        const proxyConfig: ProxyConfig = {
          proxyRules,
        }
        await AppApi.setProxy(proxyConfig)
      }
    }
    updateProxy()
  }, [debouncedProtocol, debouncedHostname, debouncedPort])

  const clearProxy = async () => {
    setProtocol('')
    setHostname('')
    setPort('')
    await AppApi.setProxy({})
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full pb-6">
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

      <Card>
        <CardHeader>
          <CardTitle>{t('proxy.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 text-yellow-900 border border-yellow-200 px-4 py-3 rounded-md flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span>{t('proxy.warning')}</span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t('proxy.protocol')}
            </label>
            <div className="flex flex-wrap gap-2">
              {['http', 'https', 'sock4', 'sock5'].map(p => (
                <Button
                  key={p}
                  variant={protocol === p ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProtocol(p)}
                  className="w-20"
                >
                  {p.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t('proxy.server')}
            </label>
            <Input
              value={hostname}
              onChange={e => setHostname(e.target.value)}
              placeholder="127.0.0.1"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t('proxy.port')}
            </label>
            <div className="flex gap-2">
              <Input
                value={port}
                onChange={e => setPort(e.target.value)}
                maxLength={5}
                placeholder="7890"
                className="flex-1"
              />
              <Button variant="destructive" onClick={clearProxy}>
                {t('proxy.clearProxy')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
