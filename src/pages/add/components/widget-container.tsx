import type { WebWidget } from '@widget-js/web-api'
import { Image as ImageIcon, ImageOff } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useWidgetPreviewImage } from '@/hooks/use-widget-preview-image'
import { cn } from '@/lib/utils'
import { ZoomImage } from './zoom-image'

interface WidgetContainerProps {
  widget: WebWidget
  className?: string
}

export default function WidgetContainer({ widget, className }: WidgetContainerProps) {
  const { previewImage, loading, error } = useWidgetPreviewImage(widget)
  const [imageResult, setImageResult] = useState<{ src: string, status: 'loaded' | 'error' } | null>(null)
  const imageError = error || (imageResult?.src === previewImage && imageResult?.status === 'error')
  const imageReady = !!previewImage && imageResult?.src === previewImage && imageResult.status === 'loaded' && !imageError
  const showLoading = !imageError && !imageReady && (loading || !!previewImage)

  const handleImageLoad = useCallback(() => {
    if (!previewImage) { return }
    setImageResult(current => current?.src === previewImage && current.status === 'loaded'
      ? current
      : { src: previewImage, status: 'loaded' })
  }, [previewImage])

  const handleImageError = useCallback(() => {
    if (!previewImage) { return }
    setImageResult(current => current?.src === previewImage && current.status === 'error'
      ? current
      : { src: previewImage, status: 'error' })
  }, [previewImage])

  const cellSize = 72
  const containerHeight = cellSize * 2

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ height: `${containerHeight}px` }}
    >
      {previewImage && !imageError
        ? (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: imageReady ? 1 : 0 }}
              inert={!imageReady}
              aria-hidden={!imageReady}
            >
              <ZoomImage
                key={previewImage}
                src={previewImage}
                alt="Widget Preview"
                className="w-full h-auto max-h-[128px] object-contain drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          )
        : null}

      {/* Fallback states */}
      {!showLoading && !imageReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
          <ImageOff size="32" className="mb-2" />
          <span className="text-xs">Preview unavailable</span>
        </div>
      )}

      {showLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground animate-pulse">
          <ImageIcon size="32" className="mb-2" />
          <span className="text-xs">Loading...</span>
        </div>
      )}
    </div>
  )
}
