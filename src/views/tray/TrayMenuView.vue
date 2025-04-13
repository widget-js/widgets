<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Logout, Plus, Refresh, Setting, ShareOne } from '@icon-park/vue-next'
import { AppApi, BrowserWindowApi, NotificationApi } from '@widget-js/core'
import { ref } from 'vue'
import SocialLinks from '@/views/tray/SocialLinks.vue'
import { useAppRuntimeInfo } from '@/composition/useAppRuntimeInfo'
import DeployedWidgetList from '@/views/manager/DeployedWidgetList.vue'

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
  BrowserWindowApi.openUrl('https://support.qq.com/product/450189', { external: true })
}
</script>

<template>
  <div class="flex flex-col h-100vh ">
    <div class="header flex items-center w-full p-4">
      <div class="flex flex-col ">
        <div>
          {{ t('tray.appVersion') }}: {{ appVersion }}
        </div>
        <div>
          {{ t('tray.systemVersion') }}: {{ simpleInfo?.systemName }}
        </div>
      </div>
      <el-button size="small" class="ml-auto" @click="AppApi.openRuntimeInfoWindow()">
        {{ t('tray.fullDetail') }}
      </el-button>
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
