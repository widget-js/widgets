export interface FeatureWall {
  id: number
  title: string

  description: string

  // 点赞次数
  likes: number

  // 预览图片
  previewImage: string

  // 打赏二维码
  rewardQRCode: string

  createTime: Date

  updateTime: Date
}
