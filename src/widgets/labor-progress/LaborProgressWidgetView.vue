<script lang="ts" setup>
import {
  WidgetWrapper,
  useWidget,
} from '@widget-js/vue3'
import { ref } from 'vue'
import LaborProgressWidget from './LaborProgressWidget.vue'
import LaborProgressData from '@/widgets/labor-progress/model/LaborProgressData'

const startTime = ref<Date>()
const endTime = ref<Date>()
const { widgetData } = useWidget(LaborProgressData, {
  onDataLoaded: (data) => {
    if (data) {
      startTime.value = data.getStartTime()
      endTime.value = data.getEndTime()
    }
  },
})
</script>

<template>
  <WidgetWrapper>
    <LaborProgressWidget v-bind="widgetData" :start-time="startTime" :end-time="endTime" />
  </WidgetWrapper>
</template>

<style scoped></style>
