import type { FilePermissionAction, FilePermissionResult, FilePermissionScope } from '@widget-js/core'
import { ElectronUtils, FileApi } from '@widget-js/core'
import { FileText, FolderOpen, ShieldAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const DIALOG_RESULT_CHANNEL = 'file-permission-dialog-result'
const DIALOG_SET_LOADING_CHANNEL = 'file-permission-dialog-set-loading'
const DIALOG_CLOSE_CHANNEL = 'file-permission-dialog-close'

export default function FilePermissionDialogPage() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)

  const action = (searchParams.get('action') as FilePermissionAction) || FileApi.PERMISSION_READ
  const scope = (searchParams.get('scope') as FilePermissionScope) || FileApi.SCOPE_FILE
  const path = searchParams.get('path') || ''
  const widgetName = searchParams.get('widgetName')
  const widgetId = searchParams.get('widgetId')

  const isRead = action === FileApi.PERMISSION_READ
  const isDirectory = scope === FileApi.SCOPE_DIRECTORY

  const title = isRead
    ? (isDirectory ? '申请文件夹读取权限' : '申请文件读取权限')
    : (isDirectory ? '申请文件夹写入权限' : '申请文件写入权限')

  const requestorText = widgetName
    ? `组件「${widgetName}」`
    : widgetId
      ? `组件 ${widgetId}`
      : '应用'

  const message = `${requestorText}请求${isRead ? '读取' : '写入'}以下${isDirectory ? '文件夹' : '文件'}的权限。
此操作将允许组件访问您本地文件系统中的相应内容。`

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    if (!ElectronUtils.hasElectronApi()) {
      return
    }

    const handleSetLoading = (value: boolean) => {
      setLoading(value)
    }

    const handleClose = () => {
      window.close()
    }

    ElectronUtils.getAPI().addIpcListener(DIALOG_SET_LOADING_CHANNEL, handleSetLoading)
    ElectronUtils.getAPI().addIpcListener(DIALOG_CLOSE_CHANNEL, handleClose)

    return () => {
      ElectronUtils.getAPI().removeIpcListener(DIALOG_SET_LOADING_CHANNEL, handleSetLoading)
      ElectronUtils.getAPI().removeIpcListener(DIALOG_CLOSE_CHANNEL, handleClose)
    }
  }, [])

  const sendResult = (result: FilePermissionResult) => {
    if (ElectronUtils.hasElectronApi()) {
      ElectronUtils.getAPI().sendIpc(DIALOG_RESULT_CHANNEL, result)
    }
  }

  const handleAllowOnce = () => {
    if (loading) { return }
    sendResult(FileApi.RESULT_ALLOW_ONCE)
  }

  const handleDeny = () => {
    if (loading) { return }
    sendResult(FileApi.RESULT_DENY)
  }

  const handleAllow = () => {
    if (loading) { return }
    setLoading(true)
    sendResult(FileApi.RESULT_ALLOW)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading) { return }
      if (e.key === 'Escape') {
        handleDeny()
      }
      else if (e.key === 'Enter') {
        handleAllow()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [loading])

  const PathIcon = isDirectory ? FolderOpen : FileText

  return (
    <AlertDialog open>
      <AlertDialogContent
        {...{
          onInteractOutside: (e: Event) => { e.preventDefault() },
          onEscapeKeyDown: (e: KeyboardEvent) => { e.preventDefault() },
        } as any}
        className="!inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !max-w-none !w-screen !h-screen rounded-none border-0 p-0 overflow-hidden !flex !flex-col !gap-0"
      >
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <div className="px-6 py-6 max-w-3xl w-full mx-auto">
            <div className="flex flex-col gap-5 text-left w-full min-w-0">
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <AlertDialogTitle className="w-full break-all whitespace-pre-wrap text-left block text-lg font-semibold">
                    {title}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="w-full break-all whitespace-pre-wrap text-left block text-muted-foreground">
                    {message}
                  </AlertDialogDescription>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
                <PathIcon className="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">
                    {isDirectory ? '文件夹路径' : '文件路径'}
                  </div>
                  <div className="font-mono text-sm break-all select-all">
                    {path}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className={`px-2 py-0.5 rounded-full ${isRead ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'}`}>
                  {isRead ? '读取' : '写入'}
                </div>
                <span>·</span>
                <div className={`px-2 py-0.5 rounded-full ${isDirectory ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'}`}>
                  {isDirectory ? '文件夹' : '文件'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="bg-muted/40 border-t px-4 py-3 justify-end gap-3 flex-row">
          <Button
            variant="outline"
            onClick={handleDeny}
            disabled={loading}
          >
            拒绝
          </Button>
          <Button
            variant="secondary"
            onClick={handleAllowOnce}
            disabled={loading}
          >
            允许一次
          </Button>
          <Button
            onClick={handleAllow}
            autoFocus
            disabled={loading}
          >
            {loading && <Spinner />}
            同意
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
