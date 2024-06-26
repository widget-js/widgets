<script lang="ts" setup>
import {
  WidgetConfigOption,
  useWidgetData,
} from '@widget-js/vue3'
import {
  ProgressType,
  WaveProgressData,
} from '@/widgets/wave-progress/model/WaveProgressData'

const {
  widgetData,
  widgetParams,
  save,
} = useWidgetData(WaveProgressData)
const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  theme: {
    backgroundColor: true,
    borderRadius: true,
  },
})

function handleChangeCustomDate() {
  const now = new Date()
  if ((widgetData.value.startDate ?? now) > (widgetData.value.endDate ?? now)) {
    const start: Date = widgetData.value.startDate ?? now
    widgetData.value.startDate = widgetData.value.endDate
    widgetData.value.endDate = start
  }
}
</script>

<template>
  <widget-edit-dialog
    v-model="widgetData" :option="widgetConfigOption"
    :widget-params="widgetParams"
    @apply="save"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      <el-form :model="widgetData">
        <el-form-item label="进度类型">
          <el-radio-group v-model="widgetData.progressType">
            <el-radio :label="ProgressType.today">
              今天
            </el-radio>
            <el-radio :label="ProgressType.toWeek">
              本周
            </el-radio>
            <el-radio :label="ProgressType.toMonth">
              本月
            </el-radio>
            <el-radio :label="ProgressType.toYear">
              今年
            </el-radio>
            <el-radio :label="ProgressType.custom">
              自定义
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="widgetData.progressType === ProgressType.custom">
          <el-form-item label="事项名称">
            <el-input v-model="widgetData.eventName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="widgetData.startDate"
              type="datetime"
              placeholder="开始时间"
              @change="handleChangeCustomDate"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="widgetData.endDate"
              type="datetime"
              placeholder="结束时间"
              @change="handleChangeCustomDate"
            />
          </el-form-item>
        </template>
      </el-form>
    </template>
  </widget-edit-dialog>
</template>

<style scoped>
.widget-scale {
  max-height: 250px;
  max-width: 250px;
}
</style>
