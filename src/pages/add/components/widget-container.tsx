import type { WebWidget } from '@widget-js/web-api'
import { Image as ImageIcon, ImageOff } from 'lucide-react'
import { useWidgetPreviewImage } from '@/hooks/use-widget-preview-image'
import { cn } from '@/lib/utils'
import { ZoomImage } from './zoom-image'

interface WidgetContainerProps {
  widget: WebWidget
  className?: string
}

export default function WidgetContainer({ widget, className }: WidgetContainerProps) {
  const { previewImage, loading, error, setError } = useWidgetPreviewImage(widget)

  const cellSize = 72
  const containerHeight = cellSize * 2

  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      style={{ height: `${containerHeight}px` }}
    >
      {previewImage
        ? (
            <ZoomImage
              src={previewImage}
              alt="Widget Preview"
              className="w-full h-auto max-h-[128px] object-contain drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              onError={() => setError(true)}
              style={{ display: error ? 'none' : 'block' }}
            />
          )
        : null}

      {/* Fallback states */}
      {(error || (!previewImage && !loading)) && (
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          <ImageOff size="32" className="mb-2" />
          <span className="text-xs">Preview unavailable</span>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center text-muted-foreground animate-pulse">
          <ImageIcon size="32" className="mb-2" />
          <span className="text-xs">Loading...</span>
        </div>
      )}
    </div>
  )
}
