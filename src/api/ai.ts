import request from '@/lib/request'

export interface AiTokenHistory {
  id: string
  user_id: string
  change_amount: number
  token_remain_after: number | null
  model: string | null
  prompt_tokens: number | null
  completion_tokens: number | null
  total_tokens: number | null
  cost: number | null
  request_type: string | null
  input_token_details: any | null
  output_token_details: any | null
  raw_usage: any | null
  related_id: string | null
  remark: string | null
  create_time: string
  sourcePackage?: string | null
  sourcePackageName?: string | null
}

export interface AiTokenPackage {
  id: string
  name: string
  userId: string
  maxToken: number
  usedToken: number
  expireTime: string | null
  createTime: string
  productId: number | null
  enable: boolean | null
  updateTime: string | null
}

interface PaginationResult<T> {
  data: T[]
  page: string | number
  pageSize: string | number
  totalPage: number
  total: number
}

export const AiApi = {
  async getPackages(params?: { page?: number, limit?: number }): Promise<{ items: AiTokenPackage[], total: number }> {
    const res = await request.get('/ai/package', { params })
    const data = res as unknown as PaginationResult<AiTokenPackage>
    return {
      items: data.data,
      total: data.total,
    }
  },

  async getUsage(params?: { page?: number, limit?: number }): Promise<{ items: AiTokenHistory[], total: number }> {
    const res = await request.get('/ai/usage', { params })
    const data = res as unknown as PaginationResult<AiTokenHistory>
    return {
      items: data.data,
      total: data.total,
    }
  },
}
