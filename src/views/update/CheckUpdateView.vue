<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { ElectronUtils, SystemApi } from '@widget-js/core'
import { WidgetBaseDialog } from '@widget-js/vue3'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import consola from 'consola'
import type { AppVersion } from '@/model/AppVersion'
import VersionUtils from '@/utils/VersionUtils'

axios.defaults.withCredentials = true

const loading = ref(true)
const error = ref(null)
const appVersion = ref<AppVersion>()
const { t } = useI18n()

const hasNewVersion = computed(() => {
  return error.value == null && !loading.value && appVersion.value != null
})

onMounted(() => {
  document.title = '检测更新'
  if (appVersion.value == null) {
    checkNewVersion()
  }
  else {
    loading.value = false
  }
})

function cancel() {
  if (appVersion.value) {
    localStorage.setItem('ignore-version', appVersion.value.version)
  }
  window.close()
}

async function upgrade() {
  loading.value = true
  await ElectronUtils.getAPI().invoke('upgradeApp', JSON.stringify(appVersion.value))
  loading.value = false
}

function checkNewVersion() {
  loading.value = true
  VersionUtils.checkNewVersion((version: AppVersion) => {
    appVersion.value = version
  }, (error) => {
    error.value = error
    consola.log(error)
  }, () => {
    loading.value = false
  })
}
</script>

<template>
  <div class="check-update">
    <WidgetBaseDialog :title="t('update.windowTitle')">
      <template #body>
        <div v-loading="loading" element-loading-background="transparent" />
        <el-row justify="center">
          <el-col v-if="error" :span="24">
            {{ error }}
          </el-col>
          <template v-else>
            <el-col v-if="!loading && !hasNewVersion" :span="24">
              {{ t('update.alreadyLatestVersion') }}
            </el-col>
            <el-col v-else-if="hasNewVersion" :span="24" style="text-align: start">
              <h4>{{ t('update.newVersionDetect') }} {{ appVersion!.version }}</h4>
              <pre style="font-size: 1rem">{{ appVersion!.releaseNote }}</pre>
            </el-col>
          </template>
        </el-row>
      </template>
      <template #footer>
        <el-divider />
        <div class="footer flex items-center">
          <el-button v-if="hasNewVersion" @click="cancel">
            忽略
          </el-button>
          <span class="ml-auto" />
          <el-button type="primary" @click="SystemApi.launchStoreDetailsPage()">
            商店页面
          </el-button>
          <el-button v-if="hasNewVersion" type="primary" @click="upgrade">
            更新
          </el-button>
        </div>
      </template>
    </WidgetBaseDialog>
  </div>
</template>

<style scoped lang="scss">
.check-update {

  .el-loading-parent--relative {
    min-height: 64px;
  }

  .footer {
    padding: 0 16px 16px 16px;
  }
}
</style>
