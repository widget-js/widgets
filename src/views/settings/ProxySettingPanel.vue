<script setup lang="ts">
import { reactive, watch } from 'vue'
import { AppApi } from '@widget-js/core'
import type { ProxyConfig } from '@widget-js/core'
import consola from 'consola'
import { useDebounceFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const config = reactive({
  protocol: '',
  hostname: '',
  port: '',
})

const updateProxy = useDebounceFn(async () => {
  const proxyRules = `${config.protocol}://${config.hostname}:${config.port}`
  const proxyConfig: ProxyConfig = {
    proxyRules,
  }
  await AppApi.setProxy(proxyConfig)
}, 1000)
AppApi.getProxy().then((value) => {
  consola.info('proxy', value)
  if (value && value.proxyRules) {
    try {
      const url = new URL(value.proxyRules)
      config.protocol = url.protocol.replace(':', '')
      config.port = url.port
      config.hostname = url.hostname
    }
    catch (e) {
      consola.error(e)
    }
  }
  watch(config, async (newValue) => {
    if (newValue.protocol && newValue.hostname && newValue.port) {
      await updateProxy()
    }
  }, { deep: true })
})

function clearProxy() {
  config.protocol = ''
  config.hostname = ''
  config.port = ''
  AppApi.setProxy({})
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <el-alert :title="t('settings.proxy.tips')" type="warning" :closable="false" />
    <el-card shadow="hover">
      <el-form label-width="90px" label-position="left">
        <el-form-item :label="t('settings.proxy.protocol')">
          <el-radio-group v-model="config.protocol">
            <el-radio label="http">
              HTTP
            </el-radio>
            <el-radio label="https">
              HTTPS
            </el-radio>
            <el-radio label="sock4">
              SOCK4
            </el-radio>
            <el-radio label="sock5">
              SOCK5
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="t('settings.proxy.server')">
          <el-input v-model="config.hostname" class="flex-1" placeholder="127.0.0.1" />
        </el-form-item>
        <el-form-item :label="t('settings.proxy.port')">
          <div class="flex w-full gap-2">
            <el-input v-model="config.port" class="flex-1" :maxlength="5" placeholder="7890" />
            <el-button type="warning" @click="clearProxy">
              {{ t('settings.proxy.clear') }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss">
.el-form {
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}

.setting-section:nth-child(n + 2) {
  margin-top: 12px;
}
</style>
