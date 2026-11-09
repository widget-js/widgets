import type { LanguageCode, PermissionGrant, Widget } from '@widget-js/core'
import { PermissionApi, WidgetApi } from '@widget-js/core'
import { AlertCircle, Clock3, FilePenLine, FileText, FolderOpen, FolderPen, Image, Infinity as InfinityIcon, PanelsTopLeft, RefreshCw, Search, ShieldCheck, Timer, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'

export default function PermissionsPage() {
  const { t, i18n } = useTranslation()
  const [permissions, setPermissions] = useState<PermissionGrant[]>([])
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('all')
  const [selected, setSelected] = useState<PermissionGrant | null>(null)
  const [revoking, setRevoking] = useState(false)
  const [revokeError, setRevokeError] = useState(false)
  const requestIdRef = useRef(0)
  const revokingRef = useRef(false)

  const loadPermissions = useCallback(async () => {
    const id = ++requestIdRef.current
    setLoading(true)
    setLoadError(false)
    try {
      const [result, availableWidgets] = await Promise.all([
        PermissionApi.getPermissions(),
        WidgetApi.getWidgets().catch(() => undefined),
      ])
      if (id === requestIdRef.current) {
        setPermissions(result)
        if (availableWidgets) { setWidgets(availableWidgets) }
      }
    }
    catch {
      if (id === requestIdRef.current) { setLoadError(true) }
    }
    finally {
      if (id === requestIdRef.current) { setLoading(false) }
    }
  }, [])

  const invalidateRequests = useCallback(() => { requestIdRef.current++ }, [])

  useEffect(() => {
    document.title = t('permissions.title')
  }, [t])

  useEffect(() => {
    void loadPermissions()
    return invalidateRequests
  }, [loadPermissions, invalidateRequests])

  const widgetNames = useMemo(() => new Map(widgets.map(widget => [
    widget.name,
    widget.getTitle(i18n.language as LanguageCode)?.trim(),
  ])), [widgets, i18n.language])

  const sourceName = (permission: PermissionGrant) => widgetNames.get(permission.identity)
    || permission.displayName
    || (permission.identity.startsWith('session:') ? t('permissions.temporarySource') : permission.identity)

  const actionName = (permission: PermissionGrant) => {
    if (permission.kind === 'desktop') {
      return t(permission.action === 'set-wallpaper' ? 'permissions.actions.setWallpaper' : 'permissions.actions.setWallpaperWidget')
    }
    const action = permission.action === 'read' ? 'read' : 'write'
    const scope = permission.scope === 'directory' ? 'Directory' : 'File'
    return t(`permissions.actions.${action}${scope}`)
  }

  const targetName = (permission: PermissionGrant) => permission.kind === 'file'
    ? permission.path
    : t(permission.action === 'set-wallpaper' ? 'permissions.desktopTarget' : 'permissions.widgetTarget')

  const actionIcon = (permission: PermissionGrant) => {
    if (permission.kind === 'desktop') {
      return permission.action === 'set-wallpaper' ? Image : PanelsTopLeft
    }
    if (permission.scope === 'directory') {
      return permission.action === 'read' ? FolderOpen : FolderPen
    }
    return permission.action === 'read' ? FileText : FilePenLine
  }

  const search = query.trim().toLocaleLowerCase()
  const filtered = permissions.filter((permission) => {
    if (kind !== 'all' && permission.kind !== kind) { return false }
    return !search || [permission.identity, sourceName(permission), actionName(permission), targetName(permission), t(`permissions.types.${permission.kind}`), t(`permissions.lifetimes.${permission.lifetime}`)]
      .some(value => value.toLocaleLowerCase().includes(search))
  })
  const groups = new Map<string, PermissionGrant[]>()
  for (const permission of filtered) {
    const group = groups.get(permission.identity) ?? []
    group.push(permission)
    groups.set(permission.identity, group)
  }
  const sortedGroups = [...groups.entries()].sort(([, a], [, b]) => sourceName(a[0]).localeCompare(sourceName(b[0])))

  const revokePermission = async () => {
    if (!selected || revokingRef.current) { return }
    const permission = selected
    revokingRef.current = true
    setRevoking(true)
    setRevokeError(false)
    try {
      await PermissionApi.revokePermission(permission.id)
      setPermissions(current => current.filter(item => item.id !== permission.id))
      setSelected(null)
      toast.success(t('permissions.revoked'))
      await loadPermissions()
    }
    catch {
      setRevokeError(true)
    }
    finally {
      revokingRef.current = false
      setRevoking(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto w-full px-4 pb-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-xl font-semibold tracking-tight">{t('permissions.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('permissions.description')}</p>
        </div>
        <Button variant="outline" disabled={loading || revoking} onClick={() => void loadPermissions()}>
          <RefreshCw className={loading ? 'size-4 animate-spin' : 'size-4'} />
          {t('permissions.refresh')}
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={t('permissions.searchPlaceholder')}
            aria-label={t('permissions.searchPlaceholder')}
            className="pl-9"
          />
        </div>
        <Select value={kind} onValueChange={setKind}>
          <SelectTrigger className="w-40 text-foreground" aria-label={t('permissions.filterType')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('permissions.allTypes')}</SelectItem>
            <SelectItem value="file">{t('permissions.types.file')}</SelectItem>
            <SelectItem value="desktop">{t('permissions.types.desktop')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loadError && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <span>{t('permissions.loadFailed')}</span>
        </div>
      )}

      {loading && permissions.length === 0
        ? (
            <div role="status" className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Spinner />
              {t('permissions.loading')}
            </div>
          )
        : sortedGroups.length > 0
          ? (
              <div className="space-y-4" aria-busy={loading}>
                <p className="text-xs text-muted-foreground">{t('permissions.count', { count: filtered.length, sources: sortedGroups.length })}</p>
                {sortedGroups.map(([identity, grants]) => (
                  <Card key={identity} className="gap-0 py-0 overflow-hidden">
                    <CardHeader className="grid-rows-1 gap-0 border-b bg-muted/20 px-5 py-3 [.border-b]:pb-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0"><ShieldCheck className="size-4" /></div>
                        <div className="min-w-0 self-center space-y-1">
                          <CardTitle className="text-sm break-words" title={identity}>{sourceName(grants[0])}</CardTitle>
                          <p className="text-xs text-muted-foreground font-mono break-all select-text">{identity}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-0 divide-y">
                      {grants.map((permission) => {
                        const Icon = actionIcon(permission)
                        const LifetimeIcon = permission.lifetime === 'persistent' ? InfinityIcon : permission.lifetime === 'session' ? Clock3 : Timer
                        return (
                          <div key={permission.id} className="flex items-center gap-3 px-5 py-3">
                            <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                            <div className="min-w-0 flex-1 space-y-1.5">
                              <span className="text-sm font-medium">{actionName(permission)}</span>
                              <div className="flex min-w-0 items-center gap-2 text-xs">
                                <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 text-secondary-foreground">{t(`permissions.types.${permission.kind}`)}</span>
                                <p
                                  className={`min-w-0 flex-1 truncate text-muted-foreground select-text ${permission.kind === 'file' ? 'font-mono' : ''}`}
                                  title={targetName(permission)}
                                >
                                  {targetName(permission)}
                                </p>
                              </div>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs text-muted-foreground" title={t(`permissions.lifetimeHints.${permission.lifetime}`)}>
                              <LifetimeIcon className="size-3" aria-hidden="true" />
                              {t(`permissions.lifetimes.${permission.lifetime}`)}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                              disabled={loading || revoking}
                              onClick={() => { setRevokeError(false); setSelected(permission) }}
                              aria-label={t('permissions.revokeLabel', { source: sourceName(permission), action: actionName(permission) })}
                            >
                              <Trash2 className="size-4" />
                              {t('permissions.revoke')}
                            </Button>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          : !loadError && (
              <Card className="border-dashed shadow-none">
                <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                  <ShieldCheck className="size-9 text-muted-foreground/60" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{t(permissions.length === 0 ? 'permissions.emptyTitle' : 'permissions.noResultsTitle')}</p>
                    <p className="text-sm text-muted-foreground">{t(permissions.length === 0 ? 'permissions.emptyDescription' : 'permissions.noResultsDescription')}</p>
                  </div>
                  {permissions.length > 0 && <Button variant="outline" size="sm" onClick={() => { setQuery(''); setKind('all') }}>{t('permissions.clearFilters')}</Button>}
                </CardContent>
              </Card>
            )}

      <AlertDialog open={selected !== null} onOpenChange={(open) => { if (!open && !revoking) { setSelected(null) } }}>
        <AlertDialogContent onEscapeKeyDown={(event) => { if (revoking) { event.preventDefault() } }}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('permissions.revokeTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('permissions.revokeDescription')}</AlertDialogDescription>
          </AlertDialogHeader>
          {selected && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2 text-sm min-w-0">
              <p className="font-medium break-words">{sourceName(selected)}</p>
              <p>{actionName(selected)}</p>
              <p className="text-xs text-muted-foreground break-all">{targetName(selected)}</p>
            </div>
          )}
          {revokeError && <p role="alert" className="text-sm text-destructive">{t('permissions.revokeFailed')}</p>}
          <AlertDialogFooter>
            <Button variant="outline" disabled={revoking} onClick={() => setSelected(null)}>{t('permissions.cancel')}</Button>
            <Button variant="destructive" disabled={revoking} onClick={() => void revokePermission()}>
              {revoking && <Spinner />}
              {t(revoking ? 'permissions.revoking' : 'permissions.confirmRevoke')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
