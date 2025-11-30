<script setup lang="ts">
import type { Widget } from '@widget-js/core'
import { Check, Logout } from '@icon-park/vue-next'
import { NotificationApi, WidgetApi } from '@widget-js/core'
import { ElLoading } from 'element-plus'
import { ref } from 'vue'
import { getStorageLink, supabase } from '@/api/supabase'
import UserAvatar from '@/components/UserAvatar.vue'
import { useUser } from '@/composition/useUser'
import { MessageUtils } from '@/utils/MessageUtils'
import WidgetSyncCard from '@/views/user/WidgetSyncCard.vue'

const nicknameEdit = ref('')
const avatarEdit = ref('')
const { avatar, nickname, userId } = useUser(() => {
  nicknameEdit.value = nickname.value
  avatarEdit.value = avatar.value
})

function pickImageAndUpload() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/jpg,image/jpeg,image/png,image/webp'
  input.onchange = async (event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) {
      return
    }

    const loading = ElLoading.service({
      lock: true,
      text: '上传中...',
      background: 'rgba(0, 0, 0, 0.7)',
    })

    try {
      if (!userId.value) {
        MessageUtils.error('用户未登录')
        return
      }

      const fileExtension = file.name.split('.').pop()
      const fileName = `avatar.${fileExtension}`

      const { data, error } = await supabase.storage.from('widget-avatar').upload(`${userId.value}/${fileName}`, file, {
        cacheControl: '3600',
        upsert: true,
      })
      if (error) {
        MessageUtils.error(`上传失败: ${error.message}`)
      }
      else {
        const fullUrl = getStorageLink(data?.fullPath)
        const updateRes = await supabase.auth.updateUser({
          data: { avatar: fullUrl },
        })
        if (updateRes.error) {
          MessageUtils.error(`更新头像失败:${updateRes.error}`)
        }
        else {
          avatarEdit.value = fullUrl
          MessageUtils.success('头像更新成功')
        }
      }
    }
    catch (err) {
      MessageUtils.error('上传过程中发生错误')
    }
    finally {
      loading.close()
    }
  }
  input.click()
}
const signOutLoading = ref(false)
function signOut() {
  signOutLoading.value = true
  supabase.auth.signOut().then(async ({ error }) => {
    if (error) {
      MessageUtils.error(`退出登录失败: ${error.message}`)
    }
    else {
      NotificationApi.success('退出登录成功')
      window.close()
    }
  }).finally(() => {
    signOutLoading.value = false
  })
}

function saveNickName() {
  if (!nicknameEdit.value.trim()) {
    console.error('昵称不能为空')
    return
  }

  supabase.auth.updateUser({
    data: { nickname: nicknameEdit.value.trim() },
  }).then(({ error }) => {
    if (error) {
      MessageUtils.error(`更新昵称失败:${error}`)
    }
    else {
      MessageUtils.success('昵称更新成功')
    }
  })
}

const widgets = ref<Widget[]>([])
WidgetApi.getWidgets().then((arr) => {
  widgets.value = arr.filter(it => it.synchronizable)
})
</script>

<template>
  <WidgetBaseDialog title="个人资料">
    <template #body>
      <div class="flex h-full w-full flex-col items-center gap-2 relative">
        <Logout v-loading="signOutLoading" :size="18" class="position-absolute right-1 cursor-pointer" @click="signOut" />
        <UserAvatar class="cursor-pointer mt-8" :src="avatarEdit" size="large" @click="pickImageAndUpload" />
        <el-form class="w-full mt-4">
          <el-form-item label="昵称">
            <el-input v-model="nicknameEdit" placeholder="昵称" maxlength="10">
              <template #append>
                <el-button @click="saveNickName">
                  <Check />
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="flex flex-col gap-2 w-full">
          <div class="font-bold">
            数据同步
          </div>
          <WidgetSyncCard v-for="item in widgets" :key="item.name" :widget="item" />
        </div>
      </div>
    </template>
  </WidgetBaseDialog>
</template>

<style scoped lang="scss">

</style>
