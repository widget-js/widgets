import type { Widget } from '@widget-js/core'
import { NotificationApi, WidgetApi } from '@widget-js/core'
import consola from 'consola'
import { Check, Loader2, LogOut, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getStorageLink, supabase } from '@/api/supabase'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import UserAvatar from '@/components/user-avatar'
import WidgetSyncItem from '@/components/widget-sync-item'
import { useUser } from '@/hooks/use-user'

export default function ProfilePage() {
  const [nicknameEdit, setNicknameEdit] = useState('')
  const [avatarEdit, setAvatarEdit] = useState('')
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [signOutLoading, setSignOutLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)

  const { avatar, nickname, userId } = useUser((user) => {
    if (user) {
      setNicknameEdit(user.user_metadata?.nickname || '')
      setAvatarEdit(user.user_metadata?.avatar || '')
    }
  })

  // Sync state when user changes (e.g. initial load)
  useEffect(() => {
    if (nickname) { setNicknameEdit(nickname) }
    if (avatar) { setAvatarEdit(avatar) }
  }, [nickname, avatar])

  useEffect(() => {
    WidgetApi.getWidgets().then((arr) => {
      const syncWidgets = arr.filter(it => it.synchronizable)
      setWidgets(syncWidgets)
      consola.info('Widgets:', syncWidgets)
    })
  }, [])

  const pickImageAndUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpg,image/jpeg,image/png,image/webp'
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (!file) { return }

      setUploadLoading(true)
      const loadingToast = toast.loading('上传中...')

      try {
        if (!userId) {
          toast.error('用户未登录')
          return
        }

        const fileExtension = file.name.split('.').pop()
        const fileName = `avatar.${fileExtension}`

        const { data, error } = await supabase.storage
          .from('widget-avatar')
          .upload(`${userId}/${fileName}`, file, {
            cacheControl: '3600',
            upsert: true,
          })

        if (error) {
          toast.error(`上传失败: ${error.message}`)
        }
        else {
          const fullUrl = getStorageLink(data?.fullPath)
          const updateRes = await supabase.auth.updateUser({
            data: { avatar: fullUrl },
          })

          if (updateRes.error) {
            toast.error(`更新头像失败:${updateRes.error.message}`)
          }
          else {
            setAvatarEdit(fullUrl)
            toast.success('头像更新成功')
          }
        }
      }
      catch (err) {
        toast.error('上传过程中发生错误')
        consola.error(err)
      }
      finally {
        setUploadLoading(false)
        toast.dismiss(loadingToast)
      }
    }
    input.click()
  }

  const signOut = async () => {
    setSignOutLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error(`退出登录失败: ${error.message}`)
      }
      else {
        NotificationApi.success('退出登录成功')
        window.close()
      }
    }
    finally {
      setSignOutLoading(false)
    }
  }

  const saveNickName = async () => {
    if (!nicknameEdit.trim()) {
      toast.error('昵称不能为空')
      return
    }

    const { error } = await supabase.auth.updateUser({
      data: { nickname: nicknameEdit.trim() },
    })

    if (error) {
      toast.error(`更新昵称失败:${error.message}`)
    }
    else {
      toast.success('昵称更新成功')
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>用户信息</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" disabled={signOutLoading}>
                {signOutLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认退出登录?</AlertDialogTitle>
                <AlertDialogDescription>
                  退出登录后将无法使用同步功能和 AI 功能。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={signOut}>确认退出</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <div className="flex flex-col items-center gap-6">
            <div className="relative group cursor-pointer" onClick={pickImageAndUpload}>
              <UserAvatar
                src={avatarEdit}
                className="w-32 h-32 transition-opacity group-hover:opacity-80"
                size="lg"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-full">
                <Pencil className="h-4 w-4 text-white" />
              </div>
              {uploadLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
              )}
            </div>

            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                value={nicknameEdit}
                onChange={e => setNicknameEdit(e.target.value)}
                placeholder="昵称"
                maxLength={10}
              />
              <Button onClick={saveNickName} size="icon">
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>数据同步</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">

            <div className="grid gap-4">
              {widgets.map(widget => (
                <WidgetSyncItem key={widget.name} widget={widget} />
              ))}
              {widgets.length === 0 && (
                <p className="text-muted-foreground text-center text-sm py-4">
                  暂无同步小组件
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
