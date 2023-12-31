export class WaveBall {
  x = 0 // x轴坐标
  y = 0 // y轴坐标
  size: number // 大小(直径)
  color: string // 颜色
  bgColor?: CanvasGradient // 颜色
  waveWidth = 0.025 // 波频
  waveHeight = 5.6 // 震幅
  progress = 0 // 进度
  offsetX = [0, 0] // 偏移位置
  startX = 0 // 初始位置
  vx = [0.05, 0.01] // x轴增加量
  ctx: CanvasRenderingContext2D | undefined

  constructor(options: WaveBallOption) {
    this.size = options.size ?? 200
    this.x = options.x ?? this.size / 2
    this.y = options.y ?? this.size / 2
    this.progress = options.progress ?? 0
    this.color = options.color ?? 'rgba(55, 133, 207, .75)'
    return this
  }

  render(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    const {
      color,
      size,
    } = this
    this.bgColor = ctx.createLinearGradient(size / 2, size / 2, size / 2, size)
    this.bgColor!.addColorStop(0, color)
    this.bgColor!.addColorStop(1, color)
    this.drawBall()
    this.drawWave()
    return this
  }

  drawBall() {
    // const {size, ctx, x, y, color} = this;
    // ctx!.save();
    // ctx!.lineWidth = 4;
    // ctx!.strokeStyle = color;
    // ctx!.beginPath();
    // ctx!.arc(x, y, size / 2, 0, 2 * Math.PI);
    // ctx!.stroke();
    // ctx!.restore();
  }

  drawWave(n = 0) {
    this.offsetX[n] += this.vx[n]
    const {
      startX,
      size,
      ctx,
      offsetX,
      x,
      y,
      bgColor,
      waveWidth,
      waveHeight,
      progress,
    } = this
    const height = -progress / 100 * size
    ctx!.save()
    ctx!.translate(x, y)
    ctx!.beginPath()
    ctx!.arc(0, 0, size / 2, 0, 2 * Math.PI)
    ctx!.clip()
    ctx!.beginPath()
    for (let i = -size / 2; i < size / 2; i++) {
      const h = waveHeight * Math.sin((startX + i) * waveWidth + offsetX[n])
      ctx!.lineTo(i, h + size / 2 + height)
    }
    ctx!.lineTo(size / 2, size / 2)
    ctx!.lineTo(-size / 2, size / 2)
    ctx!.fillStyle = bgColor!
    ctx!.fill()
    ctx!.restore()
  }

  update(progress?: number) {
    if (progress != undefined) {
      this.progress = progress
    }

    this.drawWave(0)
    this.drawWave(1)
    this.drawBall()
  }
}

interface WaveBallOption {
  /**
   * x轴坐标
   */
  x?: number

  /**
   * y轴坐标
   */
  y?: number
  /**
   * 大小(
   */
  size?: number
  /**
   * 颜色
   */
  color?: string

  /**
   * 波频
   */
  waveWidth?: number
  /**
   * 震幅
   */
  waveHeight?: number
  /**
   * 进度
   */
  progress?: number
}
