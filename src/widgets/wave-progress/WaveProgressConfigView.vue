<script lang="ts" setup>
import {
  WidgetConfigOption,
  useWidgetData,
  useWidgetStorage,
} from '@widget-js/vue3'
import { WidgetData } from '@widget-js/core'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import {
  DefaultWaveProgressData,
  ProgressType,
} from '@/widgets/wave-progress/model/WaveProgressData'
import type {
  WaveProgressData,
} from '@/widgets/wave-progress/model/WaveProgressData'

const {
  widgetData,
  widgetParams,
  save,
} = useWidgetData(WidgetData)
const configData = useWidgetStorage<WaveProgressData>('WaveProgressConfig', DefaultWaveProgressData)

const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  showFooter: true,
  theme: {
    backgroundColor: true,
    borderRadius: true,
  },
})

const now = dayjs()
const startDate = ref(now.toDate())
const endDate = ref(now.add(1, 'days').toDate())

function handleChangeCustomDate() {
  if (startDate.value < endDate.value) {
    configData.value.startDate = startDate.value.toISOString()
    configData.value.endDate = endDate.value.toISOString()
  }
  else {
    configData.value.startDate = endDate.value.toISOString()
    configData.value.endDate = startDate.value.toISOString()
  }
}

onMounted(() => {
  startDate.value = dayjs(configData.value.startDate).toDate()
  endDate.value = dayjs(configData.value.endDate).toDate()
})
</script>

<template>
  <widget-edit-dialog
    v-model="widgetData" :option="widgetConfigOption"
    :widget-params="widgetParams"
    @apply="save"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      <el-form>
        <el-form-item label="进度类型">
          <el-radio-group v-model="configData.progressType">
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

        <template v-if="configData.progressType === ProgressType.custom">
          <el-form-item label="事项名称">
            <el-input v-model="configData.eventName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="startDate"
              type="datetime"
              placeholder="开始时间"
              @change="handleChangeCustomDate"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="endDate"
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
