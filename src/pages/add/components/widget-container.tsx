import type { WebWidget } from '@widget-js/web-api'
import { WidgetApi } from '@widget-js/core'
import { Image as ImageIcon, ImageOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import { cn } from '@/lib/utils'
import 'react-medium-image-zoom/dist/styles.css'

interface WidgetContainerProps {
  widget: WebWidget
  className?: string
}

export default function WidgetContainer({ widget, className }: WidgetContainerProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const cellSize = 72
  const containerHeight = cellSize * 2

  useEffect(() => {
    const loadPreview = async () => {
      if (!widget.previewImage) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(false)

        if (widget.package && widget.package.remote) {
          const remote = widget.package.remote
          const url = `https://${remote.hostname}${remote.base}${widget.previewImage}`
          setPreviewImage(url)
        }
        else if (widget.packageName) {
          const url = await WidgetApi.getWidgetPackageUrl(widget.packageName)
          setPreviewImage(url + widget.previewImage)
        }
      }
      catch (e) {
        console.error('Failed to load preview image', e)
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }

    loadPreview()
  }, [widget])

  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      style={{ height: `${containerHeight}px` }}
    >
      {previewImage
        ? (
            <Zoom>
              <img
                src={previewImage}
                alt="Widget Preview"
                className="w-full h-auto max-h-[128px] object-contain drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                onError={() => setError(true)}
                style={{ display: error ? 'none' : 'block' }}
              />
            </Zoom>
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
