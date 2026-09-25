import type { LucideIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface TrayMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  label: string
}

function TrayMenuItem({ ref, className, icon: Icon, label, ...props }: TrayMenuItemProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center gap-2 px-1 py-4 rounded-lg cursor-pointer transition-colors duration-150',
        'bg-muted text-foreground inset-ring inset-ring-border hover:bg-border active:bg-border/80',
        'dark:hover:bg-white/15 dark:hover:inset-ring-white/20 dark:active:bg-white/20',
        className,
      )}
      {...props}
    >
      <Icon className="h-5 w-5 cursor-pointer" />
      <span className="text-xs">{label}</span>
    </div>
  )
}
TrayMenuItem.displayName = 'TrayMenuItem'

export { TrayMenuItem }
