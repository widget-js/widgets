import type { AiTokenHistory, AiTokenPackage } from '@/api/ai'
import { History, Package, ShoppingCart } from 'lucide-react'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { AiApi } from '@/api/ai'
import { LoginCheck } from '@/components/login-check'
import { PurchaseDialog } from '@/components/purchase-dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUser } from '@/hooks/use-user'

export default function AiPage() {
  const { t } = useTranslation()
  const { user } = useUser()
  const [packages, setPackages] = useState<AiTokenPackage[]>([])
  const [history, setHistory] = useState<AiTokenHistory[]>([])
  const [historyTotal, setHistoryTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  // Purchase Dialog State
  const [purchaseOpen, setPurchaseOpen] = useState(false)

  const loadPackages = async () => {
    try {
      const res = await AiApi.getPackages({ page: 1, limit: 3 })
      setPackages(res.items)
    }
    catch (error) {
      console.error(error)
      toast.error(t('aiPage.loadPackagesFailed', '加载套餐失败'))
    }
  }

  useEffect(() => {
    if (user) {
      loadPackages()
    }
  }, [user])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const res = await AiApi.getUsage({ page, limit: pageSize })
      setHistory(res.items)
      setHistoryTotal(res.total)
    }
    catch (error) {
      console.error(error)
      toast.error(t('aiPage.loadHistoryFailed', '加载历史记录失败'))
    }
    finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(historyTotal / pageSize)

  useEffect(() => {
    if (user) {
      loadHistory()
    }
  }, [page, user])

  return (
    <LoginCheck>
      <div className="flex flex-col gap-6 min-w-[800px] mx-auto mb-4">
        {/* Packages Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Package className="h-6 w-6" />
            {t('aiPage.tokenPackages', 'Token套餐')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card
              className="cursor-pointer hover:border-primary transition-colors border-dashed flex flex-col items-center justify-center min-h-[180px]"
              onClick={() => setPurchaseOpen(true)}
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary">
                <ShoppingCart className="h-8 w-8" />
                <span className="font-medium">{t('aiPage.purchasePackage', '购买套餐')}</span>
              </div>
            </Card>

            {packages.map(pkg => (
              <Card key={pkg.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <CardDescription>
                    {t('aiPage.expirationDate', '过期时间:')}
                    {' '}
                    {pkg.expireTime ? new Date(pkg.expireTime).toLocaleDateString() : t('aiPage.lifetime', '永久有效')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('aiPage.used', '已用:')}</span>
                      <span>{pkg.usedToken.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('aiPage.total', '总量:')}</span>
                      <span>{pkg.maxToken.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${Math.min((pkg.usedToken / pkg.maxToken) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {packages.length === 0 && (
              <div className="col-span-3 flex text-center justify-center items-center text-muted-foreground py-8 border rounded-lg border-dashed">
                {t('aiPage.noPackages', '暂无可用套餐')}
              </div>
            )}
          </div>
        </section>

        <PurchaseDialog
          open={purchaseOpen}
          onOpenChange={setPurchaseOpen}
          onSuccess={loadPackages}
        />

        {/* History Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <History className="h-6 w-6" />
            {t('aiPage.usageHistory', '使用记录')}
          </h2>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('aiPage.time', '时间')}</TableHead>
                    <TableHead>{t('aiPage.model', '模型')}</TableHead>
                    <TableHead>{t('aiPage.type', '类型')}</TableHead>
                    <TableHead>{t('aiPage.tokens', 'Token数')}</TableHead>
                    <TableHead>{t('aiPage.remark', '备注')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading
                    ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            {t('aiPage.loading', '加载中...')}
                          </TableCell>
                        </TableRow>
                      )
                    : history.length > 0
                      ? (
                          history.map(item => (
                            <TableRow key={item.id}>
                              <TableCell>{new Date(item.create_time).toLocaleString()}</TableCell>
                              <TableCell>{item.model || '-'}</TableCell>
                              <TableCell>{item.request_type || '-'}</TableCell>
                              <TableCell>{item.total_tokens?.toLocaleString() || 0}</TableCell>
                              <TableCell>{item.remark || '-'}</TableCell>
                            </TableRow>
                          ))
                        )
                      : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              {t('aiPage.noHistory', '暂无历史记录')}
                            </TableCell>
                          </TableRow>
                        )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (page > 1) { setPage(p => p - 1) }
                      }}
                      className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .map((p, i, arr) => {
                      // Add ellipsis if there are gaps
                      const prev = arr[i - 1]
                      const showEllipsis = prev && p - prev > 1

                      return (
                        <React.Fragment key={p}>
                          {showEllipsis && (
                            <PaginationItem>
                              <span className="flex h-9 w-9 items-center justify-center">...</span>
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              isActive={page === p}
                              onClick={(e) => {
                                e.preventDefault()
                                setPage(p)
                              }}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        </React.Fragment>
                      )
                    })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (page < totalPages) { setPage(p => p + 1) }
                      }}
                      className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </section>
      </div>
    </LoginCheck>
  )
}
