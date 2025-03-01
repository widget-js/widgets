<script setup lang="ts">
import type { AppRuntimeInfo } from '@widget-js/core'
import { AppApi, BrowserWindowApi, NotificationApi } from '@widget-js/core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const info = ref<AppRuntimeInfo>()
const showFullDialog = ref(false)
AppApi.getRuntimeInfo().then((res) => {
  // sort keys
  res = Object.keys(res).sort().reduce((obj, key) => {
    obj[key] = res[key]
    return obj
  }, {})
  delete res.chrome
  delete res.node
  delete res.appPath
  delete res.platform
  delete res.v8
  info.value = res
})

function showFullInfo() {
  showFullDialog.value = true
}

function copyAndReport() {
  const text = JSON.stringify(info.value, null, 2)
  navigator.clipboard.writeText(text)
  NotificationApi.success(t('infoCopied'))
  BrowserWindowApi.openUrl('https://support.qq.com/product/450189', { external: true })
}
</script>

<template>
  <div v-if="info" class="flex items-center text-sm text-gray-400">
    <div class="flex cursor-pointer flex-col items-start" @click="showFullInfo">
      <div>App: {{ info.app }}</div>
      <div>Window Store: {{ info.isWindowsStore }}</div>
      <div>{{ t('fullDetail') }}</div>
    </div>
    <el-button class="ml-auto" @click="copyAndReport">
      {{ t('copyAndReport') }}
    </el-button>
  </div>
  <div class="text-start">
    <el-dialog v-model="showFullDialog" width="400" :title="t('fullDetail')">
      <div class="flex cursor-pointer flex-col items-start" @click="showFullInfo">
        <div v-for="key in Object.keys(info)" :key="`info-${key}`">
          <template v-if="key != 'appPath' ">
            <b>{{ key }}: </b>{{ info[key] }}
          </template>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
