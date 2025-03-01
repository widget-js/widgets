import type { GridSystem } from '@/views/desktop/GridSystem'

export class GridSystemDrawer {
  private gridContext: CanvasRenderingContext2D
  gridSystem: GridSystem

  constructor(gridSystem: GridSystem) {
    this.gridSystem = gridSystem
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.gridContext = canvas.getContext('2d') as CanvasRenderingContext2D
    this.drawGrid()
  }

  drawGrid() {
    const height = this.gridSystem.getHeight()
    const width = this.gridSystem.getWidth()
    this.gridContext.save()
    this.gridContext.translate(this.gridSystem.left, this.gridSystem.top)
    this.gridContext.roundRect(0, 0, width, height, 8)

    for (let i = 1; i < this.gridSystem.horizontalCellCount; i++) {
      const x = (i * this.gridSystem.cellSize)
      this.gridContext.moveTo(x, 0)
      this.gridContext.lineTo(x, height)
      this.gridContext.stroke()
    }

    for (let i = 1; i < this.gridSystem.verticalCellCount; i++) {
      const y = (i * this.gridSystem.cellSize)
      this.gridContext.moveTo(0, y)
      this.gridContext.lineTo(width, y)
      this.gridContext.stroke()
    }

    this.gridContext.restore()
  }
}
