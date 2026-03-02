import { useTranslation } from 'react-i18next'
import { Link, useLocation, useRouteError } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function ErrorPage() {
  const { t } = useTranslation()
  const error: any = useRouteError()
  const location = useLocation()
  console.error(error)

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">{t('error.oops')}</h1>
      <p className="text-lg text-muted-foreground">{t('error.unexpected')}</p>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
        </p>
        <p className="text-sm text-muted-foreground">
          <i>{error?.statusText || error?.message || t('error.unknown')}</i>
          {' '}
          {location.pathname}
        </p>
      </div>
      <div className="mt-4">
        <Button asChild>
          <Link to="/">{t('error.backToHome')}</Link>
        </Button>
      </div>
    </div>
  )
}
