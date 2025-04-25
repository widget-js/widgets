import type { FeatureWall } from '../model/FeatureWall'
import { widgetServerApi } from '@/api/axios'

export class FeatureWallApi {
  // 获取所有 FeatureWall
  static findAll(): Promise<FeatureWall[]> {
    return widgetServerApi.get('/feature/wall')
  }

  // 点赞 FeatureWall
  static like(id: number): Promise<void> {
    return widgetServerApi.post(`/feature/wall/${id}/like`)
  }
}
