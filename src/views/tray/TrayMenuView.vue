<script setup lang="ts">
import { LoadingOne, Logout, Plus, Refresh, Setting, ShareOne } from '@icon-park/vue-next'
import { useStorage } from '@vueuse/core'
import { AppApi, BrowserWindowApi, NotificationApi, WidgetApi } from '@widget-js/core'
import consola from 'consola'
import { nanoid } from 'nanoid'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '@/api/supabase'
import UserAvatar from '@/components/UserAvatar.vue'
import { useAppRuntimeInfo } from '@/composition/useAppRuntimeInfo'
import { useSupabaseChannel } from '@/composition/useSupabaseChannel'
import { useUser } from '@/composition/useUser'
import DeployedWidgetList from '@/views/manager/DeployedWidgetList.vue'
import SocialLinks from '@/views/tray/SocialLinks.vue'

const { t } = useI18n()

const { simpleInfo } = useAppRuntimeInfo()
const appVersion = ref<string>()

AppApi.getVersion('app').then((it) => {
  appVersion.value = it
})

function shareApp() {
  navigator.clipboard.writeText('https://widgetjs.cn')
  NotificationApi.success(t('tray.downloadLinkCopied')) // 使用国际化
}

function copyAndReport() {
  const text = JSON.stringify(simpleInfo.value, null, 2)
  navigator.clipboard.writeText(text)
  NotificationApi.success(t('tray.infoCopied'))
  BrowserWindowApi.openUrl('https://faq.widgetjs.cn', { external: true })
}

function restartWidgets() {
  WidgetApi.restartWidgets()
}
const state = useStorage('wechat_login_state', '')
const { loading, user, nickname } = useUser()
function loginPage() {
  if (user.value) {
    AppApi.showAppWindow('/user/profile', {
      width: 400,
      height: 500,
    })
  }
  else {
    state.value = nanoid(32)
    consola.info(state.value)
    useSupabaseChannel(`wechat-login-${state.value}`, async (payload) => {
      consola.info(payload)
      const currentSession = payload.payload.session
      const loginRes = await supabase.auth.setSession(currentSession)
      if (loginRes.error) {
        NotificationApi.error(loginRes.error.message)
      }
      else {
        AppApi.showAppWindow('/user/profile', {
          width: 400,
          height: 500,
        })
      }
    })
    BrowserWindowApi.openUrl(`https://open.weixin.qq.com/connect/qrconnect?appid=wxf91b19da281f23a9&redirect_uri=https%3A%2F%2Fwidgetjs.cn%2Fapi%2Fv1%2Fuser%2Flogin%2Fwechat%2Fcallback&response_type=code&scope=snsapi_login&state=${state.value}#wechat_redirect`, {
      width: 800,
      height: 600,
      frame: true,
      transparent: false,
      titleBarStyle: 'default',
    })
  }
}
</script>

<template>
  <div class="flex flex-col h-100vh ">
    <div class="header flex items-center w-full p-4">
      <div class="flex w-full gap-2">
        <div v-loading="loading" class="user-info flex gap-2 cursor-pointer items-center" @click="loginPage">
          <UserAvatar />
          <div class="w-100px">
            <el-text truncated>
              {{ nickname }}
            </el-text>
          </div>
        </div>
        <div class="ml-auto flex flex-col cursor-pointer" @click="AppApi.openRuntimeInfoWindow()">
          <div>
            {{ t('tray.appVersion') }}: {{ appVersion }}
          </div>
          <div>
            {{ t('tray.systemVersion') }}: {{ simpleInfo?.systemName?.replaceAll('Windows', 'Win') }}
          </div>
        </div>
      </div>
    </div>
    <div class="widgets flex flex-col gap-2">
      <div class="title">
        {{ t('tray.runningWidgets') }}
      </div>
      <el-scrollbar height="390">
        <DeployedWidgetList />
      </el-scrollbar>
    </div>
    <div class="menus flex flex-col gap-2 my-2">
      <div class="menu-item" @click="AppApi.openAddWidgetWindow()">
        <Plus />
        <div>{{ t('tray.addWidget') }}</div>
      </div>
      <div class="menu-item" @click="AppApi.openSettingWindow()">
        <Setting />
        {{ t('tray.settings.title') }}
      </div>
      <div class="menu-item" @click="AppApi.openCheckUpdateWindow">
        <Refresh />
        {{ t('tray.checkUpdates') }}
      </div>
      <div class="menu-item" @click="shareApp">
        <ShareOne />
        {{ t('tray.shareApp') }}
      </div>
      <el-popconfirm
        width="200"
        :cancel-button-text="t('tray.no')"
        :confirm-button-text="t('tray.yes')"
        :title="t('tray.restartWidgetsConfirm')"
        @confirm="restartWidgets"
      >
        <template #reference>
          <div class="menu-item">
            <LoadingOne />
            {{ t('tray.restartWidgets') }}
          </div>
        </template>
      </el-popconfirm>
      <div class="menu-item" @click="AppApi.exit">
        <Logout />
        {{ t('tray.exit') }}
      </div>
    </div>
    <div class="footer flex items-center py-2 px-4">
      <SocialLinks />
      <div class="ml-auto cursor-pointer text-sm" @click="copyAndReport">
        {{ t('tray.suggestions') }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.header, .footer {
  background: #f8f9fa;
  color: #303030;
}

.menus {
  display: grid;
  padding: 1rem;
  margin-top: auto;
  grid-template-columns: repeat(3, 1fr);
  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 16px;
    gap: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.04);
    .i-icon {
      cursor: pointer;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
}

.el-scrollbar{
  height: 390px;
}

.widgets {
  border-bottom: 1px solid #e7e7e7;
}

.title{
  font-size: 16px;
  padding: 0.8rem 0.8rem 0.4rem 0.8rem;
  font-weight: bold;
  color: #303030;
}
</style>
