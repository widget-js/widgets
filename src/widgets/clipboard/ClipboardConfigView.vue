<script lang="ts" setup>
import { WidgetConfigOption, WidgetEditDialog, useWidget } from '@widget-js/vue3'
import { BroadcastApi, BroadcastEvent, BrowserWindowApi, WidgetApiEvent, WidgetData } from '@widget-js/core'
import { useLocalStorage } from '@vueuse/core'
import ClipboardWidget from '@/widgets/clipboard/Clipboard.widget'
import { searchPlatformList } from '@/widgets/clipboard/model/SearchPlatform'

const shortcut = useLocalStorage(`${ClipboardWidget.name}.shortcut`, 'Meta+Alt+S')
const searchPlatform = useLocalStorage(`${ClipboardWidget.name}.platform`, 'google')
const {
  widgetData,
  widgetParams,
} = useWidget(WidgetData)

const widgetConfigOption = new WidgetConfigOption({
  custom: true,
})

async function apply() {
  const event = new BroadcastEvent({
    event: WidgetApiEvent.DATA_CHANGED,
    payload: { name: ClipboardWidget.name },
  })
  await BroadcastApi.send(event)
}

async function save() {
  await apply()
  window.close()
}

BrowserWindowApi.setup({
  width: 500,
  height: 400,
  center: true,
})
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData" :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="apply"
    @confirm="save"
  >
    <template #custom>
      <el-alert type="info" :closable="false">
        按下快捷键搜索剪贴板内容，不用鼠标点击搜索框
      </el-alert>
      <el-form class="mt-4" label-width="100">
        <el-form-item label="搜索快捷键">
          <BindShortcutField v-model="shortcut" />
        </el-form-item>
        <el-form-item label="搜索平台">
          <el-radio-group v-model="searchPlatform">
            <el-radio v-for="platform in searchPlatformList" :key="platform.value" :label="platform.value">
              {{ platform.title }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
  </WidgetEditDialog>
</template>

<style scoped>

</style>
