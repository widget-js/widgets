import { useCallback, useState } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface ZoomImageProps {
  src: string
  alt?: string
  className?: string
  onError?: () => void
  style?: React.CSSProperties
}

export function ZoomImage({ src, alt, className, onError, style }: ZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom)
  }, [])

  return (
    <>
      <style>
        {`
          [data-rmiz-btn-unzoom] {
            top: 80px !important;
            right: 40px !important;
          }
        `}
      </style>
      <ControlledZoom
        isZoomed={isZoomed}
        onZoomChange={handleZoomChange}
      >
        <img
          src={src}
          alt={alt}
          className={className}
          onError={onError}
          style={style}
        />
      </ControlledZoom>
    </>
  )
}
