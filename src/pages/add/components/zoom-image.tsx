import { useCallback, useState } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import './zoom-image.css'

interface ZoomImageProps {
  src: string
  alt?: string
  className?: string
  onLoad?: () => void
  onError?: () => void
  style?: React.CSSProperties
}

export function ZoomImage({ src, alt, className, onLoad, onError, style }: ZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom)
  }, [])

  const handleImageRef = useCallback((image: HTMLImageElement | null) => {
    // Cached images may have finished before the React load handler was attached.
    if (!image?.complete || !src || image.getAttribute('src') !== src) { return }
    if (image.naturalWidth > 0) { onLoad?.() }
    else { onError?.() }
  }, [src, onLoad, onError])

  return (
    <ControlledZoom
      classDialog="widget-preview-dialog"
      isZoomed={isZoomed}
      onZoomChange={handleZoomChange}
    >
      <img
        ref={handleImageRef}
        src={src}
        alt={alt}
        className={className}
        onLoad={onLoad}
        onError={onError}
        style={style}
      />
    </ControlledZoom>
  )
}
