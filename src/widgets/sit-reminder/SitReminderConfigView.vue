<template>
  <widget-edit-dialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    :widget-data="widgetData"
    @apply="save"
    @confirm="save({ closeWindow: true })">
    <template v-slot:form>
      <widget-checkbox-field v-model:checked="widgetData.enable" label="启用久坐提醒" />
      <widget-slider-field v-model:value="widgetData.sitInterval" label="久坐时长（分钟）" :min="1" :max="120" />
      <widget-slider-field v-model:value="widgetData.breakInterval" label="休息时长（分钟）" :min="1" :max="60" />
      <widget-slider-field v-model:value="widgetData.mouseCheckInterval" label="检测阈值（分钟）" :min="1" :max="120" />
      <el-alert type="info" :closable="false">
        <p>检测阈值：多久没使用鼠标视为离开电脑</p>
      </el-alert>
    </template>
  </widget-edit-dialog>
</template>

<script lang="ts" setup>
import { useWidget, WidgetConfigOption, WidgetEditDialog } from '@widget-js/vue3'
import { reactive } from 'vue'
import { SitReminder } from '@/widgets/sit-reminder/model/SitReminder'

const sitReminder = new SitReminder()
const { widgetData, widgetParams, save } = useWidget(SitReminder, {
  defaultData: sitReminder,
  loadDataByWidgetName: true
})
//修改成需要设置组件参数配置
const widgetConfigOption = reactive(
  new WidgetConfigOption({
    custom: true,
    backgroundColor: false,
    borderRadius: false,
    preview: false
  })
)
</script>

<style scoped></style>
