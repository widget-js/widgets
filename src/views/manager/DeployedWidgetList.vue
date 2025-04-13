<script setup lang="ts">
import { ref } from 'vue'
import type { DeployedWidget } from '@widget-js/core'
import { BrowserWindowApi, DeployedWidgetApi } from '@widget-js/core'
import { useEventListener } from '@vueuse/core'
import DeployedWidgetCard from '@/views/manager/DeployedWidgetCard.vue'

const widgets = ref<DeployedWidget[]>([])
DeployedWidgetApi.getDeployedWidgets().then((value) => {
  widgets.value = value
})
BrowserWindowApi.setAlwaysOnTop(true)
function removeWidget(widget: DeployedWidget) {
  DeployedWidgetApi.removeDeployedWidget(widget.id)
  widgets.value = widgets.value.filter(it => it.id != widget.id)
}

useEventListener('focus', () => {
  DeployedWidgetApi.getDeployedWidgets().then((value) => {
    widgets.value = value
  })
})
</script>

<template>
  <div class="flex flex-col gap-3 px-3 pb-4">
    <DeployedWidgetCard v-for="widget in widgets" :key="widget.id" :deployed-widget="widget" @remove="removeWidget" />
  </div>
</template>

<style scoped lang="scss">

</style>
