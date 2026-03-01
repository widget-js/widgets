import type { ProxyConfig } from '@widget-js/core'
import { AppApi } from '@widget-js/core'
import consola from 'consola'
import { AlertTriangle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

export default function ProxyPage() {
  const { t } = useTranslation()
  const [protocol, setProtocol] = useState('http')
  const [hostname, setHostname] = useState('')
  const [port, setPort] = useState('')

  const debouncedProtocol = useDebounce(protocol, 1000)
  const debouncedHostname = useDebounce(hostname, 1000)
  const debouncedPort = useDebounce(port, 1000)

  // Load initial proxy settings
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

  // Update proxy settings when debounced values change
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
    <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <div className="bg-yellow-50 text-yellow-900 border border-yellow-200 px-4 py-3 rounded-md flex items-center gap-2 text-sm">
        <AlertTriangle className="h-4 w-4" />
        <span>{t('proxy.warning')}</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('proxy.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
