import { Check, ChevronsUpDown, Loader2, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

function getDefaultFonts(t: any) {
  return [
    { label: t('theme.systemDefault'), value: 'system-ui, sans-serif' },
  ]
}

interface FontFamilyPickerProps {
  value: string
  onChange: (val: string) => void
  label: string
}

export function FontFamilyPicker({ value, onChange, label }: FontFamilyPickerProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const defaultFonts = useMemo(() => getDefaultFonts(t), [t])
  const [fonts, setFonts] = useState(defaultFonts)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadSystemFonts = async () => {
      try {
        if ('queryLocalFonts' in window) {
          setIsLoading(true)
          // Request permission and query local fonts
          const localFonts = await (window as any).queryLocalFonts()
          const systemFonts = localFonts.map((font: any) => ({
            label: font.fullName,
            value: `"${font.family}"`,
          }))

          // Filter out duplicates (based on family name) and merge with defaults
          const uniqueSystemFonts = Array.from(new Map(systemFonts.map((item: any) => [item.value, item])).values()) as typeof defaultFonts

          // Merge defaults with system fonts, prioritizing defaults at the top
          const mergedFonts = [...defaultFonts]
          for (const sysFont of uniqueSystemFonts) {
            if (!mergedFonts.some(f => f.value.includes(sysFont.value.replace(/"/g, '')))) {
              mergedFonts.push(sysFont)
            }
          }

          setFonts(mergedFonts)
        }
      }
      catch (error) {
        console.error('Failed to load system fonts:', error)
      }
      finally {
        setIsLoading(false)
      }
    }

    if (open && fonts.length === defaultFonts.length) {
      loadSystemFonts()
    }
  }, [open, fonts.length, defaultFonts])

  const filteredFonts = fonts.filter(f =>
    f.label.toLowerCase().includes(search.toLowerCase())
    || f.value.toLowerCase().includes(search.toLowerCase()),
  )
  const currentFont = fonts.find(f => f.value === value) || { label: value || 'Default', value }

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between font-normal">
            <span className="truncate">{currentFont.label}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
              placeholder={t('theme.searchFont')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <ScrollArea className="h-64 p-1">
            {isLoading
              ? (
                  <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    加载中...
                  </div>
                )
              : filteredFonts.length === 0
                ? (
                    <div className="py-6 text-center text-sm">{t('theme.fontNotFound')}</div>
                  )
                : (
                    filteredFonts.map(font => (
                      <div
                        key={font.value + font.label}
                        className={cn(
                          'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                          value === font.value ? 'bg-accent text-accent-foreground' : '',
                        )}
                        onClick={() => {
                          onChange(font.value)
                          setOpen(false)
                        }}
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          {value === font.value && <Check className="h-4 w-4" />}
                        </span>
                        <span className="truncate" style={{ fontFamily: font.value }}>{font.label}</span>
                      </div>
                    ))
                  )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}
