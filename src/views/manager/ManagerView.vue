<script setup lang="ts">
import { WidgetBaseDialog } from '@widget-js/vue3'
import { BrowserWindowApi, DeployedWidgetApi } from '@widget-js/core'
import { ref } from 'vue'
import type { DeployedWidget } from '@widget-js/core'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import DeployedWidgetCard from '@/views/manager/DeployedWidgetCard.vue'

const widgets = ref<DeployedWidget[]>()
DeployedWidgetApi.getDeployedWidgets().then((value) => {
  widgets.value = value
})
BrowserWindowApi.setAlwaysOnTop(true)
function removeWidget(widget: DeployedWidget) {
  DeployedWidgetApi.removeDeployedWidget(widget.id)
  widgets.value = widgets.value.filter(it => it.id != widget.id)
}
const { t } = useI18n()
const { height } = useWindowSize()
</script>

<template>
  <WidgetBaseDialog :body-padding="0" :title="t('manager.windowTitle')">
    <template #body>
      <el-scrollbar :height="height - 58">
        <div class="flex flex-col gap-4 p-4">
          <DeployedWidgetCard v-for="widget in widgets" :key="widget.id" :deployed-widget="widget" @remove="removeWidget" />
        </div>
      </el-scrollbar>
    </template>
  </WidgetBaseDialog>
</template>

<style scoped lang="scss">

</style>
