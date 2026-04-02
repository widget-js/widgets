import type { AlipayOrderResult, PayVirtualProduct } from '@/api/pay'
import { SiAlipay } from '@icons-pack/react-simple-icons'
import { BrowserWindowApi } from '@widget-js/core'
import consola from 'consola'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PayApi } from '@/api/pay'
import { supabase } from '@/api/supabase'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'

interface PurchaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productId?: number
  onSuccess?: () => void
}

export function PurchaseDialog({ open, onOpenChange, productId = 2, onSuccess }: PurchaseDialogProps) {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<PayVirtualProduct | null>(null)
  const [order, setOrder] = useState<AlipayOrderResult | null>(null)
  const [payUrl, setPayUrl] = useState<string>('')

  useEffect(() => {
    if (!order) { return }

    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ai_token_packages',
          filter: `order_id=eq.${order.orderId}`,
        },
        (payload) => {
          consola.log('Payment successful:', payload)
          toast.success('支付成功！')
          onOpenChange(false)
          onSuccess?.()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [order])

  const initPurchase = async () => {
    try {
      setLoading(true)
      setProduct(null)
      setOrder(null)
      setPayUrl('')

      // 1. Get Product Info
      const products = await PayApi.getProducts('ai')
      const targetProduct = products.find(p => p.id === productId)

      if (!targetProduct) {
        toast.error('商品不存在')
        onOpenChange(false)
        return
      }
      setProduct(targetProduct)

      // 2. Create Order
      const orderRes = await PayApi.createAlipayOrder(targetProduct.id, window.location.href)
      setOrder(orderRes)
      const url = await PayApi.getAlipayUrl(orderRes.orderId)
      setPayUrl(url)
    }
    catch (error) {
      console.error(error)
      toast.error('获取购买信息失败')
      onOpenChange(false)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      initPurchase()
    }
    else {
      // Clean up when closed
      setOrder(null)
    }
  }, [open, productId])
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>购买套餐</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4 gap-6">
          {loading
            ? (
                <div className="flex flex-col items-center gap-2 py-8">
                  <Spinner className="h-8 w-8" />
                  <p className="text-sm text-muted-foreground">正在创建订单...</p>
                </div>
              )
            : product && order
              ? (
                  <>
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-2xl font-bold text-primary">
                        ¥
                        {(product.price / 100).toFixed(2)}
                      </p>
                      {product.description && (
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-4 pt-4 w-full">
                      <Button
                        onClick={() => BrowserWindowApi.openUrl(payUrl, { external: true })}
                        className="w-full bg-[#1677FF] hover:bg-[#1677FF]/90 text-white"
                      >
                        <SiAlipay className="mr-2 h-4 w-4" />
                        前往支付宝支付
                      </Button>
                      <div className="text-sm text-muted-foreground">
                        支付完成后，本窗口会自动刷新
                      </div>
                    </div>
                  </>
                )
              : (
                  <div className="py-8 text-muted-foreground">
                    加载失败，请重试
                  </div>
                )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
