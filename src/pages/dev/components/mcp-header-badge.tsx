import { Info } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface McpInfo {
  port: number
  url: string
  clientConfig: {
    mcpServers: {
      widgetjs: {
        transport: string
        url: string
      }
    }
  }
}

interface McpHeaderBadgeProps {
  mcpInfo: McpInfo | null
  onCopyConfig: () => void
}

export function McpHeaderBadge({ mcpInfo, onCopyConfig }: McpHeaderBadgeProps) {
  const [open, setOpen] = useState(false)

  const handleCopy = () => {
    onCopyConfig()
  }

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm px-3 py-1.5 shadow-sm cursor-pointer hover:bg-background transition-colors">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              MCP Server
              {mcpInfo && (
                <span className="font-mono text-foreground">{mcpInfo.port}</span>
              )}
            </span>
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>MCP Client Config</DialogTitle>
            <DialogDescription>
              {mcpInfo
                ? <span className="font-mono text-xs">{mcpInfo.url}</span>
                : 'MCP Server 未启动'}
            </DialogDescription>
          </DialogHeader>
          {mcpInfo && (
            <pre className="p-3 text-[11px] leading-relaxed font-mono bg-muted/50 rounded-lg border border-border/50 text-foreground/90 overflow-x-auto max-h-[300px]">
              {JSON.stringify(mcpInfo.clientConfig, null, 2)}
            </pre>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCopy}
              disabled={!mcpInfo}
            >
              复制
            </Button>
            <Button onClick={() => setOpen(false)}>
              确认
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
