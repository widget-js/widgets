<template>
  <widget-edit-dialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    :widget-data="widgetData"
    label-width="150px"
    @confirm="onSaveClick()"
  >
    <template v-slot:widget>
      <!-- 组件配置内容   -->
      <water-reminder-widget
        :style="{
          width: `${widgetParams.widthPx}px`,
          height: `${widgetParams.heightPx}px`
        }"
        v-bind="widgetData"
        :cup="cup"
      ></water-reminder-widget>
    </template>
    <template v-slot:form>
      <el-form>
        <el-form-item label="定时提醒">
          <el-checkbox v-model="widgetData.enableReminder" />
        </el-form-item>
        <el-tooltip
          class="box-item"
          v-if="widgetData.enableReminder"
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
  </widget-edit-dialog>
</template>

<script lang="ts" setup>
import WaterReminderWidget from './WaterReminderWidget.vue'
import { useWidget, WidgetConfigOption, WidgetEditDialog } from '@widget-js/vue3'
import { WidgetApi } from '@widget-js/core'
import { reactive, ref } from 'vue'
import { WaterReminderModel } from '@/widgets/water-reminder/model/WaterReminderModel'

const { widgetData, widgetParams } = useWidget(WaterReminderModel, {
  loadDataByWidgetName: true,
  onDataLoaded: (data) => {
    cup.value = data?.getTodayHistory() ?? 0
  }
})
const cup = ref(0)

//修改成需要设置组件参数配置
const widgetConfigOption = reactive(
  new WidgetConfigOption({
    custom: true,
    backgroundColor: true,
    borderRadius: false,
    color: true
  })
)

async function onSaveClick() {
  await WidgetApi.saveDataByName(widgetData.value)
  window.close()
}
</script>

<style scoped lang="scss">
</style>
