<script lang="ts" setup>
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import { SitReminder } from '@/widgets/sit-reminder/model/SitReminder'

const {
  widgetData,
  widgetParams,
  save,
} = useWidget(SitReminder, { loadDataByWidgetName: true })

const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  theme: {
    backgroundColor: false,
    borderRadius: false,
  },
})
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    @apply="save"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      <widget-checkbox-field v-model="widgetData.enable" label="启用久坐提醒" />
      <widget-slider-field v-model="widgetData.sitInterval" label="久坐时长（分钟）" :min="1" :max="120" />
      <widget-slider-field v-model="widgetData.breakInterval" label="休息时长（分钟）" :min="1" :max="60" />
      <widget-slider-field v-model="widgetData.mouseCheckInterval" label="检测阈值（分钟）" :min="1" :max="120" />
      <el-alert type="info" :closable="false">
        <p>检测阈值：多久没使用鼠标视为离开电脑</p>
      </el-alert>
    </template>
  </WidgetEditDialog>
</template>

<style scoped></style>
