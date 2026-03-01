import type { ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'

interface SettingSectionProps {
  title: string
  children: ReactNode
}

export function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">{title}</h4>
        <Separator className="my-2" />
      </div>
      <div className="space-y-4 pl-1">
        {children}
      </div>
    </div>
  )
}
