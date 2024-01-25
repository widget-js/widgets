<script lang="ts" setup>
import {
  WidgetConfigOption,
  WidgetEditDialog,
  useWidget,
} from '@widget-js/vue3'
import { BrowserWindowApi } from '@widget-js/core'
import { ref } from 'vue'
import { WaterReminderModel } from '@/widgets/water-reminder/model/WaterReminderModel'

BrowserWindowApi.setup({
  width: 600,
  height: 400,
  center: true,
})

const cup = ref(0)
const defaultData = new WaterReminderModel()
defaultData.theme.backgroundColor = '#fff'
defaultData.theme.color = '#092239'
defaultData.theme.primaryColor = '#2596FF'
const {
  widgetData,
  widgetParams,
  save,
} = useWidget(WaterReminderModel, {
  defaultData,
  loadDataByWidgetName: true,
  onDataLoaded: (data) => {
    cup.value = data?.getTodayHistory() ?? 0
  },
})

// 修改成需要设置组件参数配置
const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  theme: {
    backgroundColor: true,
    borderRadius: false,
    color: true,
    primaryColor: true,
  },
})
</script>

<template>
  <WidgetEditDialog
    v-model="widgetData"
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    label-width="150px"
    @apply="save"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      <el-form>
        <el-form-item label="定时提醒">
          <el-checkbox v-model="widgetData.enableReminder" />
        </el-form-item>
        <el-tooltip
          v-if="widgetData.enableReminder"
          class="box-item"
          effect="dark"
          content="单位为分钟"
          placement="top-start"
        >
          <el-form-item label="提醒间隔">
            <el-input-number v-model="widgetData.interval" :min="5" :max="100" />
          </el-form-item>
        </el-tooltip>
        <el-form-item label="目标杯数">
          <el-input-number v-model="widgetData.targetCup" :min="1" :max="20" />
        </el-form-item>
      </el-form>
    </template>
  </WidgetEditDialog>
</template>

<style scoped lang="scss"></style>
