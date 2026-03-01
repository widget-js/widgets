import request from '@/lib/request'

export interface PayVirtualProduct {
  id: number
  createTime: string
  updateTime: string | null
  name: string
  description: string | null
  coverUrl: string | null
  price: number
  category: string
  metadata: string | null
  enable: boolean
}

export interface WxOrderResult {
  codeUrl: string
  product: PayVirtualProduct
  orderId: string
}

export const PayApi = {
  async getProducts(category: string = 'ai'): Promise<PayVirtualProduct[]> {
    return request.get('https://widgetjs.cn/pay/products', {
      params: { category },
    })
  },

  async createWxOrder(productId: number): Promise<WxOrderResult> {
    return request.get('https://widgetjs.cn/pay/wx/order', {
      params: { productId },
    })
  },
}
