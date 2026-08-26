import { ElectronUtils } from '@widget-js/core'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Spinner } from '@/components/ui/spinner'

export default function AlertDialogPage() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)

  const title = searchParams.get('title') || '提示'
  const message = searchParams.get('message') || ''
  const okText = searchParams.get('okText') || '确定'
  const cancelText = searchParams.get('cancelText') || '取消'
  const showCancel = searchParams.get('showCancel') !== 'false'

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

    ElectronUtils.getAPI().addIpcListener('dialog-set-loading', handleSetLoading)
    ElectronUtils.getAPI().addIpcListener('dialog-close', handleClose)

    return () => {
      ElectronUtils.getAPI().removeIpcListener('dialog-set-loading')
      ElectronUtils.getAPI().removeIpcListener('dialog-close')
    }
  }, [])

  const sendResult = (result: 'ok' | 'cancel') => {
    if (ElectronUtils.hasElectronApi()) {
      ElectronUtils.getAPI().sendIpc('dialog-result', result)
    }
  }

  const handleOk = () => {
    if (loading) {
      return
    }
    setLoading(true)
    sendResult('ok')
  }

  const handleCancel = () => {
    if (loading) {
      return
    }
    sendResult('cancel')
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading) {
        return
      }
      if (e.key === 'Escape') {
        handleCancel()
      }
      else if (e.key === 'Enter') {
        handleOk()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [loading])

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
          <div className="px-4 py-4 max-w-3xl w-full mx-auto">
            <div className="flex flex-col gap-3 text-left w-full min-w-0">
              <AlertDialogTitle className="w-full break-all whitespace-pre-wrap text-left block">
                {title}
              </AlertDialogTitle>
              {message && (
                <AlertDialogDescription className="w-full break-all whitespace-pre-wrap text-left block">
                  {message}
                </AlertDialogDescription>
              )}
            </div>
          </div>
        </div>

        <AlertDialogFooter className="bg-muted/40 border-t px-4 py-3 justify-end gap-4 flex-row">
          {showCancel && !loading && (
            <AlertDialogCancel
              onClick={handleCancel}
              variant="outline"
              disabled={loading}
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={handleOk}
            autoFocus
            disabled={loading}
          >
            {loading && <Spinner />}
            {okText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
