import type { WidgetPreviewInfo } from '@/utils/widget-util'
import { useEffect, useState } from 'react'
import WidgetUtil from '@/utils/widget-util'

export function useWidgetPreviewImage(widget: WidgetPreviewInfo | undefined | null) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    let cancelled = false

    const loadPreview = async () => {
      if (!widget) {
        setLoading(false)
        return
      }

      if (!widget.previewImage) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(false)

        const url = await WidgetUtil.resolvePreviewImageUrl(widget)
        if (!cancelled) {
          setPreviewImage(url)
        }
      }
      catch (e) {
        console.error('Failed to load preview image', e)
        if (!cancelled) {
          setError(true)
        }
      }
      finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPreview()

    return () => {
      cancelled = true
    }
  }, [widget])

  return {
    previewImage,
    loading,
    error,
    setError,
  }
}
