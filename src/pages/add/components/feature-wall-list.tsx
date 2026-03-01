import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'

export function FeatureWallList() {
  const { t } = useTranslation()

  return (
    <Card className="w-full bg-muted/20 border-dashed">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
        <Sparkles className="h-12 w-12 mb-4 text-yellow-500" />
        <h3 className="text-lg font-semibold mb-2">{t('feature.wishlist', 'Wishlist Feature')}</h3>
        <p className="text-sm max-w-sm">
          {t('feature.wishlistDesc', 'Vote for features you want to see in the next version!')}
        </p>
      </CardContent>
    </Card>
  )
}
