<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import {
  ApiConstants,
  AppApi,
  BrowserWindowApi,
} from '@widget-js/core'
import { WidgetBaseDialog } from '@widget-js/vue3'
import { useI18n } from 'vue-i18n'
import SettingSection from './SettingSection.vue'
import { useCellSizeConfig, useDebugConfig, useLanguageConfig } from '@/composition/useAppConfig'
import ThemeSettingPanel from '@/views/settings/theme/ThemeSettingPanel.vue'
import ProxySettingPanel from '@/views/settings/ProxySettingPanel.vue'
import SocialLinks from '@/views/tray/SocialLinks.vue'

const { t } = useI18n()
BrowserWindowApi.setSize(600, 800)

const launchAtStartup = ref(true)
const languageCode = useLanguageConfig()
AppApi.getConfig(ApiConstants.CONFIG_LAUNCH_AT_STARTUP, true).then((value) => {
  launchAtStartup.value = value as boolean
  watch(launchAtStartup, (newValue) => {
    AppApi.setConfig(ApiConstants.CONFIG_LAUNCH_AT_STARTUP, newValue)
  })
})
const debugMode = useDebugConfig()
const gridSize = useCellSizeConfig()

onMounted(() => {
  document.title = t('settings.title')
})

const activeName = ref('settings')
const appVersion = ref<string>()
AppApi.getVersion('app').then((value) => {
  appVersion.value = value
})

const languages: Language[] = [
  { baseName: 'zh-CN', language: 'zh', nativeName: '简体中文', region: 'CN' },
  { baseName: 'en-US', language: 'en', nativeName: 'English', region: 'US' },
]
</script>

<template>
  <WidgetBaseDialog :title="t('settings.title')">
    <template #body>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="t('settings.common')" name="settings">
          <SettingSection :title="t('settings.app')">
            <el-form label-width="90px" label-position="left">
              <el-form-item :label="t('settings.launchAtStartup')">
                <el-switch v-model="launchAtStartup" />
              </el-form-item>
              <el-form-item :label="t('settings.language')">
                <el-select v-model="languageCode">
                  <el-option v-for="lang in languages" :key="lang.baseName" :value="lang.language" :label="lang.nativeName" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="debugMode" :label="t('settings.developerMode')">
                <el-switch v-model="debugMode" />
              </el-form-item>
            </el-form>
          </SettingSection>
          <SettingSection :title="t('settings.desktop')">
            <el-form label-width="90px" label-position="left">
              <el-form-item :label="t('settings.gridSize')">
                <el-radio-group v-model="gridSize">
                  <el-radio :label="60">
                    60px
                  </el-radio>
                  <el-radio :label="70">
                    70px
                  </el-radio>
                  <el-radio :label="80">
                    80px
                  </el-radio>
                  <el-radio :label="90">
                    90px
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </SettingSection>

          <SettingSection :title="t('social')">
            <SocialLinks :icon-size="32" />
          </SettingSection>
        </el-tab-pane>
        <el-tab-pane :label="t('settings.theme')" name="theme">
          <ThemeSettingPanel />
        </el-tab-pane>
        <el-tab-pane :label="t('settings.proxy.title')" name="proxy">
          <ProxySettingPanel />
        </el-tab-pane>
      </el-tabs>
    </template>
  </WidgetBaseDialog>
</template>

<style scoped lang="scss">
@import '@/assets/scss/theme.scss';

.el-form {
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}

.setting-section:nth-child(n + 2) {
  margin-top: 12px;
}
</style>
