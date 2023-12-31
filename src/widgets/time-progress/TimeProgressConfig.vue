<script lang="ts" setup>
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import {
  BrowserWindowApi,
  WidgetData,
} from '@widget-js/core'

const {
  widgetData,
  widgetParams,
  save,
} = useWidget(WidgetData, { loadDataByWidgetName: true })
BrowserWindowApi.setup({
  width: 600,
  height: 400,
  center: true,
})

const widgetConfigOption = new WidgetConfigOption({
  custom: false,
  theme: {
    backgroundColor: true,
    color: true,
    borderRadius: true,
  },
})
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData" :option="widgetConfigOption" :widget-params="widgetParams"
    @apply="save"
    @confirm="save({ closeWindow: true })"
  />
</template>

<style scoped></style>
