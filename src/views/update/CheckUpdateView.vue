<script lang="ts">
import { ref } from 'vue'
import { ElectronUtils } from '@widget-js/core'
import { WidgetBaseDialog } from '@widget-js/vue3'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import consola from 'consola'
import type { AppVersion } from '@/model/AppVersion'
import VersionUtils from '@/utils/VersionUtils'

axios.defaults.withCredentials = true

export default {
  name: 'CheckUpdateView',
  components: { WidgetBaseDialog },
  setup() {
    const loading = ref(true)
    const hasNewVersion = ref(false)
    const error = ref(null)
    const appVersion = ref<AppVersion>()
    const { t } = useI18n()
    return { loading, t, appVersion, hasNewVersion, error }
  },
  computed: {
    hasNewVersion() {
      return this.error == null && !this.loading && this.appVersion != null
    },
  },
  mounted() {
    document.title = '检测更新'
    if (this.appVersion == null) {
      this.checkNewVersion()
    }
    else {
      this.loading = false
    }
  },
  methods: {
    cancel() {
      if (this.appVersion) {
        localStorage.setItem('ignore-version', this.appVersion.version)
      }
      window.close()
    },
    async upgrade() {
      this.loading = true
      await ElectronUtils.getAPI().invoke('upgradeApp', JSON.stringify(this.appVersion))
      this.loading = false
    },
    checkNewVersion() {
      VersionUtils.checkNewVersion((version: AppVersion) => {
        this.appVersion = version
      }, (error) => {
        this.error = error
        consola.log(error)
      }, () => {
        this.loading = false
      })
    },
  },

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
              <h4>{{ t('update.newVersionDetect') }} {{ appVersion.version }}</h4>
              <pre style="font-size: 1rem">{{ appVersion.releaseNote }}</pre>
            </el-col>
          </template>
        </el-row>
      </template>
      <template v-if="hasNewVersion" #footer>
        <el-divider />
        <el-row justify="end" class="footer">
          <el-button @click="cancel">
            忽略
          </el-button>
          <el-button type="primary" @click="upgrade">
            更新
          </el-button>
        </el-row>
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
