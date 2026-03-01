import { AppApi } from '@widget-js/core'
import { useEffect, useRef, useState } from 'react'

export function useCellSizeConfig() {
  const [gridSize, setGridSize] = useState(80)
  const loadedRef = useRef(false)

  useEffect(() => {
    AppApi.getGridCellSize().then((size) => {
      setGridSize(size)
      loadedRef.current = true
    })
  }, [])

  const updateGridSize = async (newSize: number) => {
    setGridSize(newSize)
    if (loadedRef.current) {
      await AppApi.setGridCellSize(newSize)
    }
  }

  return [gridSize, updateGridSize] as const
}
