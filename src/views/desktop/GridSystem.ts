export interface IGridRect {
  top: number
  left: number
  width: number
  height: number
}

export class GridRect implements IGridRect {
  top: number
  left: number
  width: number
  height: number

  constructor(left: number, top: number, width: number, height: number) {
    this.top = top
    this.left = left
    this.width = width
    this.height = height
  }

  get right(): number {
    return this.left + this.width
  }

  get bottom(): number {
    return this.top + this.height
  }
}

export class GridSystem extends GridRect {
  cellSize: number
  horizontalCellCount: number
  verticalCellCount: number
  screenWidth: number
  screenHeight: number
  /**
   * 屏幕x坐标，用于解决多块屏幕坐标计算问题
   */
  screenLeft?: number
  /**
   * 屏幕y坐标，用于解决多块屏幕坐标计算问题
   */
  screenTop?: number
  canvasScreenTop: number
  canvasScreenLeft: number

  /**
   *
   * @param cellSize
   * @param padding     至少保留的边距
   * @param screenWidth
   * @param screenHeight
   * @param screenX
   * @param screenY
   */
  constructor(
    cellSize: number,
    padding: number,
    screenWidth: number,
    screenHeight: number,
    screenX?: number,
    screenY?: number,
  ) {
    const gridMaxWidth = screenWidth - padding * 2
    const gridMaxHeight = screenHeight - padding * 2
    const horizontalPadding = (gridMaxWidth % cellSize) / 2 + padding
    const verticalPadding = (gridMaxHeight % cellSize) / 2 + padding
    const horizontalCellCount = Math.floor(gridMaxWidth / cellSize)
    const verticalCellCount = Math.floor(gridMaxHeight / cellSize)
    super(horizontalPadding, verticalPadding, horizontalCellCount * cellSize, verticalCellCount * cellSize)
    this.canvasScreenLeft = horizontalPadding + (screenX ?? 0)
    this.canvasScreenTop = verticalPadding + (screenY ?? 0)
    this.cellSize = cellSize
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
    this.horizontalCellCount = horizontalCellCount
    this.verticalCellCount = verticalCellCount
    this.screenLeft = screenX
    this.screenTop = screenY
  }

  /**
   * 将坐标对齐到网格上
   * @param x
   * @param y
   */
  snapCanvasPosition(x: number, y: number): number[] {
    // 转为0坐标系
    const newX = this.getRangeValue(x - this.left, 0, this.right)
    const newY = this.getRangeValue(y - this.top, 0, this.bottom)
    return this.snapPosition(newX, newY)
  }

  private snapPosition(newX: number, newY: number) {
    const diffX = newX % this.cellSize
    if (diffX >= this.cellSize / 2) {
      newX = newX + this.cellSize - diffX
    }
    else {
      newX = newX - diffX
    }

    const diffY = newY % this.cellSize
    if (diffY >= this.cellSize / 2) {
      newY = newY + this.cellSize - diffY
    }
    else {
      newY = newY - diffY
    }
    return [newX + this.left, newY + this.top]
  }

  snapSize(width: number, height: number): number[] {
    let newWidth = Math.floor(width)
    let newHeight = Math.floor(height)
    const diffWidth = newWidth % this.cellSize
    const diffHeight = newHeight % this.cellSize
    if (diffWidth > this.cellSize / 2) {
      newWidth = width + this.cellSize - diffWidth
    }
    else {
      newWidth = width - diffWidth
    }

    if (diffHeight > this.cellSize / 2) {
      newHeight = height + this.cellSize - diffHeight
    }
    else {
      newHeight = height - diffHeight
    }

    return [newWidth, newHeight]
  }

  /**
   * 将矩形对齐到网格上
   * @param rect
   * @param minWidth
   * @param maxWidth
   * @param minHeight
   * @param maxHeight
   */
  snapCanvasRect(rect: GridRect, minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): IGridRect {
    const [newX, newY] = this.snapCanvasPosition(rect.left, rect.top)
    return this.snapRect(rect, minWidth, maxWidth, minHeight, maxHeight, newX, newY)
  }

  private snapRect(
    rect: GridRect,
    minWidth: number,
    maxWidth: number,
    minHeight: number,
    maxHeight: number,
    newX: number,
    newY: number,
  ) {
    let [newWidth, newHeight] = this.snapSize(rect.width, rect.height)
    newWidth = this.getRangeValue(newWidth, minWidth, maxWidth)
    newHeight = this.getRangeValue(newHeight, minHeight, maxHeight)

    if (newX + newWidth > this.right) {
      newX = this.right - newWidth
    }
    if (newY + newHeight > this.bottom) {
      newY = this.bottom - newHeight
    }
    return new GridRect(newX, newY, newWidth, newHeight)
  }

  /**
   * 将矩形对齐到网格上，与snapRect的区别是，这个会加上屏幕x和y坐标，用于适配多个显示器
   * @param rect
   * @param minWidth
   * @param maxWidth
   * @param minHeight
   * @param maxHeight
   */
  snapWindow(rect: GridRect, minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): IGridRect {
    rect.left = rect.left - (this.screenLeft ?? 0)
    rect.top = rect.top - (this.screenTop ?? 0)
    const result = this.snapCanvasRect(rect, minWidth, maxWidth, minHeight, maxHeight)
    return new GridRect(
      result.left + (this.screenLeft ?? 0),
      result.top + (this.screenTop ?? 0),
      result.width,
      result.height,
    )
  }

  /**
   * 限制值不超出屏幕
   * @param value
   * @param min
   * @param max
   * @private
   */
  private getRangeValue(value: number, min: number, max: number) {
    if (value < min) {
      return min
    }
    if (value > max) {
      return max
    }
    return value
  }

  getWidth() {
    return this.width
  }

  getHeight() {
    return this.height
  }
}
