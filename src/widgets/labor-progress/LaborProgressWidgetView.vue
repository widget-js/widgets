<script lang="ts" setup>
import {
  WidgetWrapper,
  useAppBroadcast,
  useWidgetData,
} from '@widget-js/vue3'
import { ref } from 'vue'
import { SystemApiEvent } from '@widget-js/core'
import LaborProgressWidget from './LaborProgressWidget.vue'
import LaborProgressData from '@/widgets/labor-progress/model/LaborProgressData'

const startTime = ref<Date>()
const endTime = ref<Date>()
const { widgetData } = useWidgetData(LaborProgressData, {
  onDataLoaded: (data) => {
    if (data) {
      startTime.value = data.getStartTime()
      endTime.value = data.getEndTime()
    }
  },
})

useAppBroadcast([SystemApiEvent.DATE_CHANGED], () => {
  startTime.value = widgetData.value.getStartTime()
  endTime.value = widgetData.value.getEndTime()
})
</script>

<template>
  <WidgetWrapper>
    <LaborProgressWidget v-bind="widgetData" :start-time="startTime" :end-time="endTime" />
  </WidgetWrapper>
</template>

<style scoped></style>
